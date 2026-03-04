"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <span className="text-primary">✦</span>
          Shion&apos;s Blog
        </Link>
        
        <nav className="flex items-center gap-4">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
            首页
          </Link>
          <Link href="/posts" className="text-sm font-medium hover:text-primary transition-colors">
            文章
          </Link>
          <Link href="/moments" className="text-sm font-medium hover:text-primary transition-colors">
            动态
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
            关于
          </Link>
          <Button size="sm" className="gap-2" asChild>
            <Link href="/admin">
              <PenLine className="w-4 h-4" />
              控制台
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
