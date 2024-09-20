import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { Restaurant } from "@/app/lib/restaurantModel";

export async function GET(request){

 let queryParams = request.nextUrl.searchParams

 console.log(queryParams.get('restaurant'))

 await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });

  let result = await Restaurant.find();

  return NextResponse.json({success:true,result})


}