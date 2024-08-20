"use server";

import User, { IUser } from "@/database/user.model";
import { connectToDatabase } from "../mongo/mongoose";
import { revalidatePath } from "next/cache";

interface CreateUserParams {
    clerkId: string;
    name: string;
    username: string;
    email: string;
    picture: string;
}

export async function createUser(params: CreateUserParams) {
    try {
        connectToDatabase();
        const newUser = await User.create(params);
        return newUser;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

interface UpdateUserParams {
    clerkId: string;
    updateData: Partial<IUser>;
    path: string;
}

export async function updateUser(params: UpdateUserParams) {
    try {
      connectToDatabase();
      const { clerkId, updateData, path } = params;
      const newUser = await User.findOneAndUpdate(
        {
          clerkId,
        },
        updateData,
        {
          new: true,
        }
      );
      revalidatePath(path);
      return newUser;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

interface DeleteUserParams {
    clerkId: string;
}

export async function deleteUser(params: DeleteUserParams) {
    try {
        connectToDatabase();
        const { clerkId } = params;
        const deletedUser = await User.findOneAndDelete({ clerkId });
        return deletedUser;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// export async function getAllUsers() {
//     try {
//         const { data, error } = await supabase
//           .from("users")
//           .select("uuid, email");
      
//           // console.log("data", data);
//         if (error) throw error;
      
//         const sets: number[] = [];
      
//         for (const user of data) {
//           const { data: userSets, error: userSetsError } = await supabase
//               .from("study_set")
//               .select()
//               .eq("user_id", user.uuid);
//           if (userSetsError) throw userSetsError;
//           sets.push(userSets?.length || 0);
//         }
      
//         return data.map((user, i) => ({
//           id: user.uuid,
//           username: user.email.split("@")[0],
//           avatar: "/assets/images/avatar.png",
//           sets: sets[i],
//         }));
//     } catch (error) {
//         console.log(error);
//     }
// }

// interface IGetUserByIdProps {
//     userId: string;

// }

// export async function getUserById(params: IGetUserByIdProps) {
//     try {
//         const { userId } = params;
//         const { data, error } = await supabase
//           .from("users")
//           .select("uuid, email, created_at")
//           .eq("uuid", userId);
      
//         if (error) throw error;

//         const { data: studySetData, error: studySetError } = await supabase.from("study_set").select().eq("user_id", userId).order("created_at", { ascending: false });
    
//         if (studySetError) throw studySetError;

//         const studySetIds = studySetData.map((item) => item.id);

//         const cardCount: number[] = [];

//         for (const id of studySetIds) {
//             const { data: cardData, error: cardError } = await supabase
//                 .from("flashcard")
//                 .select()
//                 .eq("study_set_id", id);

//             if (cardError) throw cardError;
//             // console.log(cardData.length);
//             cardCount.push(cardData.length); 
//         }
      
//         return {
//             user: {
//                 id: data[0].uuid,
//                 username: data[0].email.split("@")[0],
//                 avatar: "/assets/images/avatar.png",
//                 createdAt: data[0].created_at,
//                 studySets: studySetData.map((item, i) => ({
//                     id: item.id,
//                     name: item.name,
//                     cards: cardCount[i],
//                     author: {
//                         name: data[0].email.split("@")[0],
//                         avatar: "/assets/images/avatar.png",
//                     }
//                 }))
//             }
//         };
//     } catch (error) {
//         console.log(error);
//     }
// }
