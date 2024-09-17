import mongoose from "mongoose"; 
import { ObjectId } from "mongodb";  // Use this instead of mongoose ObjectId
import { connectionStr } from "@/app/lib/db";
import { foodsSchema } from "@/app/lib/foodsModel";
import { NextResponse } from "next/server";

export async function GET(request, content) {
  const id = content.params.id; // Extract the ID from the params

  let success = false;

  // Connect to MongoDB
  await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Find by ObjectId
    const result = await foodsSchema.findOne({_id:id})
    
    success = !!result;

    // Return the result and success status
    return NextResponse.json({ result, success });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json({ error: "An error occurred while fetching the data", success });
  }
}