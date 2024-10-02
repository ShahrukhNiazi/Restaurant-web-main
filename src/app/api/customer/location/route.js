import { connectionStr } from "@/app/lib/db";
import { Restaurant } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await mongoose.connect(connectionStr);
  let result = await Restaurant.find();
  result = result.map((item)=>item.city);
  result = [...new Set(result.map((item)=>item))]

  console.log(result);
  await mongoose.connection.close(); // Close connection after operation
  return NextResponse.json({ success: true, result });
}