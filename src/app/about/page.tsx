"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Github } from "lucide-react";

interface AboutData {
  name: string;
  title: string;
  bio: string;
  location: string;
  github: string;
  tags: string[];
  avatar: string;
}

export default function AboutPage() {
  const [about, setAbout] = useState<AboutData>({
    name: "Shion",
    title: "测试开发工程师 | 热爱自动化测试与工具开发",
    bio: "你好！我是一名热爱技术的测试开发工程师。",
    location: "中国",
    github: "https://github.com/JhinInn",
    tags: ["Python", "Java", "自动化测试", "Next.js", "Playwright"],
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=shion",
  });

  useEffect(() => {
    fetch("/api/about")
      .then(res => res.json())
      .then(data => setAbout(data))
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-32 h-32 mb-6">
                  <AvatarImage src={about.avatar} alt={about.name} />
                  <AvatarFallback className="text-4xl">{about.name[0]}</AvatarFallback>
                </Avatar>
                
                <h1 className="text-3xl font-bold mb-2">{about.name}</h1>
                
                <p className="text-muted-foreground mb-6">{about.title}</p>
                
                <div className="flex gap-2 flex-wrap justify-center mb-8">
                  {about.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>

                <div className="w-full space-y-4 text-left">
                  <h2 className="text-xl font-semibold mb-4">关于我</h2>
                  
                  <div className="text-muted-foreground leading-relaxed space-y-4">
                    {about.bio.split("\\n").map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>

                  <h2 className="text-xl font-semibold mb-4 mt-8">联系方式</h2>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="w-5 h-5" />
                      <span>{about.location}</span>
                    </div>
                    
                    {about.github && (
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Github className="w-5 h-5" />
                        <a href={about.github} target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                          {about.github.replace("https://", "")}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
