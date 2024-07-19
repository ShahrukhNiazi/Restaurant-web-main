import { connectionStr } from "@/app/lib/db";
import { Restaurant } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
    const data = await Restaurant.find();
    console.log(data);
    return NextResponse.json({ result: true, data });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ result: false, error: error.message });
  }
}

export async function POST(request) {
  try {
    let payload = await request.json();
    await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
    let restaurant = new Restaurant(payload);
    const result = await restaurant.save();
    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ success: false, error: error.message });
  }
}