import { PageLayout } from "@/components/layout/PageLayout";
import { AnimatedText, GlassCard, GlowingButton, FadeIn } from "@/components/ui/animated-components";
import { motion } from "framer-motion";
import { CheckCircle2, Zap, Brain, Shield, Eye, ArrowRight } from "lucide-react";

export default function Products() {
  const products = [
    {
      id: "social-ai",
      name: "Avdar Social AI",
      tagline: "Automate your brand presence.",
      desc: "An intelligent platform that learns your brand voice, generates high-converting social content, schedules posts across platforms, and analyzes engagement—all on autopilot. Stop wasting hours on content creation when our tuned LLMs can match your tone perfectly.",
      features: [
        "Brand Voice Fine-Tuning", 
        "Multi-platform Scheduling", 
        "Automated Image & Video Generation", 
        "Sentiment & Trend Analysis",
        "Competitor Tracking Dashboards",
        "Hashtag Optimization Engine"
      ],
      vision: "Future Vision: We are developing autonomous agent capabilities that will allow Social AI to actively engage with followers in the comments, negotiate influencer partnerships, and dynamically adjust ad spend based on real-time virality.",
      icon: Brain,
      color: "from-blue-600 to-indigo-600"
    },
    {
      id: "auto-ledger",
      name: "Avdar AutoLedger",
      tagline: "Zero-touch financial intelligence.",
      desc: "AI-powered accounting software that automatically categorizes transactions, reconciles statements, flags anomalies, and generates predictive cash flow reports. Built for modern CFOs who want to look forward, not backward.",
      features: [
        "OCR Receipt Scanning & Parsing", 
        "Predictive Cash Flow Modeling", 
        "Automated Tax Compliance Alerts", 
        "Multi-currency Reconciliation",
        "Vendor Spend Optimization",
        "Real-time Profitability Dashboards"
      ],
      vision: "Future Vision: AutoLedger will soon integrate directly with national banking APIs to execute automated supplier payments based on contract terms, fully automating the Accounts Payable lifecycle with AI-driven fraud detection.",
      icon: Shield,
      color: "from-orange-500 to-red-600"
    },
    {
      id: "smart-pos",
      name: "Avdar SmartPOS",
      tagline: "The predictive point of sale.",
      desc: "Designed for modern retail and restaurants. SmartPOS predicts inventory needs based on weather, local events, and historical trends, while managing floor operations with zero lag. Operates flawlessly offline and syncs instantly when connected.",
      features: [
        "Predictive Inventory Ordering", 
        "Real-time Multi-store Analytics", 
        "Robust Offline Mode", 
        "Customer Loyalty & Reward Engine",
        "Kitchen Display System (KDS) Sync",
        "Staff Performance Tracking"
      ],
      vision: "Future Vision: SmartPOS is evolving to include computer-vision integrations that analyze foot traffic and queue lengths, automatically alerting managers to open new registers or restock high-demand shelves before they empty.",
      icon: Zap,
      color: "from-teal-500 to-emerald-600"
    }
  ];

  return (
    <PageLayout>
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <AnimatedText 
              text="AI-Native SaaS Products."
              className="text-5xl md:text-7xl font-display font-bold mb-6"
            />
            <p className="text-xl text-muted-foreground">
              We don't just build custom software for others. We engineer proprietary, highly scalable platforms that solve systemic business challenges through the application of artificial intelligence.
            </p>
          </div>

          <div className="space-y-32">
            {products.map((product, idx) => (
              <FadeIn key={product.id} direction={idx % 2 === 0 ? "right" : "left"}>
                <div className={`flex flex-col lg:flex-row gap-12 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                  
                  {/* Content Side */}
                  <div className="w-full lg:w-1/2 space-y-8">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-xs font-mono uppercase tracking-wider mb-6 border-primary/20">
                        <product.icon className="w-4 h-4 text-orange-400" />
                        <span>Proprietary Tech</span>
                      </div>
                      <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">{product.name}</h2>
                      <h3 className="text-xl text-primary font-medium mb-6">{product.tagline}</h3>
                      <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                        {product.desc}
                      </p>
                      <div className="bg-white/5 border-l-2 border-orange-500 p-4 rounded-r-lg">
                        <p className="text-sm text-white/80 italic flex items-start gap-2">
                          <Eye className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                          {product.vision}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {product.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-white/80 text-sm">{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 flex gap-4">
                      <GlowingButton variant="primary">Request Early Access</GlowingButton>
                      <GlowingButton variant="outline">View Demo <ArrowRight className="w-4 h-4" /></GlowingButton>
                    </div>
                  </div>

                  {/* Mockup Side */}
                  <div className="w-full lg:w-1/2">
                    <motion.div 
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                      className="relative p-1 rounded-2xl bg-gradient-to-br from-white/10 to-white/0 shadow-[0_0_40px_rgba(2,132,199,0.15)] group hover:shadow-[0_0_60px_rgba(234,88,12,0.2)] transition-shadow duration-700"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br opacity-20 blur-2xl -z-10 rounded-2xl" style={{ backgroundImage: `var(--tw-gradient-stops)` }} />
                      <div className="bg-[#0a0a0a] rounded-xl overflow-hidden border border-white/5 relative aspect-[4/3] flex flex-col group-hover:border-white/20 transition-colors duration-500">
                        {/* Browser header */}
                        <div className="h-10 bg-white/5 border-b border-white/5 flex items-center px-4 gap-2">
                          <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/50" />
                          </div>
                          <div className="mx-auto px-4 py-1 text-[10px] font-mono text-white/30 bg-white/5 rounded-md">app.avdarinnovations.com</div>
                        </div>
                        {/* Dummy UI */}
                        <div className="flex-1 p-6 flex flex-col gap-6 relative">
                          <div className="flex justify-between items-center">
                            <div className="w-48 h-6 bg-white/10 rounded-md animate-pulse" />
                            <div className="w-10 h-10 bg-white/10 rounded-full" />
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="h-28 bg-white/5 rounded-lg border border-white/5 p-4 flex flex-col justify-end">
                              <div className="w-1/2 h-2 bg-white/10 rounded mb-2" />
                              <div className="w-3/4 h-4 bg-white/20 rounded" />
                            </div>
                            <div className="h-28 bg-white/5 rounded-lg border border-white/5 p-4 flex flex-col justify-end">
                              <div className="w-1/2 h-2 bg-white/10 rounded mb-2" />
                              <div className="w-3/4 h-4 bg-white/20 rounded" />
                            </div>
                            <div className="h-28 bg-white/5 rounded-lg border border-white/5 p-4 flex flex-col justify-end">
                              <div className="w-1/2 h-2 bg-white/10 rounded mb-2" />
                              <div className="w-3/4 h-4 bg-white/20 rounded" />
                            </div>
                          </div>
                          <div className="flex-1 bg-white/5 rounded-lg border border-white/5 mt-auto relative overflow-hidden flex items-end p-4 group-hover:border-primary/30 transition-colors duration-500">
                            <div className={`absolute inset-0 bg-gradient-to-t ${product.color} opacity-20`} />
                            <div className="w-full flex items-end gap-2 h-full pt-8 relative z-10">
                              {[40, 70, 45, 90, 65, 100, 80].map((h, j) => (
                                <div key={j} className="flex-1 bg-white/20 rounded-t-sm hover:bg-white/40 transition-colors cursor-pointer" style={{ height: `${h}%` }} />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Illustrative Pricing Section */}
      <section className="py-24 bg-black/50 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">Enterprise Licensing</h2>
            <p className="text-muted-foreground text-lg">Transparent pricing for scaling businesses. We align our success with yours.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Starter", price: "Custom", desc: "For small teams adopting AI into their workflow.", features: ["Core Platform Features", "Standard API Access", "Email Support", "99.0% Uptime SLA", "Daily Backups"] },
              { name: "Professional", price: "Custom", desc: "For scaling operations demanding deep integration.", features: ["Advanced ML Models", "Custom Workflows", "Priority Support", "Predictive Analytics", "99.9% Uptime SLA", "Dedicated Account Manager"], highlight: true },
              { name: "Enterprise", price: "Custom", desc: "Full digital transformation and white-labeling.", features: ["Dedicated Cloud Instances", "Full White-labeling", "Custom AI Fine-tuning", "24/7 Phone Support", "99.99% Uptime SLA", "On-Premise Deployment Options"] }
            ].map((tier, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <GlassCard className={`relative flex flex-col h-full ${tier.highlight ? 'border-primary/50 shadow-[0_0_30px_rgba(2,132,199,0.2)] md:scale-105 z-10' : ''}`}>
                  {tier.highlight && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full shadow-lg shadow-primary/50">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-2 text-white">{tier.name}</h3>
                  <p className="text-muted-foreground text-sm mb-6 h-10">{tier.desc}</p>
                  <div className="text-4xl font-display font-bold mb-8 text-white group-hover:text-primary transition-colors">{tier.price}</div>
                  <ul className="space-y-4 mb-8 flex-1">
                    {tier.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-white/80">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <GlowingButton variant={tier.highlight ? "primary" : "outline"} className="w-full py-3">Contact Sales</GlowingButton>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
