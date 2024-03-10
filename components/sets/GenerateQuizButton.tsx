"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

import { generateQuizQuestions } from "@/lib/actions/studyset.action";

import React from "react";

interface IGenerateQuizButtonProps {
  studySetId: number;
}

const GenerateQuizButton = ({ studySetId }: IGenerateQuizButtonProps) => {
  const generateQuiz = async () => {
    console.log("Generating quiz");
    const response = await generateQuizQuestions({ studySetId });

    console.log(response);
    // router.push(`/sets/${studySetId}/quiz`);
  };

  return (
    <Button className="flex w-[200px] gap-2 rounded-xl bg-primary-500 text-dark-100">
      <Image src="/assets/icons/stars.svg" width={20} height={20} alt="stars" />
      <p className="paragraph-medium">Generate Quiz</p>
    </Button>
  );
};

export default GenerateQuizButton;
