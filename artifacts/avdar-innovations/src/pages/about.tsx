import { PageLayout } from "@/components/layout/PageLayout";
import { AnimatedText, GlassCard, FadeIn } from "@/components/ui/animated-components";
import { motion } from "framer-motion";
import { Target, Zap, Globe2, Shield, Compass, Lightbulb, Rocket } from "lucide-react";

export default function About() {
  return (
    <PageLayout>
      {/* Header */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <AnimatedText 
            text="Engineering the AI-First Enterprise."
            className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8 max-w-4xl"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            Avdar Innovations was founded on a singular belief: the software that runs businesses should be intelligent, beautiful, and invisible. We are building the future of business operations from India to the world.
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
              <h2 className="text-3xl font-display font-bold text-white mb-6">Our Origins</h2>
              <p>
                In a world drowning in disjointed tools, manual data entry, and legacy systems, Avdar Innovations emerged to build the <span className="text-white font-medium">AI Business Operating System for SMEs</span>. We realized that true digital transformation isn't about moving from paper to screen—it's about moving from passive records to active, predictive intelligence.
              </p>
              <p>
                We started as a specialized engineering lab focused on high-performance web and mobile applications. As generative AI matured, we saw an opportunity to embed intelligence at the foundational level of every ERP, CRM, and SaaS platform we built. 
              </p>
              <p>
                Today, our ecosystem of proprietary AI products and bespoke enterprise solutions empowers visionaries across healthcare, retail, finance, and manufacturing to operate with unprecedented speed and clarity.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: Target, title: "Mission", desc: "To democratize enterprise-grade AI software for SMEs, turning complex operations into seamless workflows." },
                { icon: Globe2, title: "Vision", desc: "A global digital economy powered by intelligent, self-optimizing Indian engineering." },
                { icon: Zap, title: "Philosophy", desc: "Design matters. Speed matters. Software should feel like an extension of thought." },
                { icon: Shield, title: "Commitment", desc: "Uncompromising security, scalable architecture, and continuous innovation." }
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <GlassCard className="flex flex-col gap-4 h-full">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-orange-400 group-hover:bg-orange-500/20 transition-colors">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </GlassCard>
                </FadeIn>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8 text-lg text-muted-foreground leading-relaxed md:col-start-2 md:row-start-1"
            >
              <h2 className="text-3xl font-display font-bold text-white mb-6">The Innovation Mindset</h2>
              <p>
                At Avdar, we reject the status quo of bloated enterprise software. Why should consumer apps be intuitive and beautiful, while the software people use for eight hours a day looks like a spreadsheet from 1998? We believe that well-designed software reduces cognitive load, minimizes errors, and empowers employees to do their best work.
              </p>
              <p>
                Our engineering teams operate with extreme ownership. We don't just take a spec sheet and write code; we interrogate the problem. We ask "why" until we reach the core constraint, and then we design an elegant, scalable solution to overcome it. We leverage the latest in cloud infrastructure and containerization to ensure that what we build today will scale seamlessly tomorrow.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6 md:col-start-1 md:row-start-1">
               <GlassCard className="flex items-start gap-6">
                 <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0 mt-1">
                   <Lightbulb className="w-6 h-6" />
                 </div>
                 <div>
                   <h3 className="text-xl font-display font-bold text-white mb-2">Relentless Curiosity</h3>
                   <p className="text-muted-foreground text-sm leading-relaxed">We constantly experiment with new frameworks, models, and paradigms. If there's a better way to compile, deploy, or render, we are already testing it in our sandbox.</p>
                 </div>
               </GlassCard>
               <GlassCard className="flex items-start gap-6">
                 <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 shrink-0 mt-1">
                   <Compass className="w-6 h-6" />
                 </div>
                 <div>
                   <h3 className="text-xl font-display font-bold text-white mb-2">Architectural Integrity</h3>
                   <p className="text-muted-foreground text-sm leading-relaxed">We build for scale. Clean code, strict typing, comprehensive test coverage, and modular microservices ensure our products outlive the trends.</p>
                 </div>
               </GlassCard>
               <GlassCard className="flex items-start gap-6">
                 <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-1">
                   <Rocket className="w-6 h-6" />
                 </div>
                 <div>
                   <h3 className="text-xl font-display font-bold text-white mb-2">The Road Ahead</h3>
                   <p className="text-muted-foreground text-sm leading-relaxed">Our immediate future involves deepening our proprietary AI models, expanding our global footprint, and launching Avdar OS—a unified suite for total business management.</p>
                 </div>
               </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* Culture Image / Visual */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="aspect-[21/9] rounded-3xl overflow-hidden relative group shadow-[0_0_50px_-12px_rgba(234,88,12,0.2)]">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 to-orange-900/40 mix-blend-overlay z-10" />
            <img 
              src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070" 
              alt="Cyber core technology abstract" 
              className="w-full h-full object-cover filter brightness-75 group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 z-20 flex items-center justify-center p-8 bg-black/30">
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white text-center max-w-4xl leading-tight">
                "We don't just write code. We architect the central nervous system of modern business."
              </h2>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
