"use server";

import { revalidatePath } from "next/cache";
import { supabase } from "../supabase/utils";
import {
  quizChain,
  splitter,
  studySetChain,
} from "../langchain/createStudySet";
import { formatDocuments } from "../utils";

interface IUploadStudySetParams {
  name: string;
  path: string;
  notes: string;
}

export async function uploadStudySet(params: IUploadStudySetParams) {
  try {
    const { name, path, notes } = params;

    const { data, error } = await supabase
      .from("study_set")
      .insert({
        name,
      })
      .select();

    if (error) throw error;

    const studySetId = data?.[0].id;

    const docs = await splitter.createDocuments([notes]);

    const { error: documentError } = await supabase.from("document").insert(
      docs.map((doc) => ({
        content: doc.pageContent,
        study_set_id: studySetId,
      })),
    );

    if (documentError) throw documentError;

    const output = await studySetChain.invoke({
      cardCount: "20",
      notes,
    });

    const flashcards = JSON.parse(output);

    const flashcardData = flashcards.map(
      (flashcard: { term: string; definition: string }) => ({
        ...flashcard,
        study_set_id: studySetId,
      }),
    );

    const { error: flashcardError } = await supabase
      .from("flashcard")
      .insert(flashcardData);

    if (flashcardError) throw flashcardError;

    revalidatePath(`${path}/${studySetId}`);
    return studySetId;
  } catch (error) {
    console.log(error);
  }
}

interface IGetStudySetParams {
  studySetId: number;
}

export async function getStudySet(params: IGetStudySetParams) {
  try {
    const { studySetId } = params;

    const { data, error } = await supabase
      .from("flashcard")
      .select()
      .eq("study_set_id", studySetId);

    if (error) throw error;

    const { data: studySetData, error: studySetError } = await supabase
      .from("study_set")
      .select("name")
      .eq("id", studySetId);

    if (studySetError) throw studySetError;

    if (error) throw error;

    return {
      name: studySetData?.[0].name,
      flashcards: data,
    };
  } catch (error) {
    console.log(error);
  }
}

interface IGenerateQuizParams {
  studySetId: number;
}

export async function generateQuizQuestions(params: IGenerateQuizParams) {
  try {
    const { studySetId } = params;

    const { data, error } = await supabase
      .from("document")
      .select("content")
      .eq("study_set_id", studySetId);

    if (error) throw error;

    const documentContent = formatDocuments(data.map((doc) => doc.content));

    const output = await quizChain.invoke({
      notes: documentContent,
      questionCount: "10",
    });
    console.log(output);

    return {
      questions: JSON.parse(output),
    };
  } catch (error) {
    console.log(error);
  }
}
