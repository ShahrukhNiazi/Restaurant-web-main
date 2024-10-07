import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { Restaurant } from "@/app/lib/restaurantModel";
import { NextResponse } from "next/server";
import { foodsSchema } from "@/app/lib/foodsModel";


export async function GET(request, content) {
  try {
    // Log the received ID
    const id = content.params.id;
    console.log(id);

    // Ensure the database connection
    await mongoose.connect(connectionStr);

    // Check if mongoose is connected
    if (!mongoose.connection.readyState) {
      return NextResponse.json({ success: false, message: "Failed to connect to the database" });
    }

    // Fetch the restaurant details by ID
    const details = await Restaurant.findOne({ _id: new mongoose.Types.ObjectId(id) });
    const foodItems = await foodsSchema.find({ resto_id: new mongoose.Types.ObjectId(id) });

    // Return the fetched details
    return NextResponse.json({ success: true, details,foodItems });
  } catch (error) {
    console.error("Error fetching restaurant details:", error);
    return NextResponse.json({ success: false, message: "An error occurred", error: error.message });
  }
}