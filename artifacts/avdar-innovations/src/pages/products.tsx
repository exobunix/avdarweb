import { PageLayout } from "@/components/layout/PageLayout";
import { AnimatedText, GlassCard, GlowingButton, FadeIn } from "@/components/ui/animated-components";
import { motion } from "framer-motion";
import { CheckCircle2, Zap, Brain, Shield, Eye, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useListPageContent, useListProducts } from "@workspace/api-client-react";
import { getBlockValue } from "@/lib/cms";

export default function Products() {
  const { data: pageBlocks } = useListPageContent("products");
  const { data: dbProducts } = useListProducts();

  const heroBlock = getBlockValue(pageBlocks, "hero", {
    title: "Proprietary AI Products.",
    description: "Alongside our custom engineering work, we build next-generation SaaS products designed to fully automate business operations for SMEs."
  });

  const staticProducts = [
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

  // Merge custom database products
  const products = [...staticProducts];
  if (dbProducts && dbProducts.length > 0) {
    dbProducts.forEach((p, idx) => {
      // Check if product with name already exists to avoid duplication
      if (!products.some(sp => sp.name.toLowerCase() === p.title.toLowerCase())) {
        products.push({
          id: `custom-product-${p.id}`,
          name: p.title,
          tagline: p.category || "Custom Enterprise Product",
          desc: p.description,
          features: p.features && p.features.length > 0 ? p.features : ["Tailored Features", "High Performance", "Secure Operations"],
          vision: "Designed to specifications and managed completely via your admin panel.",
          icon: Zap,
          color: idx % 2 === 0 ? "from-pink-500 to-rose-600" : "from-purple-500 to-indigo-600"
        });
      }
    });
  }

  return (
    <PageLayout>
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mb-20">
            <AnimatedText 
              text={heroBlock.title}
              className="text-5xl md:text-7xl font-display font-bold mb-6 text-foreground"
            />
            <p className="text-xl text-muted-foreground">
              {heroBlock.description}
            </p>
          </div>

          <div className="space-y-32">
            {products.map((product, i) => (
              <div 
                key={product.id}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
                  i % 2 === 0 ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Visual Card */}
                <div className="w-full lg:w-5/12">
                  <FadeIn delay={0.1} direction={i % 2 === 0 ? "right" : "left"}>
                    <div className={`relative aspect-square rounded-3xl bg-gradient-to-br ${product.color} p-1 overflow-hidden shadow-2xl group`}>
                      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] transition-all duration-500 group-hover:backdrop-blur-none" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center relative z-10">
                        <product.icon className="w-24 h-24 text-white mb-6 animate-pulse" />
                        <h3 className="text-3xl font-display font-bold text-white mb-2">{product.name}</h3>
                        <p className="text-white/80 font-mono text-sm uppercase tracking-widest">{product.tagline}</p>
                      </div>
                    </div>
                  </FadeIn>
                </div>

                {/* Details */}
                <div className="w-full lg:w-7/12">
                  <FadeIn delay={0.2} direction={i % 2 === 0 ? "left" : "right"}>
                    <span className="text-xs font-mono text-primary uppercase tracking-widest font-semibold block mb-4">SaaS Solution</span>
                    <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground">{product.name}</h2>
                    <p className="text-muted-foreground text-lg mb-8 leading-relaxed">{product.desc}</p>
                    
                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                      {product.features.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span className="text-foreground text-sm font-medium">{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-border mb-8">
                      <p className="text-muted-foreground text-sm leading-relaxed italic">{product.vision}</p>
                    </div>

                    {product.id.startsWith("custom-product-") ? (
                      <Link href="/contact">
                        <GlowingButton variant="primary">
                          Inquire About Product
                        </GlowingButton>
                      </Link>
                    ) : (
                      <div className="flex flex-col sm:flex-row gap-4">
                        <GlowingButton variant="primary">
                          Request Early Access
                        </GlowingButton>
                        <GlowingButton variant="outline">
                          Schedule Demo
                        </GlowingButton>
                      </div>
                    )}
                  </FadeIn>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
