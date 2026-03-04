import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { MomentsPreview } from "@/components/moments-preview";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <Hero />
        
        <section className="max-w-2xl mx-auto mt-16">
          <h2 className="text-xl font-semibold mb-6 text-center text-muted-foreground">
            最新动态
          </h2>
          <MomentsPreview />
        </section>
      </main>
      <Footer />
    </div>
  );
}
