"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

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

export function MomentsPreview() {
  const [moments, setMoments] = useState<Moment[]>([]);

  useEffect(() => {
    fetch("/api/moments")
      .then(res => res.json())
      .then(data => setMoments(data.slice(0, 3)))
      .catch(console.error);
  }, []);

  if (moments.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm">
        暂无动态
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {moments.map((moment) => (
        <Card key={moment.id} className="hover:shadow-sm transition-shadow">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=shion" />
                <AvatarFallback className="text-xs">S</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm leading-relaxed">{moment.content}</p>
                <p className="text-xs text-muted-foreground mt-1">{formatTime(moment.createdAt)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="text-center">
        <Link 
          href="/moments" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          查看全部动态
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="ml-1 w-4 h-4"
          >
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}
