import { connectionStr } from "@/app/lib/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request){

 let queryParams = request.nextUrl.searchParams

 console.log(queryParams.get('restaurant'))

 await mongoose.connect(connectionStr,{uesNewParser:true});

  let result = await restaurantSchema.find();

  return NextResponse.json({success:true,result})


}