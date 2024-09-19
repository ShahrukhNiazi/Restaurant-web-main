import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectionStr } from "../../../lib/db";
import restaurantSchema from "@/app/lib/restaurantModel";

export async function GET() {
  
  await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true })

  let result = await restaurantSchema.find();

  return NextResponse.json({ success: true, result });


}