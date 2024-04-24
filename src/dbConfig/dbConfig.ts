import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}AuthNext` || "");
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Database connected");
    });
    connection.on("error", (err) => {
      console.log("Error connecting to database", err);
      process.exit();
    });
  } catch (error) {
    console.log("Error connecting to database", error);
  }
}
