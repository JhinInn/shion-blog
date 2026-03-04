"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Moment {
  id: string;
  content: string;
  createdAt: string;
}

function formatTime(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  
  if (minutes < 1) return "刚刚";
  if (minutes < 60) return minutes + "分钟前";
  if (hours < 24) return hours + "小时前";
  if (days < 7) return days + "天前";
  return date.toLocaleDateString("zh-CN");
}

export default function MomentsPage() {
  const [moments, setMoments] = useState<Moment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMoments();
  }, []);

  async function fetchMoments() {
    try {
      const res = await fetch("/api/moments");
      const data = await res.json();
      setMoments(data);
    } catch (error) {
      console.error("Failed to fetch moments:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">动态</h1>
            <p className="text-muted-foreground">记录日常思考与生活碎片</p>
          </div>

          {loading ? (
            <div className="text-center py-12 text-muted-foreground">加载中...</div>
          ) : moments.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">暂无动态，去控制台发一条吧~</div>
          ) : (
            <div className="space-y-4">
              {moments.map((moment) => (
                <Card key={moment.id} className="hover:shadow-sm transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=shion" />
                        <AvatarFallback className="text-sm">S</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed mb-1">{moment.content}</p>
                        <p className="text-xs text-muted-foreground">{formatTime(moment.createdAt)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loading && moments.length > 0 && (
            <div className="text-center mt-8 text-sm text-muted-foreground">
              已经到底了~
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
