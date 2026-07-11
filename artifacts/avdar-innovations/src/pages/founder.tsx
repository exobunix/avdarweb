import { PageLayout } from "@/components/layout/PageLayout";
import { GlassCard, FadeIn } from "@/components/ui/animated-components";
import { motion } from "framer-motion";

export default function Founder() {
  const timeline = [
    { year: "2016", title: "The First Lines of Code", desc: "Started as a passionate self-taught developer, exploring the depths of algorithms, web security, and low-level system architecture." },
    { year: "2018", title: "Early Origins", desc: "Began journey as an independent full-stack developer, mastering web architecture, cloud deployment, and mobile ecosystems. Delivered early projects for local startups." },
    { year: "2020", title: "Shift to AI & Big Data", desc: "Recognized the impending shift in machine learning and started integrating predictive models and natural language processing into conventional apps." },
    { year: "2021", title: "Scaling Up", desc: "Transitioned from a solo consultant to managing complex, multi-developer projects. Architected first enterprise-level ERP system for a manufacturing firm." },
    { year: "2023", title: "Avdar Innovations Born", desc: "Founded the company to formalize operations, assembling a hand-picked team of elite engineers and designers to tackle large-scale enterprise challenges." },
    { year: "Present", title: "Global Expansion", desc: "Leading the charge in AI-driven SaaS platforms and digital transformation for SMEs across 15+ countries. Launching proprietary products like Avdar Social AI." }
  ];

  return (
    <PageLayout>
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Visual abstract instead of photo */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="w-full lg:w-1/2 aspect-[4/5] rounded-3xl relative overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-background via-blue-900/40 to-orange-500/30 z-10" />
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center mix-blend-luminosity opacity-50 hover:scale-105 transition-transform duration-1000" />
              
              <div className="absolute bottom-10 left-10 z-20">
                <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-3">Adarsh Deep Sachan</h1>
                <p className="text-primary font-mono text-sm uppercase tracking-widest bg-black/50 px-3 py-1 inline-block rounded-md border border-white/10">Founder & CEO</p>
              </div>
            </motion.div>

            {/* Content */}
            <div className="w-full lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-gradient">The Visionary Mindset</h2>
                <div className="space-y-6 text-muted-foreground text-lg leading-relaxed mb-16">
                  <p>
                    Adarsh Deep Sachan built Avdar Innovations on a foundation of relentless curiosity and technical excellence. Watching businesses struggle with fragmented software, expensive legacy systems, and manual processes, he envisioned a unified ecosystem where artificial intelligence doesn't just augment software—it drives it.
                  </p>
                  <p>
                    His engineering philosophy rejects bloat. He believes enterprise software should mirror the elegance and speed of consumer products, demanding pixel-perfect UI and scalable, robust backends. A strong advocate for open-source technologies, Adarsh constantly experiments with the bleeding edge of web frameworks to bring maximum performance to clients.
                  </p>
                  <p>
                    Under his leadership, Avdar Innovations is not just another IT service provider; it is an incubator for the future of business operations, pushing the boundaries of what's possible in India's digital landscape and exporting that innovation globally.
                  </p>
                </div>
              </motion.div>

              <h3 className="text-3xl font-display font-bold mb-10 text-white">The Journey</h3>
              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
                {timeline.map((item, i) => (
                  <FadeIn 
                    key={i}
                    direction={i % 2 === 0 ? "right" : "left"}
                    delay={i * 0.1}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                  >
                    <div className="flex items-center justify-center w-6 h-6 rounded-full border border-white/20 bg-background text-primary shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:border-primary group-hover:scale-125 transition-all">
                      <div className="w-2 h-2 bg-primary rounded-full group-hover:shadow-[0_0_10px_#0284c7] transition-shadow" />
                    </div>
                    
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl glass-panel relative group-hover:border-white/30 transition-colors">
                      <span className="text-sm font-mono text-orange-400 mb-2 block">{item.year}</span>
                      <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
