import { connectionStr } from "@/app/lib/db";
import { Restaurant } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
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
    await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
    let result;

    if (payload.login) {
      console.log('payload login', payload.email, payload.pass);
      result = await Restaurant.findOne({ email: payload.email, pass: payload.pass });
    } else {
      const restaurant = new Restaurant(payload);
      result = await restaurant.save();
    }

    await mongoose.connection.close(); // Close connection after operation
    return NextResponse.json({ result, success: true });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ success: false, error: error.message });
  }
}