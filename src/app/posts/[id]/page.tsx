"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";

// 动态导入 Markdown 渲染器
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default.Markdown),
  { ssr: false }
);

interface Post {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string;
  readTime: string;
  createdAt: string;
}

const categories: Record<string, string> = {
  tech: "技术博客",
  thoughts: "个人随想",
  tools: "工具分享",
};

export default function PostPage() {
  const params = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (params.id) {
      fetchPost();
    }
  }, [params.id]);

  async function fetchPost() {
    try {
      const res = await fetch(`/api/posts/${params.id}`);
      if (res.ok) {
        const data = await res.json();
        setPost(data);
      } else {
        setError("文章不存在");
      }
    } catch (err) {
      setError("加载失败");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto text-center py-12">
            <p className="text-muted-foreground">{error || "文章不存在"}</p>
            <Button variant="outline" className="mt-4" asChild>
              <Link href="/posts">返回文章列表</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const tags = JSON.parse(post.tags || "[]");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <Button variant="ghost" size="sm" className="mb-6" asChild>
            <Link href="/posts" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              返回文章列表
            </Link>
          </Button>

          <article>
            <div className="mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Badge variant="secondary">
                  {categories[post.category] || post.category}
                </Badge>
                <span>·</span>
                <span>{new Date(post.createdAt).toLocaleDateString("zh-CN")}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>

              <p className="text-lg text-muted-foreground">{post.description}</p>
            </div>

            <Card>
              <CardContent className="p-6 md:p-8">
                <div data-color-mode="light" className="prose prose-slate max-w-none">
                  <MDEditor source={post.content} />
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 flex gap-2 flex-wrap">
              {tags.map((tag: string) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
