import GenerateSetLink from "@/components/home/GenerateSetLink";
import StudySetCarousel from "@/components/shared/carousel/StudySetCarousel";
import UserCarousel from "@/components/shared/carousel/UserCarousel";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import React from "react";

const dummySets = [
  {
    id: 1,
    name: "Example Set 1",
    cards: 10,
    author: {
      name: "John Doe",
      avatar: "/assets/images/avatar.png",
    },
  },
  {
    id: 2,
    name: "Example Set 2",
    cards: 10,
    author: {
      name: "John Doe",
      avatar: "/assets/images/avatar.png",
    },
  },
  {
    id: 3,
    name: "Example Set 3",
    cards: 10,
    author: {
      name: "John Doe",
      avatar: "/assets/images/avatar.png",
    },
  },
  {
    id: 4,
    name: "Example Set 4",
    cards: 10,
    author: {
      name: "John Doe",
      avatar: "/assets/images/avatar.png",
    },
  },
];

const dummyUsers = [
  {
    id: 1,
    avatar: "/assets/images/avatar.png",
    username: "johndoe21",
    sets: 10,
  },
  {
    id: 2,
    avatar: "/assets/images/avatar.png",
    username: "johndoe21",
    sets: 10,
  },
  {
    id: 3,
    avatar: "/assets/images/avatar.png",
    username: "johndoe21",
    sets: 10,
  },
  {
    id: 4,
    avatar: "/assets/images/avatar.png",
    username: "johndoe21",
    sets: 10,
  },
  {
    id: 5,
    avatar: "/assets/images/avatar.png",
    username: "johndoe21",
    sets: 10,
  },
];

const HomePage = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <>
      <StudySetCarousel title="Your Sets" sets={dummySets} isTop />
      <GenerateSetLink />
      <StudySetCarousel title="Trending Sets" sets={dummySets} isTop={false} />
      <UserCarousel users={dummyUsers} />
    </>
  );
};

export default HomePage;
