import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const count = await prisma.post.count();
    return NextResponse.json({ 
      status: "ok", 
      db: "connected",
      postCount: count
    });
  } catch (error: any) {
    return NextResponse.json({ 
      status: "error", 
      message: error.message
    }, { status: 500 });
  }
}
