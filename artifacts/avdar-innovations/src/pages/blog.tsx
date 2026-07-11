import { PageLayout } from "@/components/layout/PageLayout";
import { AnimatedText, GlassCard, FadeIn } from "@/components/ui/animated-components";
import { Link } from "wouter";
import { ArrowRight, Calendar } from "lucide-react";
import { useListBlogPosts } from "@workspace/api-client-react";

export const dummyPosts = [
  {
    slug: "future-of-sme-automation",
    title: "Why SMEs Must Automate or Die in the Next 5 Years",
    excerpt: "The gap between enterprises and SMEs used to be capital. Today, it's automation. Learn how generative AI levels the playing field and makes efficiency accessible.",
    publishedAt: "2023-10-12T00:00:00.000Z",
    category: "AI & Automation",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070"
  },
  {
    slug: "custom-erp-vs-saas",
    title: "The Hidden Costs of Off-the-Shelf SaaS Platforms",
    excerpt: "Why scaling businesses eventually hit a wall with generic software, and the profound long-term ROI of building custom enterprise architecture.",
    publishedAt: "2023-09-28T00:00:00.000Z",
    category: "Engineering",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015"
  },
  {
    slug: "generative-ai-in-healthcare",
    title: "Predictive Healthcare: How AI is Changing Patient Management",
    excerpt: "From automated triage to predictive resource allocation, we explore the software infrastructure powering modern hospitals and reducing physician burnout.",
    publishedAt: "2023-09-15T00:00:00.000Z",
    category: "Industry Insights",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=2070"
  }
];

export default function Blog() {
  const { data: dbBlogs } = useListBlogPosts();

  const posts = (dbBlogs && dbBlogs.length > 0 ? dbBlogs : dummyPosts) as any[];

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return "Oct 12, 2023";
    }
  };

  return (
    <PageLayout>
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mb-20">
            <AnimatedText 
              text="The Journal."
              className="text-5xl md:text-7xl font-display font-bold mb-6 text-foreground"
            />
            <p className="text-xl text-muted-foreground">
              Deep dives into AI engineering, software architecture, and the mechanics of modern digital transformation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <FadeIn key={post.slug} delay={i * 0.1}>
                <GlassCard className="flex flex-col h-full overflow-hidden group hover:border-primary/30 transition-all duration-300 border border-border p-0">
                  <div className="aspect-video relative overflow-hidden bg-muted border-b border-border">
                    <img 
                      src={post.image || "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2070"} 
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4 font-mono">
                      <span className="text-primary font-semibold uppercase">{post.category}</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(post.publishedAt || post.createdAt)}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>

                    <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-foreground mt-auto transition-colors group/link">
                      Read Article <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
