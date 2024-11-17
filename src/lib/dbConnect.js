import { connect } from "mongoose";

let connection = null; // This will hold the singleton connection instance

export async function connectmongodb() {
  if (connection) {
    console.log("Already connected to DB");
    return connection; // Return the existing connection if it exists
  }

  try {
    console.log("Connecting to DB");
    connection = await connect(process.env.MONGO_DB_URI || "");
    console.log("Connected to DB");
    return connection;
  } catch (error) {
    console.error("Error connecting to DB", error);
    throw error; // It's a good practice to rethrow the error so it can be handled by the caller
  }
}
