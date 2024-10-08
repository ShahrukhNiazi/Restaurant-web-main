import { connectionStr } from "@/app/lib/db";
import { foodsSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request, content) {
    const { id } = content.params;

    console.log(id)
    let success = false;

    await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });

    let result;

    try {
        // Check if `id` is a valid ObjectId using Mongoose's isValidObjectId method
        if (mongoose.isValidObjectId(id)) {
            result = await foodsSchema.find({ resto_id: id });
            success = true;
        } else {
            console.error("Invalid ObjectId format");
        }
    } catch (error) {
        console.error("Error querying database", error);
    }

    return NextResponse.json({ result, success });
}


export async function DELETE(request, content) {

    const id = content.params.id;

    let success = false;

    await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
    const result = await foodsSchema.deleteOne({ _id: id })

    if (result) {
        success = true
    }

    return NextResponse.json({ result, success })


}
