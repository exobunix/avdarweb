import { PageLayout } from "@/components/layout/PageLayout";
import { AnimatedText, GlassCard, GlowingButton, FadeIn } from "@/components/ui/animated-components";
import { motion } from "framer-motion";
import { CheckCircle2, Zap, Brain, Shield, Eye, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useListPageContent, useListProducts } from "@workspace/api-client-react";
import { getBlockValue } from "@/lib/cms";

function ProductMockup({ id }: { id: string }) {
  if (id === "social-ai") {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/10 text-left font-sans text-xs">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center font-bold text-[10px] text-white">AI</div>
            <div>
              <div className="font-semibold text-white">Social AI Agent</div>
              <div className="text-[9px] text-white/45">Posting automatically...</div>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-[9px] font-mono">Active</span>
        </div>

        {/* Post Preview */}
        <div className="bg-white/5 rounded-xl p-4 border border-white/5 my-3 flex-grow">
          <p className="text-white/80 leading-relaxed mb-3">
            "We've just launched our new automated ledger service. Streamline your accounting operations with zero manual data entry. 💸🚀"
          </p>
          <div className="h-24 rounded-lg bg-gradient-to-tr from-blue-500/20 to-purple-500/20 border border-white/5 flex items-center justify-center text-white/50 text-[10px]">
            Generated Image Preview
          </div>
        </div>

        {/* Analytics Summary */}
        <div className="flex items-center justify-between bg-white/5 rounded-xl p-3 border border-white/5">
          <div>
            <div className="text-white/40 text-[9px] uppercase tracking-wider">Est. Reach</div>
            <div className="text-sm font-bold text-white mt-0.5">+12.4K</div>
          </div>
          <div className="flex items-end gap-1 h-6">
            <div className="w-1.5 h-2 bg-blue-500/40 rounded-sm"></div>
            <div className="w-1.5 h-4 bg-blue-500/60 rounded-sm"></div>
            <div className="w-1.5 h-3 bg-blue-500/80 rounded-sm"></div>
            <div className="w-1.5 h-6 bg-blue-500 rounded-sm"></div>
          </div>
        </div>
      </div>
    );
  }

  if (id === "auto-ledger") {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/10 text-left font-sans text-xs">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center font-bold text-[10px] text-white">AL</div>
            <div>
              <div className="font-semibold text-white">AutoLedger Audit</div>
              <div className="text-[9px] text-white/45">Real-time reconciling...</div>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 text-[9px] font-mono">2 Warnings</span>
        </div>

        {/* Financial Info */}
        <div className="my-3 flex gap-3">
          <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex-grow">
            <div className="text-white/40 text-[9px] uppercase tracking-wider">Cash Inflow</div>
            <div className="text-sm font-bold text-emerald-400 mt-0.5">$48,290</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex-grow">
            <div className="text-white/40 text-[9px] uppercase tracking-wider">Cash Outflow</div>
            <div className="text-sm font-bold text-rose-400 mt-0.5">$12,940</div>
          </div>
        </div>

        {/* Transaction ledger list */}
        <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex-grow flex flex-col gap-2 overflow-hidden justify-center">
          <div className="flex items-center justify-between border-b border-white/5 pb-1 text-[10px]">
            <span className="text-white/70">Stripe Transfer</span>
            <span className="text-emerald-400 font-medium">+$2,400</span>
          </div>
          <div className="flex items-center justify-between border-b border-white/5 pb-1 text-[10px]">
            <span className="text-white/70">AWS Cloud Bill</span>
            <span className="text-white/40 line-through">-$1,250</span>
          </div>
          <div className="flex items-center justify-between text-[10px]">
            <span className="text-orange-400 font-semibold">Duplicate SaaS Vendor</span>
            <span className="text-orange-400 font-medium">-$89</span>
          </div>
        </div>
      </div>
    );
  }

  if (id === "smart-pos") {
    return (
      <div className="w-full h-full flex flex-col justify-between p-6 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/10 text-left font-sans text-xs">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center font-bold text-[10px] text-white">SP</div>
            <div>
              <div className="font-semibold text-white">SmartPOS Terminal</div>
              <div className="text-[9px] text-white/45">Uptime 100% (Offline ready)</div>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-400 text-[9px] font-mono">Predicted</span>
        </div>

        {/* POS Grid Preview */}
        <div className="my-3 grid grid-cols-2 gap-2 flex-grow">
          <div className="bg-white/5 rounded-xl p-2 border border-white/5 flex flex-col justify-between">
            <span className="text-white/80 font-medium text-[10px]">Espresso Double</span>
            <div className="flex justify-between items-center mt-2">
              <span className="text-teal-400 font-bold">$4.50</span>
              <span className="text-[8px] bg-white/10 text-white/60 px-1 rounded">x34</span>
            </div>
          </div>
          <div className="bg-white/5 rounded-xl p-2 border border-white/5 flex flex-col justify-between">
            <span className="text-white/80 font-medium text-[10px]">Croissant Almond</span>
            <div className="flex justify-between items-center mt-2">
              <span className="text-teal-400 font-bold">$5.00</span>
              <span className="text-[8px] bg-amber-500/20 text-amber-400 px-1 rounded">Low Stock</span>
            </div>
          </div>
        </div>

        {/* AI Inventory Prediction Bar */}
        <div className="bg-teal-500/10 rounded-xl p-3 border border-teal-500/20">
          <div className="flex justify-between items-center text-[10px] text-teal-300 font-medium mb-1.5">
            <span>Forecast Demand Spike (Local Event)</span>
            <span>+45% Coffee</span>
          </div>
          <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div className="bg-teal-400 h-full w-[85%]"></div>
          </div>
        </div>
      </div>
    );
  }

  // Fallback / default mockup for custom products
  return (
    <div className="w-full h-full flex flex-col justify-between p-6 bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/10 text-left font-sans text-xs">
      <div className="flex items-center gap-2 border-b border-white/5 pb-3">
        <div className="w-6 h-6 rounded-full bg-rose-500 flex items-center justify-center font-bold text-[10px] text-white">EP</div>
        <div className="font-semibold text-white">Enterprise Module</div>
      </div>
      <div className="flex-grow flex items-center justify-center text-white/30 italic text-center p-4">
        Custom Interface Design
      </div>
      <div className="bg-white/5 rounded-xl p-3 border border-white/5 text-[9px] text-white/50">
        Engineered to specs. Configured via Admin Console.
      </div>
    </div>
  );
}

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
            {products.map((product) => (
              <div 
                key={product.id}
                className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
              >
                {/* Details (always on the left for consistent layout and vertical rhythm) */}
                <div className="w-full lg:w-7/12 order-2 lg:order-1">
                  <FadeIn delay={0.2} direction="up">
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

                {/* Visual Card (always on the right) */}
                <div className="w-full lg:w-5/12 order-1 lg:order-2">
                  <FadeIn delay={0.1} direction="up">
                    <div className={`relative aspect-square rounded-3xl bg-gradient-to-br ${product.color} p-4 overflow-hidden shadow-2xl group flex items-center justify-center`}>
                      <div className="absolute inset-0 bg-black/10 transition-all duration-500 group-hover:bg-black/5" />
                      <div className="w-full h-full relative z-10 transform group-hover:scale-[1.02] transition-transform duration-500">
                        <ProductMockup id={product.id} />
                      </div>
                    </div>
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
