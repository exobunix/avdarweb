import { PageLayout } from "@/components/layout/PageLayout";
import { FadeIn } from "@/components/ui/animated-components";
import { useParams, Link } from "wouter";
import { ArrowLeft, Calendar, Tag, Share2, Twitter, Linkedin } from "lucide-react";
import { dummyPosts } from "./blog";

export default function BlogPost() {
  const { slug } = useParams();
  const post = dummyPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <PageLayout>
        <div className="container mx-auto px-6 py-40 text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 text-white/30 text-2xl font-mono">404</div>
          <h1 className="text-4xl font-display font-bold mb-4 text-white">Post not found</h1>
          <p className="text-muted-foreground mb-8">The article you are looking for does not exist or has been moved.</p>
          <Link href="/blog" className="px-6 py-3 bg-white text-black font-medium rounded-full hover:bg-white/90 transition-colors">
            Return to Insights
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <article className="py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-white transition-colors mb-12 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <ArrowLeft className="w-4 h-4" /> Back to Insights
          </Link>
          
          <div className="flex flex-wrap items-center gap-4 text-sm font-mono text-muted-foreground mb-8">
            <span className="flex items-center gap-1.5 text-primary bg-primary/10 px-3 py-1 rounded border border-primary/20">
              <Tag className="w-4 h-4" /> {post.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> {post.date}
            </span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>

          <FadeIn>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 leading-tight">
              {post.title}
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex items-center justify-between py-6 border-y border-white/10 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-orange-500 p-0.5">
                  <div className="w-full h-full bg-background rounded-full flex items-center justify-center font-bold text-sm">
                    AI
                  </div>
                </div>
                <div>
                  <div className="font-bold text-white">Avdar Engineering</div>
                  <div className="text-sm text-muted-foreground">Technical Editorial Team</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground mr-2">Share:</span>
                <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-[#1DA1F2] hover:text-white transition-colors hover:scale-110">
                  <Twitter className="w-4 h-4" />
                </button>
                <button className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/70 hover:bg-[#0A66C2] hover:text-white transition-colors hover:scale-110">
                  <Linkedin className="w-4 h-4" />
                </button>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} className="prose prose-invert prose-lg max-w-none text-muted-foreground prose-headings:font-display prose-headings:font-bold prose-headings:text-white prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-p:leading-relaxed">
            <p className="lead text-2xl text-white/90 font-medium mb-10">
              {post.excerpt}
            </p>
            
            <p>
              In today's hyper-competitive digital landscape, the difference between market leaders and laggards is rarely their core product offering. Instead, the ultimate differentiator has become operational velocity—how fast a company can process data, execute decisions, and ship value to the customer.
            </p>
            
            <p>
              This is where the traditional enterprise software model breaks down. For years, businesses have relied on massive, bloated, one-size-fits-all SaaS platforms. These tools are powerful, but they force companies to adapt their unique business processes to fit the software's rigid constraints. 
            </p>

            <h2>The Architecture of Automation</h2>
            <p>
              True digital transformation requires a shift from passive data storage to active, predictive intelligence. When we architect custom solutions at Avdar Innovations, we don't just build databases; we build event-driven ecosystems.
            </p>
            
            <ul>
              <li><strong>Event-Driven Microservices:</strong> Systems that trigger actions instantly across the organization without manual oversight.</li>
              <li><strong>Predictive Analytics:</strong> Leveraging historical data to forecast inventory needs, cash flow shortages, or customer churn before it happens.</li>
              <li><strong>Conversational Interfaces:</strong> Replacing complex nested menus with natural language processing, allowing employees to query data just like talking to a colleague.</li>
            </ul>

            <blockquote>
              "Software is eating the world, but Artificial Intelligence is eating software. The future belongs to businesses that build intelligence directly into their foundation."
            </blockquote>

            <h2>Implementation Strategy</h2>
            <p>
              The transition doesn't happen overnight. It begins with a comprehensive audit of existing bottlenecks. We typically identify the highest ROI processes—often in accounting reconciliation, customer support triage, or inventory management—and implement targeted AI automations there first.
            </p>
            
            <p>
              By utilizing containerized deployment (Docker/Kubernetes) and robust CI/CD pipelines, we ensure that these new automated systems can be tested and deployed with zero downtime, integrating seamlessly with whatever legacy systems must temporarily remain in place.
            </p>

            <h2>Looking Forward</h2>
            <p>
              The next five years will see a dramatic widening of the capability gap. Companies that invest in custom automation and AI-native architecture today will operate with margins and speed that their competitors simply cannot match. The question isn't whether you can afford to automate—it's whether you can afford not to.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.3} className="mt-16 pt-8 border-t border-white/10 text-center">
            <h3 className="text-2xl font-display font-bold text-white mb-4">Ready to upgrade your architecture?</h3>
            <p className="text-muted-foreground mb-6">Our engineering team is ready to analyze your workflows.</p>
            <Link href="/contact" className="inline-block px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-colors shadow-[0_0_20px_rgba(2,132,199,0.3)] hover:shadow-[0_0_30px_rgba(2,132,199,0.5)]">
              Schedule a Technical Consultation
            </Link>
          </FadeIn>
        </div>
      </article>
    </PageLayout>
  );
}
