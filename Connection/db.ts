import mongoose from 'mongoose';

const uri = 'mongodb+srv://anujkumarofficial2004:anujjsengar@aoidev.mum2m.mongodb.net/Users?retryWrites=true&w=majority';

export async function connectToDatabase() {
  console.log("Attempting to connect to the database...");
  try {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(uri); // No need for additional options
      console.log("Database connected successfully!");
    }
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
}
