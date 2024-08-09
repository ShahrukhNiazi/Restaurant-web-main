import { connectionStr } from "@/app/lib/db";
import { Restaurant } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await mongoose.connect(connectionStr);
    const data = await Restaurant.find();
    console.log(data);
    await mongoose.connection.close(); // Close connection after operation
    return NextResponse.json({ result: true, data });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ result: false, error: error.message });
  }
}

export async function POST(request) {
  try {
    const payload = await request.json();
    await mongoose.connect(connectionStr);
    let result;
    let success = false;

    if (payload.login) {
      result = await Restaurant.findOne({ email: payload.email, pass: payload.pass });
      if (result) {
        success = true;
      }
    } else {
      const restaurant = new Restaurant(payload);
      result = await restaurant.save();
      if (result) {
        success = true;
      }
    }

    await mongoose.connection.close(); // Close connection after operation
    return NextResponse.json({ result, success });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
