"use client";

import CardsSliderCarousel from "@/components/shared/carousel/CardsSliderCarousel";
import React from "react";

const dummySet = {
  name: "Example Set 1",
  cards: [
    {
      id: 1,
      term: "Term 1",
      definition: "Definition 1",
    },
    {
      id: 2,
      term: "Term 1",
      definition: "Definition 1",
    },
    {
      id: 3,
      term: "Term 1",
      definition: "Definition 1",
    },
    {
      id: 4,
      term: "Term 1",
      definition: "Definition 1",
    },
    {
      id: 5,
      term: "Term 1",
      definition: "Definition 1",
    },
    {
      id: 6,
      term: "Term 1",
      definition: "Definition 1",
    },
    {
      id: 7,
      term: "Term 1",
      definition: "Definition 1",
    },
    {
      id: 8,
      term: "Term 1",
      definition: "Definition 1",
    },
  ],
};

const SetPage = () => {
  return (
    <>
      <h1 className="h1-bold text-dark-100">{dummySet.name}</h1>
      <CardsSliderCarousel cards={dummySet.cards} />
      <div className="mt-10 flex flex-col gap-4">
        {dummySet.cards.map((item) => (
          <div
            className="card-wrapper flex h-fit w-full flex-col gap-5 rounded-xl p-6 lg:grid lg:grid-cols-7 lg:gap-4"
            key={item.id}
          >
            <div className="col-span-2 flex items-center">
              <p className="base-bold">{item.term}</p>
            </div>

            <div className="col-span-5 flex items-center">
              <p className="body-regular">{item.definition}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SetPage;
