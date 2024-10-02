import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Restaurant } from "@/app/lib/restaurantModel";

export async function GET(request) {

  let queryParams = request.nextUrl.searchParams;

  console.log(queryParams.get('restaurant'));

  let filter = {};

  if(queryParams.get('location')) {
    let city = queryParams.get('location');
    filter = { city: { $regex: new RegExp(city, 'i') } };
  } else if(queryParams.get('restaurant')) {
    let address = queryParams.get('restaurant');
    filter = { address: { $regex: new RegExp(address, 'i') } };
  }

  // Updated MongoDB connection without deprecated options
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connect(connectionStr);
  }

  let result = await Restaurant.find(filter);

  return NextResponse.json({ success: true, result });
}