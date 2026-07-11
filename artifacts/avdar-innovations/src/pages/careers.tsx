import { PageLayout } from "@/components/layout/PageLayout";
import { AnimatedText, GlassCard, GlowingButton, FadeIn } from "@/components/ui/animated-components";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Coffee, Laptop, Heart, MapPin, Zap, BrainCircuit, Code2 } from "lucide-react";
import { useListPageContent, useListCareerRoles } from "@workspace/api-client-react";
import { getBlockValue } from "@/lib/cms";

export default function Careers() {
  const { data: pageBlocks } = useListPageContent("careers");
  const { data: dbRoles } = useListCareerRoles();

  const heroBlock = getBlockValue(pageBlocks, "hero", {
    title: "Join the Vanguard.",
    description: "We are a collective of misfits, hackers, and craftsmen. We don't hire clock-punchers; we hire owners who obsess over details and want to architect the future of software."
  });

  const defaultRoles = [
    { title: "Senior React/Next.js Engineer", dept: "Engineering", type: "Remote / India", exp: "4+ Years" },
    { title: "AI/ML Python Engineer", dept: "Data Science", type: "Remote / India", exp: "3+ Years" },
    { title: "Senior Flutter Developer", dept: "Engineering", type: "Remote / India", exp: "3+ Years" },
    { title: "Node.js Backend Architect", dept: "Engineering", type: "Remote / India", exp: "5+ Years" },
    { title: "Product Designer (UI/UX)", dept: "Design", type: "Remote / India", exp: "3+ Years" },
    { title: "Project Manager (Agile/Scrum)", dept: "Operations", type: "Remote / India", exp: "4+ Years" },
    { title: "Enterprise Sales Executive", dept: "Sales", type: "Remote / Global", exp: "5+ Years" },
    { title: "DevOps/Cloud Engineer (AWS)", dept: "Engineering", type: "Remote / India", exp: "3+ Years" }
  ];

  const roles = dbRoles && dbRoles.length > 0
    ? dbRoles.sort((a, b) => a.order - b.order).map((r) => ({
        title: r.title,
        dept: r.department,
        type: r.location,
        exp: r.type // using type field for employment type/experience details
      }))
    : defaultRoles;

  return (
    <PageLayout>
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-[600px] bg-orange-500/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mb-24">
            <AnimatedText 
              text={heroBlock.title}
              className="text-5xl md:text-7xl font-display font-bold mb-6 text-foreground"
            />
            <p className="text-xl text-muted-foreground leading-relaxed">
              {heroBlock.description}
            </p>
          </div>

          {/* Life at Avdar Block */}
          <div className="mb-32">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center text-foreground">Life at Avdar Innovations</h2>
            <div className="grid lg:grid-cols-3 gap-8">
              <FadeIn className="glass-panel p-8 rounded-3xl col-span-1 lg:col-span-2 relative overflow-hidden group hover:border-foreground/20 transition-colors border border-border">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="text-2xl font-bold mb-4 flex items-center gap-3 relative z-10 text-foreground"><Zap className="text-orange-400" /> Output Over Hours</h3>
                <p className="text-muted-foreground leading-relaxed text-lg mb-4 relative z-10">
                  We are async-first and output-driven. Hierarchy takes a backseat to competence. If your idea is better, it ships. We care about the elegance of the code you write, the pixels you push, and the deals you close—not how many hours your Slack dot stays green.
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg relative z-10">
                  You are given a problem and the autonomy to solve it. Micro-management is banned. Extreme ownership is required.
                </p>
              </FadeIn>

              <FadeIn delay={0.1} className="glass-panel p-8 rounded-3xl flex flex-col justify-center items-center text-center bg-white/5 border border-primary/20 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(2,132,199,0.15)] transition-all">
                <BrainCircuit className="w-16 h-16 text-primary mb-6" />
                <h3 className="text-2xl font-bold mb-4 text-foreground">Continuous Learning</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Technology moves fast. We move faster. Every Friday is dedicated to exploring new frameworks, testing new AI models, and upskilling.
                </p>
              </FadeIn>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                { icon: MapPin, text: "Remote-First & Async" },
                { icon: Heart, text: "Premium Health Coverage" },
                { icon: Code2, text: "R&D Learning Budget" },
                { icon: Laptop, text: "MacBook Pro & Gear" },
                { icon: Zap, text: "Equity & Profit Sharing" },
                { icon: Coffee, text: "Unlimited PTO Policy" },
                { icon: BrainCircuit, text: "Paid AI Subscriptions" },
                { icon: Zap, text: "Annual Global Retreat" }
              ].map((perk, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div className="glass-panel p-6 flex flex-col items-center justify-center text-center gap-3 hover:bg-white/10 hover:scale-[1.02] transition-all rounded-2xl h-full cursor-default border border-border">
                    <perk.icon className="w-6 h-6 text-foreground/50" />
                    <span className="font-medium text-sm text-foreground/90">{perk.text}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <FadeIn>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-2 text-foreground">Open Roles</h2>
                <p className="text-muted-foreground">Find your next mission. We are actively interviewing for these positions.</p>
              </FadeIn>
            </div>
            
            <div className="flex flex-col gap-4">
              {roles.map((role, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <GlassCard className="flex flex-col sm:flex-row sm:items-center justify-between p-6 gap-6 group hover:border-primary/30 transition-colors border border-border">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{role.title}</h3>
                      <div className="flex flex-wrap gap-3 text-xs font-mono text-muted-foreground">
                        <span className="bg-white/5 px-2 py-1 rounded border border-border group-hover:border-foreground/20 transition-colors">{role.dept}</span>
                        <span className="bg-white/5 px-2 py-1 rounded border border-border group-hover:border-foreground/20 transition-colors">{role.type}</span>
                        <span className="bg-white/5 px-2 py-1 rounded border border-border group-hover:border-foreground/20 transition-colors">{role.exp}</span>
                      </div>
                    </div>
                    <Link href="/contact">
                      <GlowingButton variant="outline" className="shrink-0 w-full sm:w-auto">Apply Now</GlowingButton>
                    </Link>
                  </GlassCard>
                </FadeIn>
              ))}
            </div>
            
            <div className="mt-12 text-center p-12 border border-border border-dashed rounded-3xl bg-white/[0.02]">
              <h3 className="text-2xl font-display font-bold mb-4 text-foreground">Don't see a perfect fit?</h3>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">We are always looking for exceptional talent. If you think you belong here, send us your portfolio, GitHub, and a brief note on what you want to build.</p>
              <a href="mailto:careers@avdarinnovations.com" className="inline-flex items-center gap-2 bg-foreground text-background px-6 py-3 rounded-full font-bold hover:bg-foreground/90 transition-colors">
                Email careers@avdarinnovations.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
