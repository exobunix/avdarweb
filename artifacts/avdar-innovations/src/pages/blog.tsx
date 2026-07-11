import { PageLayout } from "@/components/layout/PageLayout";
import { AnimatedText, GlassCard, FadeIn } from "@/components/ui/animated-components";
import { Link } from "wouter";
import { ArrowRight, Calendar, Tag } from "lucide-react";

export const dummyPosts = [
  {
    slug: "future-of-sme-automation",
    title: "Why SMEs Must Automate or Die in the Next 5 Years",
    excerpt: "The gap between enterprises and SMEs used to be capital. Today, it's automation. Learn how generative AI levels the playing field and makes efficiency accessible.",
    date: "Oct 12, 2023",
    category: "AI & Automation",
    readTime: "5 min read"
  },
  {
    slug: "custom-erp-vs-saas",
    title: "The Hidden Costs of Off-the-Shelf SaaS Platforms",
    excerpt: "Why scaling businesses eventually hit a wall with generic software, and the profound long-term ROI of building custom enterprise architecture.",
    date: "Sep 28, 2023",
    category: "Engineering",
    readTime: "7 min read"
  },
  {
    slug: "generative-ai-in-healthcare",
    title: "Predictive Healthcare: How AI is Changing Patient Management",
    excerpt: "From automated triage to predictive resource allocation, we explore the software infrastructure powering modern hospitals and reducing physician burnout.",
    date: "Sep 15, 2023",
    category: "Industry Insights",
    readTime: "6 min read"
  },
  {
    slug: "react-vs-flutter-enterprise",
    title: "React Native vs Flutter: The Enterprise Perspective",
    excerpt: "When to choose which cross-platform framework. We break down performance, developer velocity, and maintainability for large-scale mobile applications.",
    date: "Aug 30, 2023",
    category: "Tech Stack",
    readTime: "8 min read"
  },
  {
    slug: "securing-the-modern-api",
    title: "Zero Trust Architecture: Securing the Modern API",
    excerpt: "As cyber threats evolve, perimeter defense is dead. How to implement zero-trust principles in your Node.js and microservice architectures.",
    date: "Aug 12, 2023",
    category: "Security",
    readTime: "6 min read"
  },
  {
    slug: "the-death-of-the-spreadsheet",
    title: "The Death of the Spreadsheet: Why Internal Tools Matter",
    excerpt: "If your operations run on massive Excel files, you are losing money. The case for bespoke internal dashboards and CRM tools.",
    date: "Jul 25, 2023",
    category: "Digital Transformation",
    readTime: "5 min read"
  }
];

export default function Blog() {
  return (
    <PageLayout>
      <section className="py-24 relative">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mb-20">
            <AnimatedText 
              text="Insights & Engineering."
              className="text-5xl md:text-7xl font-display font-bold mb-6"
            />
            <p className="text-xl text-muted-foreground leading-relaxed">
              Deep dives into software architecture, artificial intelligence, and the digital transformation of modern business. Written by our senior engineering and product teams.
            </p>
          </div>

          <div className="grid gap-8 max-w-4xl mx-auto">
            {dummyPosts.map((post, i) => (
              <FadeIn key={post.slug} delay={i * 0.1}>
                <Link href={`/blog/${post.slug}`}>
                  <GlassCard className="cursor-pointer group flex flex-col sm:flex-row gap-8 sm:items-center justify-between hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground mb-4">
                        <span className="flex items-center gap-1 text-primary bg-primary/10 px-2 py-1 rounded">
                          <Tag className="w-3 h-3" /> {post.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {post.date}
                        </span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h2 className="text-2xl font-display font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">{post.title}</h2>
                      <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all text-white/50 group-hover:scale-110">
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </GlassCard>
                </Link>
              </FadeIn>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <button className="px-8 py-3 rounded-full border border-white/20 text-white/80 hover:bg-white/5 hover:text-white transition-colors text-sm font-medium">
              Load More Articles
            </button>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
