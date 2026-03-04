import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const aboutFilePath = path.join(process.cwd(), "src", "data", "about.json");

// 读取 about 信息
export async function GET() {
  try {
    const fileContent = fs.readFileSync(aboutFilePath, "utf-8");
    const about = JSON.parse(fileContent);
    return NextResponse.json(about);
  } catch (error) {
    console.error("Error reading about file:", error);
    return NextResponse.json({
      name: "Shion",
      title: "测试开发工程师 | 热爱自动化测试与工具开发",
      bio: "你好！我是一名热爱技术的测试开发工程师。",
      location: "中国",
      github: "https://github.com/JhinInn",
      tags: ["Python", "Java", "自动化测试", "Next.js", "Playwright"],
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=shion",
    });
  }
}

// 更新 about 信息
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    fs.writeFileSync(aboutFilePath, JSON.stringify(body, null, 2), "utf-8");
    return NextResponse.json(body);
  } catch (error) {
    console.error("Error writing about file:", error);
    return NextResponse.json({ error: "Failed to update about" }, { status: 500 });
  }
}
