import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, Github, MapPin } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-32 h-32 mb-6">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=shion" alt="Shion" />
                  <AvatarFallback className="text-4xl">S</AvatarFallback>
                </Avatar>
                
                <h1 className="text-3xl font-bold mb-2">Shion</h1>
                
                <p className="text-muted-foreground mb-6">
                  测试开发工程师 | 热爱自动化测试与工具开发
                </p>
                
                <div className="flex gap-2 flex-wrap justify-center mb-8">
                  <Badge variant="secondary">Python</Badge>
                  <Badge variant="secondary">Java</Badge>
                  <Badge variant="secondary">自动化测试</Badge>
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">Playwright</Badge>
                </div>

                <div className="w-full space-y-4 text-left">
                  <h2 className="text-xl font-semibold mb-4">关于我</h2>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    你好！我是 Shion，一名热爱技术的测试开发工程师。
                    日常工作是编写自动化测试用例、分析 PRD 文档、完善测试体系。
                  </p>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    这个博客是我记录技术思考、分享工具心得的地方。
                    希望能通过文字认识更多志同道合的朋友。
                  </p>

                  <h2 className="text-xl font-semibold mb-4 mt-8">联系方式</h2>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="w-5 h-5" />
                      <span>中国</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Github className="w-5 h-5" />
                      <a href="https://github.com/JhinInn" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                        github.com/JhinInn
                      </a>
                    </div>
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
