import { connectionStr } from "@/app/lib/db";
import { foodsSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        const payload = await request.json();

        // Check if already connected to avoid multiple connections in a serverless environment
        if (!mongoose.connection.readyState) {
            await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
        }

        const food = new foodsSchema(payload);
        const result = await food.save();

        return NextResponse.json({ result, success: true });

    } catch (error) {
        console.error("Error saving food item:", error);
        return NextResponse.json({ error: error.message, success: false });
    }
}