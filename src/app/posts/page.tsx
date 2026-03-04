"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = [
  { id: "all", name: "全部" },
  { id: "tech", name: "技术博客" },
  { id: "thoughts", name: "个人随想" },
  { id: "tools", name: "工具分享" },
];

interface Post {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string;
  readTime: string;
  createdAt: string;
}

export default function PostsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, [activeCategory]);

  async function fetchPosts() {
    setLoading(true);
    try {
      const url = activeCategory === "all" 
        ? "/api/posts" 
        : `/api/posts?category=${activeCategory}`;
      const res = await fetch(url);
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">文章</h1>
            <p className="text-muted-foreground">记录技术思考与生活感悟</p>
          </div>

          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
            <TabsList className="grid w-full grid-cols-4">
              {categories.map((cat) => (
                <TabsTrigger key={cat.id} value={cat.id}>
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {loading ? (
            <div className="text-center py-12 text-muted-foreground">加载中...</div>
          ) : posts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">暂无文章，去控制台写一篇吧~</div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <Link key={post.id} href={`/posts/${post.id}`}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {categories.find(c => c.id === post.category)?.name || post.category}
                        </Badge>
                        <span>·</span>
                        <span>{new Date(post.createdAt).toLocaleDateString("zh-CN")}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>
                      <CardTitle className="text-xl">{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base mb-4">{post.description}</CardDescription>
                      <div className="flex gap-2 flex-wrap">
                        {JSON.parse(post.tags || "[]").map((tag: string) => (
                          <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
