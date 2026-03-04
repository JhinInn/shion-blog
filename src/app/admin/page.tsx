"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, FileText, MessageSquare, Loader2, Settings, AlertCircle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const categories = [
  { id: "tech", name: "技术博客" },
  { id: "thoughts", name: "个人随想" },
  { id: "tools", name: "工具分享" },
];

interface Post {
  id: string;
  title: string;
  category: string;
  createdAt: string;
}

interface Moment {
  id: string;
  content: string;
  createdAt: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [moments, setMoments] = useState<Moment[]>([]);
  const [loading, setLoading] = useState(true);
  
  // 文章表单
  const [postForm, setPostForm] = useState({
    title: "",
    category: "",
    description: "",
    content: "",
    readTime: "5 min",
  });
  
  // 动态表单
  const [momentContent, setMomentContent] = useState("");

  // 加载已有内容
  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [postsRes, momentsRes] = await Promise.all([
        fetch("/api/posts"),
        fetch("/api/moments"),
      ]);
      const postsData = await postsRes.json();
      const momentsData = await momentsRes.json();
      setPosts(postsData);
      setMoments(momentsData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setLoading(false);
    }
  }

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  async function handleSubmitPost(e: React.FormEvent) {
    e.preventDefault();
    if (!postForm.title || !postForm.category) return;
    
    setSubmitting(true);
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...postForm,
          tags,
        }),
      });
      
      if (res.ok) {
        alert("文章发布成功！");
        setPostForm({ title: "", category: "", description: "", content: "", readTime: "5 min" });
        setTags([]);
        fetchData();
      } else {
        alert("发布失败");
      }
    } catch (error) {
      console.error(error);
      alert("发布出错");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSubmitMoment(e: React.FormEvent) {
    e.preventDefault();
    if (!momentContent.trim()) return;
    
    setSubmitting(true);
    try {
      const res = await fetch("/api/moments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: momentContent }),
      });
      
      if (res.ok) {
        alert("动态发布成功！");
        setMomentContent("");
        fetchData();
      } else {
        alert("发布失败");
      }
    } catch (error) {
      console.error(error);
      alert("发布出错");
    } finally {
      setSubmitting(false);
    }
  }

  async function deletePost(id: string) {
    try {
      const res = await fetch(`/api/posts/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPosts(posts.filter(p => p.id !== id));
      } else {
        alert("删除失败");
      }
    } catch (error) {
      console.error(error);
      alert("删除出错");
    }
  }

  async function deleteMoment(id: string) {
    try {
      const res = await fetch(`/api/moments/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMoments(moments.filter(m => m.id !== id));
      } else {
        alert("删除失败");
      }
    } catch (error) {
      console.error(error);
      alert("删除出错");
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">控制台</h1>
            <p className="text-muted-foreground">管理你的文章和动态</p>
          </div>

          <Tabs defaultValue="post" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="post" className="gap-2">
                <FileText className="w-4 h-4" />
                写文章
              </TabsTrigger>
              <TabsTrigger value="moment" className="gap-2">
                <MessageSquare className="w-4 h-4" />
                发动态
              </TabsTrigger>
              <TabsTrigger value="manage" className="gap-2">
                <Settings className="w-4 h-4" />
                管理
              </TabsTrigger>
            </TabsList>

            <TabsContent value="post">
              <form onSubmit={handleSubmitPost}>
                <Card>
                  <CardHeader>
                    <CardTitle>发布新文章</CardTitle>
                    <CardDescription>填写文章信息并发布</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="title">文章标题 *</Label>
                      <Input 
                        id="title" 
                        placeholder="输入文章标题..."
                        value={postForm.title}
                        onChange={e => setPostForm({...postForm, title: e.target.value})}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">分类 *</Label>
                      <select 
                        id="category"
                        required
                        value={postForm.category}
                        onChange={e => setPostForm({...postForm, category: e.target.value})}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">选择分类</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">文章摘要</Label>
                      <Textarea 
                        id="description" 
                        placeholder="简短描述文章内容..."
                        rows={3}
                        value={postForm.description}
                        onChange={e => setPostForm({...postForm, description: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content">正文内容</Label>
                      <Textarea 
                        id="content" 
                        placeholder="开始写作..."
                        rows={10}
                        value={postForm.content}
                        onChange={e => setPostForm({...postForm, content: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>标签</Label>
                      <div className="flex gap-2">
                        <Input 
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="添加标签..."
                          onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                        />
                        <Button type="button" variant="outline" onClick={addTag}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex gap-2 flex-wrap mt-2">
                        {tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                            {tag}
                            <button 
                              type="button"
                              onClick={() => removeTag(tag)}
                              className="ml-1 hover:text-destructive"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={submitting || !postForm.title || !postForm.category}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          发布中...
                        </>
                      ) : "发布文章"}
                    </Button>
                  </CardContent>
                </Card>
              </form>
            </TabsContent>

            <TabsContent value="moment">
              <form onSubmit={handleSubmitMoment}>
                <Card>
                  <CardHeader>
                    <CardTitle>发布动态</CardTitle>
                    <CardDescription>分享当下的想法</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="moment-content">内容</Label>
                      <Textarea 
                        id="moment-content" 
                        placeholder="分享点什么..."
                        rows={5}
                        value={momentContent}
                        onChange={e => setMomentContent(e.target.value)}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={submitting || !momentContent.trim()}
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          发布中...
                        </>
                      ) : "发布动态"}
                    </Button>
                  </CardContent>
                </Card>
              </form>
            </TabsContent>

            <TabsContent value="manage">
              <div className="space-y-6">
                {/* 文章管理 */}
                <Card>
                  <CardHeader>
                    <CardTitle>文章管理</CardTitle>
                    <CardDescription>共 {posts.length} 篇文章</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="text-center py-4 text-muted-foreground">加载中...</div>
                    ) : posts.length === 0 ? (
                      <div className="text-center py-4 text-muted-foreground">暂无文章</div>
                    ) : (
                      <div className="space-y-2">
                        {posts.map((post) => (
                          <div key={post.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex-1 min-w-0">
                              <Link 
                                href={`/posts/${post.id}`} 
                                className="font-medium hover:text-primary truncate block"
                              >
                                {post.title}
                              </Link>
                              <p className="text-xs text-muted-foreground">
                                {categories.find(c => c.id === post.category)?.name} · {new Date(post.createdAt).toLocaleDateString("zh-CN")}
                              </p>
                            </div>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-destructive">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>确认删除</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    确定要删除文章「{post.title}」吗？此操作无法撤销。
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>取消</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => deletePost(post.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    删除
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* 动态管理 */}
                <Card>
                  <CardHeader>
                    <CardTitle>动态管理</CardTitle>
                    <CardDescription>共 {moments.length} 条动态</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="text-center py-4 text-muted-foreground">加载中...</div>
                    ) : moments.length === 0 ? (
                      <div className="text-center py-4 text-muted-foreground">暂无动态</div>
                    ) : (
                      <div className="space-y-2">
                        {moments.map((moment) => (
                          <div key={moment.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex-1 min-w-0 mr-4">
                              <p className="text-sm truncate">{moment.content}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(moment.createdAt).toLocaleDateString("zh-CN")}
                              </p>
                            </div>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-destructive">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>确认删除</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    确定要删除这条动态吗？此操作无法撤销。
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>取消</AlertDialogCancel>
                                  <AlertDialogAction 
                                    onClick={() => deleteMoment(moment.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    删除
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
