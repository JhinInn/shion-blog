import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="py-12 flex flex-col items-center text-center">
      <Avatar className="w-24 h-24 mb-6">
        <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=shion" alt="Shion" />
        <AvatarFallback className="text-2xl">S</AvatarFallback>
      </Avatar>
      
      <h1 className="text-3xl font-bold mb-3">Shion</h1>
      
      <p className="text-muted-foreground max-w-md mb-4">
        测试开发工程师 | 热爱自动化测试与工具开发
      </p>
      
      <div className="flex gap-2 flex-wrap justify-center">
        <Badge variant="secondary">Python</Badge>
        <Badge variant="secondary">Java</Badge>
        <Badge variant="secondary">自动化测试</Badge>
        <Badge variant="secondary">Next.js</Badge>
      </div>
    </section>
  );
}
