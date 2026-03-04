import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const posts = [
  {
    id: 1,
    title: "如何构建高效的自动化测试框架",
    description: "从零开始搭建一个可维护、可扩展的自动化测试框架，涵盖架构设计、技术选型与最佳实践。",
    date: "2026-03-01",
    tags: ["Python", "测试"],
    readTime: "8 min",
  },
  {
    id: 2,
    title: "Playwright 进阶技巧分享",
    description: "深入探讨 Playwright 的高级用法，包括截图对比、性能监控、并行测试等实战技巧。",
    date: "2026-02-25",
    tags: ["Playwright", "前端测试"],
    readTime: "6 min",
  },
  {
    id: 3,
    title: "测试用例设计模式详解",
    description: "介绍常见的测试用例设计模式，如数据驱动、关键字驱动、页面对象模式等。",
    date: "2026-02-18",
    tags: ["测试理论", "最佳实践"],
    readTime: "10 min",
  },
];

export function BlogList() {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
            </div>
            <CardTitle className="text-xl">{post.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-base mb-4">{post.description}</CardDescription>
            <div className="flex gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
