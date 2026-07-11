import { PageLayout } from "@/components/layout/PageLayout";
import { AnimatedText, GlassCard, FadeIn } from "@/components/ui/animated-components";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";
import { useListPageContent, useListPortfolioProjects } from "@workspace/api-client-react";
import { getBlockValue } from "@/lib/cms";

export default function Portfolio() {
  const { data: pageBlocks } = useListPageContent("portfolio");
  const { data: dbProjects } = useListPortfolioProjects();

  const heroBlock = getBlockValue(pageBlocks, "hero", {
    title: "Our Work.",
    description: "A showcase of engineering excellence. We build robust systems that solve critical operational challenges and drive business growth."
  });

  const staticProjects = [
    {
      title: "Ziyonstar",
      category: "Mobile Repair & Resale",
      url: "ziyonstar.com",
      image: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&q=80&w=2070",
      problem: "The mobile repair and device resale market runs on unreliable local shops with no standardized pricing, tracking, or trust layer for customers.",
      solution: "Built a Cashify-style device valuation and repair booking platform with dedicated apps for Users and Technicians, plus a full Admin panel to manage bookings, pricing, technician assignment, and payouts in real time.",
      tech: "React, React Native, Node.js, MongoDB, Razorpay"
    },
    {
      title: "Cloudwash",
      category: "Laundry & Services",
      url: "cloudwash.in",
      image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&q=80&w=2070",
      problem: "On-demand laundry operators needed a way to manage pickup scheduling, order tracking, and delivery without relying on manual phone-based coordination.",
      solution: "Delivered a laundry booking website and companion mobile application covering order scheduling, live status tracking, pricing by garment type, and delivery coordination end to end.",
      tech: "React, Node.js, Express, MongoDB, Firebase"
    },
    {
      title: "Fixxev",
      category: "EV Industry",
      url: "fixxev.com",
      image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=2070",
      problem: "The EV service industry lacked a unified platform to connect vehicle owners with certified service centers and franchise partners at scale.",
      solution: "Built a website plus User, Franchise, and Admin apps to manage EV service requests, franchise onboarding, service tracking, and centralized operational oversight.",
      tech: "React, React Native, Node.js, PostgreSQL"
    },
    {
      title: "Rolixia CRM",
      category: "CRM & ERP",
      url: "Rolixia CRM",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070",
      problem: "Growing multi-branch businesses needed a single high-class system to manage inventory, franchise operations, bookings, orders, and customers instead of juggling disconnected spreadsheets and tools.",
      solution: "Engineered a premium end-to-end CRM covering complete inventory management, franchise management, booking and order pipelines, and full customer lifecycle tracking in one dashboard.",
      tech: "React, Node.js, PostgreSQL, Redis, AWS"
    },
    {
      title: "OpenTag",
      category: "Emergency & IoT",
      url: "opentag",
      image: "https://images.unsplash.com/photo-1580983230786-e2517ee6f9f2?auto=format&fit=crop&q=80&w=2070",
      problem: "In an emergency involving a vehicle, pet, or traveler, there was no fast, universal way for a bystander to reach the owner or trigger help.",
      solution: "Built a QR-based vehicle emergency system with website and app: a scannable tag sticks to cars, bikes, pet collars, or travel bags, and scanning it instantly lets anyone raise an emergency request to the owner.",
      tech: "React, React Native, Node.js, QR/NFC, MongoDB"
    },
    {
      title: "Samajwadi Platform",
      category: "Political & Social",
      url: "samajwadi website",
      image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=2070",
      problem: "Political supporters had no dedicated platform to create personalized branded content or stay updated with verified regional political news.",
      solution: "Built a registration-based platform where users can generate personalized political photos and videos, and browse a live feed of regular political news and updates.",
      tech: "React, Node.js, Canvas/Media Processing, MongoDB"
    }
  ];

  // Merge custom database projects
  const projects = [...staticProjects];
  if (dbProjects && dbProjects.length > 0) {
    dbProjects.forEach((p) => {
      // Avoid duplication by title check
      if (!projects.some((sp) => sp.title.toLowerCase() === p.title.toLowerCase())) {
        projects.unshift({
          title: p.title,
          category: p.category || "Case Study",
          url: p.url || "Case Study",
          image: p.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070",
          problem: p.challenge || "Operational efficiency, legacy structures, and automation gaps.",
          solution: p.solution || "Custom software engineering and AI automation.",
          tech: p.tags ? p.tags.join(", ") : "Custom Development"
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
            {projects.map((project, i) => (
              <div 
                key={project.title}
                className={`flex flex-col lg:flex-row gap-12 lg:gap-20 ${
                  i % 2 === 0 ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Visual */}
                <div className="w-full lg:w-1/2">
                  <FadeIn delay={0.1} direction={i % 2 === 0 ? "right" : "left"}>
                    <div className="relative aspect-video rounded-3xl overflow-hidden glass-panel border border-border shadow-2xl group">
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500 z-10" />
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-6 left-6 z-20">
                        <span className="px-4 py-2 rounded-full bg-background/90 backdrop-blur-md text-xs font-semibold text-primary border border-border">
                          {project.category}
                        </span>
                      </div>
                    </div>
                  </FadeIn>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center">
                  <FadeIn delay={0.2} direction={i % 2 === 0 ? "left" : "right"}>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-sm font-mono text-primary font-semibold">{project.url}</span>
                    </div>
                    
                    <h3 className="text-3xl font-display font-bold text-foreground mb-6 flex items-center gap-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>

                    <div className="space-y-6 mb-8 text-sm">
                      <div>
                        <h4 className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-2">The Challenge</h4>
                        <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
                      </div>
                      <div>
                        <h4 className="font-mono text-xs uppercase tracking-widest text-primary mb-2">Our Solution</h4>
                        <p className="text-foreground/90 leading-relaxed font-medium">{project.solution}</p>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-border flex items-center justify-between">
                      <div>
                        <h4 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Key Tech</h4>
                        <span className="text-xs font-mono text-foreground/80">{project.tech}</span>
                      </div>
                      <Link href="/contact" className="w-10 h-10 rounded-full bg-white/5 border border-border flex items-center justify-center text-foreground hover:text-primary hover:border-primary/50 transition-all">
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
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
