import { PageLayout } from "@/components/layout/PageLayout";
import { AnimatedText, GlassCard, FadeIn } from "@/components/ui/animated-components";
import { motion } from "framer-motion";
import { Target, Zap, Globe2, Shield } from "lucide-react";
import { useListPageContent } from "@workspace/api-client-react";
import { getBlockValue } from "@/lib/cms";

export default function About() {
  const { data: pageBlocks } = useListPageContent("about");

  const heroBlock = getBlockValue(pageBlocks, "hero", {
    title: "Engineering the AI-First Enterprise.",
    subtitle: "Avdar Innovations was founded on a singular belief: the software that runs businesses should be intelligent, beautiful, and invisible. We are building the future of business operations from India to the world."
  });

  const storyBlock = getBlockValue(pageBlocks, "story", {
    title: "Our Origins",
    p1: "In a world drowning in disjointed tools, manual data entry, and legacy systems, Avdar Innovations emerged to build the AI Business Operating System for SMEs. We realized that true digital transformation isn't about moving from paper to screen—it's about moving from passive records to active, predictive intelligence.",
    p2: "We started as a specialized engineering lab focused on high-performance web and mobile applications. As generative AI matured, we saw an opportunity to embed intelligence at the foundational level of every ERP, CRM, and SaaS platform we built.",
    p3: "Today, our ecosystem of proprietary AI products and bespoke enterprise solutions empowers visionaries across healthcare, retail, finance, and manufacturing to operate with unprecedented speed and clarity."
  });

  return (
    <PageLayout>
      {/* Header */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedText 
            text={heroBlock.title}
            className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8 max-w-4xl text-foreground"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            {heroBlock.subtitle}
          </motion.p>
        </div>
      </section>

      {/* Story Content */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 mb-24">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 text-lg text-muted-foreground leading-relaxed"
            >
              <h2 className="text-3xl font-display font-bold text-foreground mb-6">{storyBlock.title}</h2>
              <p>{storyBlock.p1}</p>
              <p>{storyBlock.p2}</p>
              <p>{storyBlock.p3}</p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: Target, title: "Mission", desc: "To democratize enterprise-grade AI software for SMEs, turning complex operations into seamless workflows." },
                { icon: Globe2, title: "Vision", desc: "A global digital economy powered by intelligent, self-optimizing Indian engineering." },
                { icon: Zap, title: "Philosophy", desc: "Design matters. Speed matters. Software should feel like an extension of thought." },
                { icon: Shield, title: "Commitment", desc: "Uncompromising security, scalable architecture, and continuous innovation." }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <GlassCard className="flex flex-col gap-4 h-full border border-border">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-orange-400 group-hover:bg-orange-500/20 transition-colors border border-border">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </GlassCard>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
