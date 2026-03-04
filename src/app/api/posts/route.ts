import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const posts = await prisma.post.findMany({
      where: category ? { category, published: true } : { published: true },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(posts);
  } catch (error: any) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log("Creating post:", body);

    const { title, description, content, category, tags, readTime } = body;

    // 验证必填字段
    if (!title || !category) {
      return NextResponse.json({ error: "Title and category are required" }, { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        title,
        description: description || "",
        content: content || "",
        category,
        tags: JSON.stringify(tags || []),
        readTime: readTime || "5 min",
        published: true,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    console.error("Error creating post:", error);
    return NextResponse.json({ error: error.message || "Failed to create post" }, { status: 500 });
  }
}
