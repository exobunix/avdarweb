import { PageLayout } from "@/components/layout/PageLayout";
import { FadeIn } from "@/components/ui/animated-components";
import { useParams, Link } from "wouter";
import { ArrowLeft, Calendar, Tag, Twitter, Linkedin } from "lucide-react";
import { useListBlogPosts } from "@workspace/api-client-react";
import { dummyPosts } from "./blog";

export default function BlogPost() {
  const { slug } = useParams();
  const { data: dbBlogs } = useListBlogPosts();

  const posts = dbBlogs && dbBlogs.length > 0 ? dbBlogs : dummyPosts;
  
  // Find the active article
  const post = posts.find((p) => p.slug === slug) as any;

  if (!post) {
    return (
      <PageLayout>
        <div className="container mx-auto px-6 py-40 text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 text-white/30 text-2xl font-mono border border-border">404</div>
          <h1 className="text-4xl font-display font-bold mb-4 text-foreground">Post not found</h1>
          <p className="text-muted-foreground mb-8">The article you are looking for does not exist or has been moved.</p>
          <Link href="/blog" className="px-6 py-3 bg-foreground text-background font-medium rounded-full hover:bg-foreground/90 transition-colors">
            Return to Insights
          </Link>
        </div>
      </PageLayout>
    );
  }

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    } catch {
      return "Oct 12, 2023";
    }
  };

  // Safe split content renderer
  const renderContent = (contentStr: string) => {
    if (!contentStr) return null;
    return contentStr.split("\n\n").map((para, idx) => {
      const trimmed = para.trim();
      if (trimmed.startsWith("## ")) {
        return <h2 key={idx} className="text-2xl md:text-3xl font-display font-bold text-foreground mt-8 mb-4">{trimmed.replace("## ", "")}</h2>;
      }
      if (trimmed.startsWith("### ")) {
        return <h3 key={idx} className="text-xl md:text-2xl font-display font-bold text-foreground mt-6 mb-3">{trimmed.replace("### ", "")}</h3>;
      }
      if (trimmed.startsWith("> ")) {
        return <blockquote key={idx} className="border-l-4 border-primary pl-4 italic my-6 text-foreground/90 font-medium">{trimmed.replace("> ", "")}</blockquote>;
      }
      if (trimmed.startsWith("- ")) {
        const items = trimmed.split("\n").map(li => li.replace("- ", "").trim());
        return (
          <ul key={idx} className="list-disc pl-6 space-y-2 mb-6">
            {items.map((item, itemIdx) => (
              <li key={itemIdx}>{item}</li>
            ))}
          </ul>
        );
      }
      return <p key={idx} className="mb-6 leading-relaxed text-muted-foreground">{trimmed}</p>;
    });
  };

  const articleContent = post.content || `
In today's hyper-competitive digital landscape, the difference between market leaders and laggards is rarely their core product offering. Instead, the ultimate differentiator has become operational velocity—how fast a company can process data, execute decisions, and ship value to the customer.

This is where the traditional enterprise software model breaks down. For years, businesses have relied on massive, bloated, one-size-fits-all SaaS platforms. These tools are powerful, but they force companies to adapt their unique business processes to fit the software's rigid constraints. 

## The Architecture of Automation
True digital transformation requires a shift from passive data storage to active, predictive intelligence. When we architect custom solutions at Avdar Innovations, we don't just build databases; we build event-driven ecosystems.

- **Event-Driven Microservices:** Systems that trigger actions instantly across the organization without manual oversight.
- **Predictive Analytics:** Leveraging historical data to forecast inventory needs, cash flow shortages, or customer churn before it happens.
- **Conversational Interfaces:** Replacing complex nested menus with natural language processing, allowing employees to query data just like talking to a colleague.

> "Software is eating the world, but Artificial Intelligence is eating software. The future belongs to businesses that build intelligence directly into their foundation."

## Implementation Strategy
The transition doesn't happen overnight. It begins with a comprehensive audit of existing bottlenecks. We typically identify the highest ROI processes—often in accounting reconciliation, customer support triage, or inventory management—and implement targeted AI automations there first.

By utilizing containerized deployment (Docker/Kubernetes) and robust CI/CD pipelines, we ensure that these new automated systems can be tested and deployed with zero downtime, integrating seamlessly with whatever legacy systems must temporarily remain in place.

## Looking Forward
The next five years will see a dramatic widening of the capability gap. Companies that invest in custom automation and AI-native architecture today will operate with margins and speed that their competitors simply cannot match. The question isn't whether you can afford to automate—it's whether you can afford not to.
  `;

  return (
    <PageLayout>
      <article className="py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-12 bg-white/5 px-4 py-2 rounded-full border border-border">
            <ArrowLeft className="w-4 h-4" /> Back to Insights
          </Link>
          
          <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-muted-foreground mb-8">
            <span className="flex items-center gap-1.5 text-primary bg-primary/10 px-3 py-1 rounded border border-primary/20">
              <Tag className="w-4 h-4" /> {post.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> {formatDate(post.publishedAt)}
            </span>
          </div>

          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-8 leading-tight">
              {post.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex items-center justify-between py-6 border-y border-border mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 p-0.5">
                  <div className="w-full h-full bg-background rounded-full flex items-center justify-center font-bold text-xs text-foreground">
                    AI
                  </div>
                </div>
                <div>
                  <div className="font-bold text-foreground">{post.author || "Avdar Engineering"}</div>
                  <div className="text-sm text-muted-foreground">Technical Editorial Team</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground mr-2">Share:</span>
                <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-[#1DA1F2] hover:text-white transition-colors hover:scale-110 border border-border">
                  <Twitter className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-[#0A66C2] hover:text-white transition-colors hover:scale-110 border border-border">
                  <Linkedin className="w-4 h-4" />
                </button>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="text-muted-foreground leading-relaxed text-lg">
            <p className="text-2xl text-foreground/90 font-medium mb-10 leading-normal">
              {post.excerpt}
            </p>
            {renderContent(articleContent)}
          </FadeIn>
          
          <FadeIn delay={0.3} className="mt-16 pt-8 border-t border-border text-center">
            <h3 className="text-2xl font-display font-bold text-foreground mb-4">Ready to upgrade your architecture?</h3>
            <p className="text-muted-foreground mb-6">Our engineering team is ready to analyze your workflows.</p>
            <Link href="/contact" className="inline-block px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-full hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl">
              Schedule a Technical Consultation
            </Link>
          </FadeIn>
        </div>
      </article>
    </PageLayout>
  );
}
