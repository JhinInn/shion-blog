import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const moments = [
  {
    id: 1,
    content: "终于把博客搭起来了！Next.js + shadcn/ui 真香 ✨",
    time: "刚刚",
  },
  {
    id: 2,
    content: "今天研究了一下 GitHub Actions，CI/CD 自动化部署真方便。",
    time: "2小时前",
  },
  {
    id: 3,
    content: "写测试用例写得眼睛疼，去喝杯咖啡 ☕️",
    time: "昨天",
  },
  {
    id: 4,
    content: "分享一个今天发现的好用的测试工具 —— Playwright 的 trace viewer 真不错！",
    time: "2天前",
  },
];

export function Moments() {
  return (
    <div className="space-y-4">
      {moments.map((moment) => (
        <Card key={moment.id} className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex gap-3">
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=shion" />
                <AvatarFallback className="text-xs">S</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm leading-relaxed mb-2">{moment.content}</p>
                <p className="text-xs text-muted-foreground">{moment.time}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
