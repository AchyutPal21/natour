import mongoose from "mongoose";
import {
  DATABASE_CONNECTION_URL,
  DATABASE_USER_NAME,
  DATABASE_USER_PASSWORD,
} from "./env.js";

const URI = DATABASE_CONNECTION_URL.replace(
  "<DB_USERNAME>",
  DATABASE_USER_NAME
).replace("<DB_PASSWORD>", DATABASE_USER_PASSWORD);

async function establishDataBaseConnection() {
  try {
    const connection = await mongoose.connect(URI);
    console.log("Connection to MongoDB successful!!!");
  } catch (error) {
    console.error("Connection to MongoDB failed!!!", error);
  }
}

export { establishDataBaseConnection };