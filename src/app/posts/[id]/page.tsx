import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

const categories: Record<string, string> = {
  tech: "技术博客",
  thoughts: "个人随想",
  tools: "工具分享",
};

export default async function PostPage({ params }: PageProps) {
  const { id } = await params;
  
  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    notFound();
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
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  {post.content ? (
                    post.content.split("\n").map((paragraph, index) => (
                      <p key={index} className="mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    <p className="text-muted-foreground">暂无正文内容</p>
                  )}
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
