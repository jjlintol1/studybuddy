"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";

import { generateQuizQuestions } from "@/lib/actions/studyset.action";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const dummyData = [
  {
    question: "What is the capital of France?",
    options: {
      a: {
        text: "Berlin",
        correct: false,
      },
      b: {
        text: "Madrid",
        correct: false,
      },
      c: {
        text: "Paris",
        correct: true,
      },
      d: {
        text: "Rome",
        correct: false,
      },
    },
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: {
      a: {
        text: "Venus",
        correct: false,
      },
      b: {
        text: "Mars",
        correct: true,
      },
      c: {
        text: "Jupiter",
        correct: false,
      },
      d: {
        text: "Saturn",
        correct: false,
      },
    },
  },
  {
    question: "In what year did Christopher Columbus reach the Americas?",
    options: {
      a: {
        text: "1492",
        correct: true,
      },
      b: {
        text: "1510",
        correct: false,
      },
      c: {
        text: "1607",
        correct: false,
      },
      d: {
        text: "1776",
        correct: false,
      },
    },
  },
  {
    question: "What is the largest mammal in the world?",
    options: {
      a: {
        text: "Elephant",
        correct: false,
      },
      b: {
        text: "Blue Whale",
        correct: true,
      },
      c: {
        text: "Giraffe",
        correct: false,
      },
      d: {
        text: "Hippopotamus",
        correct: false,
      },
    },
  },
  {
    question: "Which programming language is often used for web development?",
    options: {
      a: {
        text: "Python",
        correct: false,
      },
      b: {
        text: "Java",
        correct: false,
      },
      c: {
        text: "JavaScript",
        correct: true,
      },
      d: {
        text: "C++",
        correct: false,
      },
    },
  },
];

console.log(dummyData);

export interface IParamsProps {
  params: { id: string };
}

const QuizPage = ({ params }: IParamsProps) => {
  const [quizQuestions, setQuizQuestions] = useState(dummyData);
  const [isLoading, setIsLoading] = useState(false);

  const generateQuestions = async () => {
    setIsLoading(true);
    const response = await generateQuizQuestions({
      studySetId: parseInt(params.id),
    });
    if (response) {
      setQuizQuestions(response.questions);
    } else {
      console.log("Error generating quiz");
    }
    setIsLoading(false);
  };

  const checkAnswers = () => {

  }

  return (
    <>
      <h1 className="h1-bold">Generate a quiz</h1>
      <p className="paragraph-regular mt-3">
        Click the button below to test your knowledge.
      </p>
      <Button
        className="mt-4 flex w-[200px] gap-2 rounded-xl bg-primary-500 text-dark-100"
        onClick={generateQuestions}
      >
        <Image
          src="/assets/icons/stars.svg"
          width={20}
          height={20}
          alt="stars"
        />
        <p className="paragraph-medium">Generate Quiz</p>
      </Button>
      <div className="mt-10 flex flex-col gap-4">
        {quizQuestions.length ? (
          quizQuestions.map((item: any, i) => (
            <div
              key={i}
              className="card-wrapper flex w-full flex-col gap-5 rounded-xl p-6"
            >
              <h4 className="base-medium">{item.question}</h4>
              <div className="flex flex-col gap-3">
                <RadioGroup>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="a" id="a" />
                    <Label htmlFor="a">{item.options.a.text}</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="b" id="b" />
                    <Label htmlFor="b">{item.options.b.text}</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="c" id="c" />
                    <Label htmlFor="c">{item.options.c.text}</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="d" id="d" />
                    <Label htmlFor="d">{item.options.d.text}</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          ))
        ) : isLoading ? (
          <div>
            <p className="paragraph-regular text-dark-200">Loading...</p>
          </div>
        ) : (
          <div>
            <p className="paragraph-regular text-dark-200">
              Click the above button to get started.
            </p>
          </div>
        )}
      </div>
      <div>
        <Button
          className="mt-6 flex w-[200px] gap-2 rounded-xl bg-primary-500 text-dark-100"
          onClick={checkAnswers}
        >
          <p className="paragraph-medium">Check answers</p>
        </Button>
      </div>
    </>
  );
};

export default QuizPage;
