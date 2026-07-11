import { PageLayout } from "@/components/layout/PageLayout";
import { AnimatedText, GlowingButton, GlassCard, FadeIn } from "@/components/ui/animated-components";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  ArrowUpRight, Cpu, Code2, LineChart, Globe, ChevronRight,
  Zap, Shield, Clock, Users, Search, Star, 
  Building2, Factory, Landmark, ShoppingBag, HeartPulse, GraduationCap
} from "lucide-react";
import { 
  useListPageContent, 
  useListServices, 
  useListProducts, 
  useListPortfolioProjects 
} from "@workspace/api-client-react";
import { getBlockValue } from "@/lib/cms";

const heroVideo = "https://ik.imagekit.io/smcdngw8m/avdarweb/avdar-video-1_yAh25bJhV.mp4";
const storyVideo = "https://ik.imagekit.io/smcdngw8m/avdarweb/avdar-video-2_tiEgo9WJI.mp4";

export default function Home() {
  const { data: pageBlocks } = useListPageContent("home");
  const { data: dbServices } = useListServices();
  const { data: dbProducts } = useListProducts();
  const { data: dbProjects } = useListPortfolioProjects();

  const heroBlock = getBlockValue(pageBlocks, "hero", {
    title: "Building the Future of Business Software",
    subtitle: "We engineer enterprise AI solutions, SaaS platforms, and intelligent digital ecosystems that transform how visionaries operate."
  });

  const whyUsBlock = getBlockValue(pageBlocks, "whyUs", {
    title: "Why Avdar Innovations?",
    description: "We don't just write code; we solve business problems. Our engineering philosophy is built on speed, intelligence, and uncompromising reliability."
  });

  const ctaBlock = getBlockValue(pageBlocks, "cta", {
    title: "Ready to Build the Future?",
    description: "Partner with Avdar Innovations to engineer your next big leap."
  });

  const technologies = [
    "React", "Next.js", "Node.js", "Flutter", "Laravel", "MongoDB", 
    "PostgreSQL", "Firebase", "AWS", "Azure", "Docker", "Kubernetes", 
    "OpenAI", "Claude", "Gemini", "Python", "TensorFlow", "LangChain"
  ];

  const processes = [
    { num: "01", title: "Discovery", desc: "We analyze your business architecture, identify bottlenecks, and map out AI and software opportunities." },
    { num: "02", title: "Planning & Research", desc: "Drafting the technical blueprint, selecting the optimal stack, and designing scalable database schemas." },
    { num: "03", title: "UI/UX Design", desc: "Crafting frictionless, high-performance interfaces tailored to your specific user demographics." },
    { num: "04", title: "Development", desc: "Agile engineering sprints focusing on robust backend logic and pixel-perfect frontends." },
    { num: "05", title: "QA & Testing", desc: "Rigorous security audits, load testing, and automated end-to-end integration checks." },
    { num: "06", title: "Deployment", desc: "Zero-downtime launches utilizing advanced CI/CD pipelines and cloud orchestration." },
    { num: "07", title: "Ongoing Support", desc: "Continuous monitoring, model fine-tuning, and infrastructure scaling post-launch." }
  ];

  const industries = [
    { icon: HeartPulse, name: "Healthcare" },
    { icon: GraduationCap, name: "Education" },
    { icon: ShoppingBag, name: "Retail" },
    { icon: Landmark, name: "Finance" },
    { icon: Building2, name: "Real Estate" },
    { icon: Factory, name: "Manufacturing" }
  ];

  const testimonials = [
    {
      quote: "Avdar didn't just build us a CRM; they completely revolutionized how our sales team interacts with data. The AI qualification bot alone saved us 40 hours a week.",
      author: "Sarah Jenkins",
      role: "VP of Operations, NexusTech"
    },
    {
      quote: "The predictive POS system they deployed for our restaurant chain handled our busiest holiday season with zero lag. Absolute game changer for our inventory management.",
      author: "Marcus Chen",
      role: "Director, Culinary Edge"
    },
    {
      quote: "Migrating from our legacy ERP was daunting, but the Avdar team made it seamless. Their transparency and engineering rigor are unmatched in this industry.",
      author: "Priya Sharma",
      role: "CTO, Forge Manufacturing"
    },
    {
      quote: "We partnered with Avdar to build our telehealth platform. Security and speed were our top concerns, and they delivered a HIPAA-compliant app that our patients love.",
      author: "Dr. Alistair Vance",
      role: "Founder, CareSync"
    }
  ];

  // Dynamic services fallback
  const displayServices = dbServices && dbServices.length > 0
    ? dbServices.slice(0, 3).map((s) => ({ icon: Cpu, title: s.title, desc: s.description }))
    : [
        { icon: Cpu, title: "AI & Automation", desc: "Custom LLMs, intelligent chatbots, and workflow automation systems." },
        { icon: Code2, title: "Enterprise Software", desc: "Scalable ERP, CRM, and POS systems built for modern business needs." },
        { icon: Globe, title: "Web & Mobile Platforms", desc: "High-performance React/Node web apps and Flutter native mobile experiences." }
      ];

  // Dynamic products fallback
  const displayProducts = dbProducts && dbProducts.length > 0
    ? dbProducts.slice(0, 3).map((p) => ({ name: p.title, tag: "SaaS Product", desc: p.description }))
    : [
        { name: "Avdar Social AI", tag: "Marketing", desc: "Automate social media creation, scheduling, and analytics using custom fine-tuned models." },
        { name: "Avdar AutoLedger", tag: "Finance", desc: "AI-powered accounting that automatically categorizes transactions and flags anomalies." },
        { name: "Avdar SmartPOS", tag: "Retail/Food", desc: "Next-gen point of sale with predictive inventory and intelligent customer insights." }
      ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-background/60 z-10 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/80 to-background z-20" />
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover opacity-50"
            src={heroVideo}
          />
        </div>
        
        <div className="container mx-auto px-6 relative z-30 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel mb-8 border-primary/30"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-mono text-primary uppercase tracking-wider">Avdar OS 2.0 Now Live</span>
          </motion.div>

          <AnimatedText 
            text={heroBlock.title}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-6 max-w-5xl text-foreground"
          />
          
          <FadeIn delay={0.4}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
              {heroBlock.subtitle}
            </p>
          </FadeIn>
          
          <FadeIn delay={0.6}>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/contact">
                <GlowingButton variant="primary" className="w-full sm:w-auto">
                  Book Free Consultation
                </GlowingButton>
              </Link>
              <Link href="/portfolio">
                <GlowingButton variant="outline" className="w-full sm:w-auto">
                  Explore Portfolio
                </GlowingButton>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-20 relative z-20 -mt-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { label: "Projects Delivered", value: "150+" },
              { label: "Global Clients", value: "85+" },
              { label: "Years Experience", value: "5+" },
              { label: "Uptime SLA", value: "99.9%" }
            ].map((stat, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="glass-panel p-6 text-center rounded-2xl border border-border hover:border-foreground/20 hover:-translate-y-1 transition-all duration-300">
                  <div className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest font-mono">{stat.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Avdar */}
      <section className="py-24 relative overflow-hidden bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <FadeIn className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-foreground">{whyUsBlock.title}</h2>
            <p className="text-muted-foreground text-lg">{whyUsBlock.description}</p>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Zap, title: "Speed of Delivery", desc: "Our proprietary internal scaffolding and agile methodologies allow us to ship enterprise-grade software 40% faster than traditional agencies." },
              { icon: Cpu, title: "AI-First Approach", desc: "We build intelligence into the foundation. From custom LLM integrations to predictive analytics, your software will learn and adapt." },
              { icon: Users, title: "Dedicated Engineering Teams", desc: "You don't get handed off to juniors. You work directly with senior architects who treat your product like their own." },
              { icon: Search, title: "Transparent Process", desc: "Full visibility into our development cycles. Regular sprint reviews, open communication channels, and zero hidden costs." },
              { icon: Shield, title: "Security-First Architecture", desc: "Bank-grade encryption, rigorous penetration testing, and scalable cloud infrastructure that protects your most valuable data." },
              { icon: Clock, title: "Post-Launch Support", desc: "Our commitment doesn't end at deployment. We provide continuous monitoring, SLA-backed uptime, and strategic scaling advice." }
            ].map((feature, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <GlassCard className="flex flex-col relative overflow-hidden group h-full border border-border">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full transition-transform duration-700 ease-out group-hover:scale-[2] group-hover:bg-primary/10" />
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary mb-6 relative z-10 border border-white/10 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3 relative z-10 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed relative z-10">{feature.desc}</p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Services Highlight */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <FadeIn className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">Ecosystem of Innovation</h2>
              <p className="text-muted-foreground max-w-xl text-lg">Comprehensive digital transformation through cutting-edge architecture and AI integration.</p>
            </div>
            <Link href="/services" className="flex items-center gap-2 text-primary hover:text-foreground transition-colors group">
              View all services <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            {displayServices.map((service, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <GlassCard className="flex flex-col items-start h-full border border-border">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-display font-semibold mb-3 text-foreground">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Ecosystem */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[400px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">Our Technology Ecosystem</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">We leverage the most advanced, enterprise-grade frameworks to ensure your applications are fast, secure, and infinitely scalable.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {technologies.map((tech, i) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, type: "spring", stiffness: 100 }}
                className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-foreground/90 font-mono text-sm hover:bg-white/10 hover:border-primary/50 transition-all cursor-default shadow-lg"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-24 bg-black/5 border-y border-border">
        <div className="container mx-auto px-6">
          <FadeIn className="mb-16 text-center">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">How We Build</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">A systematic, transparent approach to translating complex business requirements into elegant digital solutions.</p>
          </FadeIn>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block" />
            
            <div className="space-y-12">
              {processes.map((proc, i) => (
                <FadeIn 
                  key={i}
                  direction={i % 2 === 0 ? "right" : "left"}
                  delay={i * 0.1}
                >
                  <div className={`flex flex-col md:flex-row items-center gap-8 group ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                    <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <h3 className="text-2xl font-display font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{proc.title}</h3>
                      <p className="text-muted-foreground">{proc.desc}</p>
                    </div>
                    <div className="relative shrink-0 z-10 flex items-center justify-center w-12 h-12 rounded-full bg-background border-4 border-border text-primary font-mono font-bold text-sm group-hover:border-primary/50 group-hover:scale-110 transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                      {proc.num}
                    </div>
                    <div className="w-full md:w-1/2" />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Showcase Video Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="glass-panel p-2 rounded-3xl overflow-hidden shadow-[0_0_50px_-12px_rgba(2,132,199,0.3)] border border-border">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-muted">
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-full object-cover"
                src={storyVideo}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-transparent flex items-end p-8 md:p-12">
                <div className="max-w-2xl">
                  <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">Intelligent by Design</h3>
                  <p className="text-muted-foreground text-lg">Watch how Avdar Innovations integrates generative AI directly into enterprise workflows, making your data work for you.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Preview Strip */}
      <section className="py-16 border-y border-border overflow-hidden flex flex-col items-center">
        <div className="container mx-auto px-6 mb-10 text-center flex flex-col md:flex-row items-center justify-between gap-4">
          <h2 className="text-2xl font-display font-bold text-foreground">Industries We Transform</h2>
          <Link href="/industries" className="text-primary text-sm font-semibold hover:text-foreground transition-colors flex items-center gap-1">
            See all industries <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-[infinite-scroll_30s_linear_infinite]">
            {industries.concat(industries).map((ind, i) => (
              <li key={i} className="flex flex-col items-center gap-3 glass-panel px-8 py-6 rounded-2xl min-w-[200px] border border-border">
                <ind.icon className="w-8 h-8 text-orange-400" />
                <span className="font-display font-semibold text-foreground">{ind.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* AI Products Highlight */}
      <section className="py-24 bg-gradient-to-b from-transparent to-primary/5">
        <div className="container mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-foreground">Proprietary AI SaaS</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-16 text-lg">Beyond consulting, we build standalone products powering the next generation of SMEs.</p>
          </FadeIn>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {displayProducts.map((prod, i) => (
              <FadeIn key={i} delay={i * 0.15}>
                <GlassCard className="relative overflow-hidden group h-full border border-border">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-bl-full transition-transform duration-700 ease-out group-hover:scale-[2]" />
                  <span className="text-xs font-mono text-orange-400 mb-4 block">{prod.tag}</span>
                  <h3 className="text-2xl font-display font-bold mb-3 text-foreground">{prod.name}</h3>
                  <p className="text-muted-foreground mb-8 relative z-10">{prod.desc}</p>
                  <Link href="/products" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-primary transition-colors mt-auto relative z-10">
                    Explore Product <ChevronRight className="w-4 h-4" />
                  </Link>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Client Reviews Carousel */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">Client Impact</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">What visionary leaders say about partnering with Avdar Innovations.</p>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar">
            {testimonials.map((test, i) => (
              <div key={i} className="min-w-[320px] md:min-w-[400px] flex-shrink-0 snap-center">
                <GlassCard className="h-full flex flex-col border border-border">
                  <div className="flex gap-1 text-orange-400 mb-6">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <p className="text-foreground/90 text-lg leading-relaxed mb-8 flex-grow">"{test.quote}"</p>
                  <div>
                    <div className="font-bold text-foreground">{test.author}</div>
                    <div className="text-sm text-muted-foreground font-mono mt-1">{test.role}</div>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="glass-panel p-12 md:p-24 rounded-3xl text-center relative overflow-hidden border border-border">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-orange-500/10" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-foreground">{ctaBlock.title}</h2>
              <p className="text-xl text-muted-foreground mb-10">{ctaBlock.description}</p>
              <Link href="/contact">
                <GlowingButton variant="primary" className="text-lg px-10 py-5">
                  Start Your Project
                </GlowingButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
