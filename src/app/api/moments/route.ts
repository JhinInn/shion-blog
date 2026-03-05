import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("[Moments API] Creating moment:", body);
    
    const { content } = body;
    
    if (!content || content.trim() === "") {
      return NextResponse.json({ error: "Content is required" }, { status: 400 });
    }

    console.log("[Moments API] Connecting to database...");
    const moment = await prisma.moment.create({
      data: { content: content.trim() },
    });
    console.log("[Moments API] Created moment:", moment);

    return NextResponse.json(moment, { status: 201 });
  } catch (error: any) {
    console.error("[Moments API] Error creating moment:", error);
    return NextResponse.json({ 
      error: "Failed to create moment", 
      details: error.message,
      code: error.code 
    }, { status: 500 });
  }
}