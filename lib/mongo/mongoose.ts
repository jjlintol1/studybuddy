import mongoose from "mongoose";

let isConnected = false;

export async function connectToDatabase() {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGO_URL) {
    return console.log("Missing MongoDB Connection URL");
  }

  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: "studybuddy",
    });
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
}
