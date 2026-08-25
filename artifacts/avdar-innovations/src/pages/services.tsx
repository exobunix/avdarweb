import { PageLayout } from "@/components/layout/PageLayout";
import { GlassCard, AnimatedText, FadeIn, GlowingButton } from "@/components/ui/animated-components";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  BrainCircuit, Smartphone, Globe, Database, 
  Layout, Search, Server, ShieldCheck, 
  Cloud, LineChart, ShoppingCart, Video, ArrowRight,
  Code, AppWindow, Cpu, CreditCard, Wifi, Link2, MonitorPlay
} from "lucide-react";
import { useListPageContent, useListServices } from "@workspace/api-client-react";
import { getBlockValue } from "@/lib/cms";

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  BrainCircuit, Smartphone, Globe, Database, 
  Layout, Search, Server, ShieldCheck, 
  Cloud, LineChart, ShoppingCart, Video,
  Code, AppWindow, Cpu, CreditCard, Wifi, Link2, MonitorPlay
};

const SERVICE_DETAILS: Record<string, { icon: React.ComponentType<any>; tech: string }> = {
  "Website Development": { icon: Globe, tech: "Next.js, Tailwind, Framer" },
  "Web Applications": { icon: AppWindow, tech: "React, Vue, Svelte" },
  "Android Apps": { icon: Smartphone, tech: "Kotlin, Java" },
  "iOS Apps": { icon: Smartphone, tech: "Swift, Objective-C" },
  "Flutter Apps": { icon: Code, tech: "Flutter, Dart" },
  "Node Backend": { icon: Server, tech: "Node.js, Express, NestJS" },
  "ERP Systems": { icon: Database, tech: "Custom Full Stack" },
  "CRM Platforms": { icon: Layout, tech: "React, PostgreSQL" },
  "POS Systems": { icon: ShoppingCart, tech: "Electron, React Native" },
  "Hospital Software": { icon: ShieldCheck, tech: "WebRTC, Secure Enclaves" },
  "Restaurant Software": { icon: MonitorPlay, tech: "Sockets, IoT" },
  "Education LMS": { icon: Layout, tech: "AWS Medialive, Next.js" },
  "Marketplace Development": { icon: ShoppingCart, tech: "Stripe Connect, MongoDB" },
  "Taxi Apps": { icon: Smartphone, tech: "Google Maps API, WebSockets" },
  "Delivery Apps": { icon: ShoppingCart, tech: "Redis, Go" },
  "Inventory & Billing": { icon: Database, tech: "Python, Vue.js" },
  "Enterprise Software": { icon: Server, tech: "React, Node.js" },
  "AI Development": { icon: BrainCircuit, tech: "Python, TensorFlow, PyTorch" },
  "Generative AI": { icon: BrainCircuit, tech: "OpenAI, LangChain" },
  "AI Chatbots": { icon: LineChart, tech: "Vector DBs, Pinecone" },
  "Automation": { icon: Cpu, tech: "Zapier, Make, Custom Hooks" },
  "Cloud & DevOps": { icon: Cloud, tech: "AWS, Docker, Kubernetes" },
  "API Integration": { icon: Link2, tech: "REST, GraphQL, SOAP" },
  "Payment Gateway": { icon: CreditCard, tech: "PCI-DSS Compliant" },
  "IoT Development": { icon: Wifi, tech: "MQTT, C++, Raspberry Pi" },
  "Blockchain": { icon: ShieldCheck, tech: "Solidity, Ethereum" },
  "UI/UX Design": { icon: Layout, tech: "Figma, Adobe XD" },
  "SEO & Digital Marketing": { icon: Search, tech: "Analytics, SEMrush" },
  "Branding": { icon: ShieldCheck, tech: "Illustrator, CorelDRAW" },
  "Video/Graphic Design": { icon: Video, tech: "After Effects, Premiere" }
};

export default function Services() {
  const { data: pageBlocks } = useListPageContent("services");
  const { data: dbServices } = useListServices();

  const heroBlock = getBlockValue(pageBlocks, "hero", {
    title: "Our Expertise.",
    description: "A comprehensive suite of 30+ specialized digital services. From foundational engineering and bespoke enterprise architecture to advanced artificial intelligence and cloud infrastructure."
  });

  const staticCategories = [
    {
      title: "Core Development",
      services: [
        { icon: Globe, name: "Website Development", desc: "Corporate sites, landing pages, and portfolios optimized for speed and conversion.", tech: "Next.js, Tailwind, Framer" },
        { icon: AppWindow, name: "Web Applications", desc: "Complex SPAs, dashboards, and portals requiring heavy data manipulation.", tech: "React, Vue, Svelte" },
        { icon: Smartphone, name: "Android Apps", desc: "Native Android applications tailored for the Google Play ecosystem.", tech: "Kotlin, Java" },
        { icon: Smartphone, name: "iOS Apps", desc: "Premium native iOS experiences built for Apple's strict design guidelines.", tech: "Swift, Objective-C" },
        { icon: Code, name: "Flutter Apps", desc: "Cross-platform mobile apps delivering near-native performance from a single codebase.", tech: "Flutter, Dart" },
        { icon: Server, name: "Node Backend", desc: "Blazing fast, event-driven backend architectures for real-time applications.", tech: "Node.js, Express, NestJS" }
      ]
    },
    {
      title: "Enterprise Solutions",
      services: [
        { icon: Database, name: "ERP Systems", desc: "Enterprise Resource Planning to unify your manufacturing, supply chain, and HR.", tech: "Custom Full Stack" },
        { icon: Layout, name: "CRM Platforms", desc: "Customer Relationship Management software tailored to your specific sales funnel.", tech: "React, PostgreSQL" },
        { icon: ShoppingCart, name: "POS Systems", desc: "Cloud-synced Point of Sale for retail and dining with offline capabilities.", tech: "Electron, React Native" },
        { icon: ShieldCheck, name: "Hospital Software", desc: "HIPAA-compliant EHR, patient portals, and telemedicine integrations.", tech: "WebRTC, Secure Enclaves" },
        { icon: MonitorPlay, name: "Restaurant Software", desc: "Digital menus, kitchen display systems (KDS), and automated ordering.", tech: "Sockets, IoT" },
        { icon: Layout, name: "Education LMS", desc: "Learning Management Systems with video streaming and interactive grading.", tech: "AWS Medialive, Next.js" },
        { icon: ShoppingCart, name: "Marketplace Development", desc: "Multi-vendor B2B/B2C marketplaces with split payments and vendor dashboards.", tech: "Stripe Connect, MongoDB" },
        { icon: Smartphone, name: "Taxi Apps", desc: "Ride-hailing ecosystems with real-time GPS tracking and dynamic pricing.", tech: "Google Maps API, WebSockets" },
        { icon: ShoppingCart, name: "Delivery Apps", desc: "Logistics and food delivery platforms matching drivers to orders instantly.", tech: "Redis, Go" },
        { icon: Database, name: "Inventory & Billing", desc: "Automated stock tracking, barcode scanning, and invoice generation.", tech: "Python, Vue.js" },
        { icon: Server, name: "Enterprise Software", desc: "Bespoke internal tools designed to replace your messy spreadsheet workflows.", tech: "React, Node.js" }
      ]
    },
    {
      title: "Artificial Intelligence",
      services: [
        { icon: BrainCircuit, name: "AI Development", desc: "End-to-end machine learning pipelines and custom predictive models.", tech: "Python, TensorFlow, PyTorch" },
        { icon: BrainCircuit, name: "Generative AI", desc: "Integrating ChatGPT, Claude, or custom LLMs to generate text, images, or code.", tech: "OpenAI, LangChain" },
        { icon: LineChart, name: "AI Chatbots", desc: "Context-aware customer service agents trained on your proprietary data.", tech: "Vector DBs, Pinecone" },
        { icon: Cpu, name: "Automation", desc: "Event-driven workflows that eliminate manual data entry and repetitive tasks.", tech: "Zapier, Make, Custom Hooks" }
      ]
    },
    {
      title: "Infrastructure & Integrations",
      services: [
        { icon: Cloud, name: "Cloud & DevOps", desc: "Auto-scaling infrastructure, CI/CD pipelines, and zero-downtime deployments.", tech: "AWS, Docker, Kubernetes" },
        { icon: Link2, name: "API Integration", desc: "Connecting disparate software systems to communicate seamlessly.", tech: "REST, GraphQL, SOAP" },
        { icon: CreditCard, name: "Payment Gateway", desc: "Secure integration of Stripe, PayPal, Razorpay, and regional processors.", tech: "PCI-DSS Compliant" },
        { icon: Wifi, name: "IoT Development", desc: "Connecting physical hardware, sensors, and machines to web dashboards.", tech: "MQTT, C++, Raspberry Pi" },
        { icon: ShieldCheck, name: "Blockchain", desc: "Smart contracts, Web3 dApps, and decentralized secure ledgers.", tech: "Solidity, Ethereum" }
      ]
    },
    {
      title: "Design & Marketing",
      services: [
        { icon: Layout, name: "UI/UX Design", desc: "Wireframing, prototyping, and high-fidelity interfaces focused on user retention.", tech: "Figma, Adobe XD" },
        { icon: Search, name: "SEO & Digital Marketing", desc: "Technical SEO, content strategy, and paid acquisition to drive traffic.", tech: "Analytics, SEMrush" },
        { icon: ShieldCheck, name: "Branding", desc: "Visual identity, logos, color theory, and comprehensive brand guidelines.", tech: "Illustrator, CorelDRAW" },
        { icon: Video, name: "Video/Graphic Design", desc: "Motion graphics, explainer videos, and social media assets.", tech: "After Effects, Premiere" }
      ]
    }
  ];

  // Include custom database services if present (curated selection of first 6 items)
  const categories = [...staticCategories];
  if (dbServices && dbServices.length > 0) {
    categories.unshift({
      title: "Featured Bespoke Services",
      services: dbServices.slice(0, 6).map((s) => {
        const details = SERVICE_DETAILS[s.title] || { 
          icon: ICON_MAP[s.icon] || Cpu, 
          tech: "Enterprise Standard" 
        };
        return {
          icon: details.icon,
          name: s.title,
          desc: s.description,
          tech: details.tech
        };
      })
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

          {/* Sticky Sub-navigation */}
          <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-md py-4 border-y border-border mb-16 -mx-6 px-6 overflow-x-auto hide-scrollbar">
            <div className="flex gap-4 min-w-max md:justify-center">
              {categories.map((category) => {
                const id = category.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                return (
                  <a 
                    key={category.title}
                    href={`#${id}`}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 text-sm font-medium text-muted-foreground hover:text-foreground transition-all"
                  >
                    {category.title}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="space-y-32">
            {categories.map((category, catIndex) => {
              const id = category.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
              return (
                <div key={catIndex} id={id} className="relative scroll-mt-32">
                  <h2 className="text-3xl font-display font-bold text-foreground mb-12 flex items-center gap-4">
                    <span className="w-12 h-px bg-primary hidden md:block" />
                    {category.title}
                  </h2>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    {category.services.map((service, i) => (
                      <FadeIn key={i} delay={i * 0.1}>
                        <GlassCard className="flex flex-col h-full hover:bg-white/[0.08] hover:border-primary/30 transition-all duration-300 border border-border">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-orange-500/20 flex items-center justify-center text-foreground mb-6 border border-border group-hover:scale-110 transition-transform duration-300">
                            <service.icon className="w-6 h-6 group-hover:text-primary transition-colors" />
                          </div>
                          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{service.name}</h3>
                          <p className="text-muted-foreground text-sm flex-grow mb-6 leading-relaxed">{service.desc}</p>
                          
                          <div className="pt-6 border-t border-border mt-auto flex items-center justify-between">
                            <span className="text-xs font-mono text-muted-foreground">{service.tech}</span>
                            <Link href="/contact" className="text-primary hover:text-foreground transition-colors">
                              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </GlassCard>
                      </FadeIn>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services CTA Section */}
      <section className="py-24 border-t border-border bg-gradient-to-b from-transparent to-primary/5">
        <div className="container mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-foreground">
              Ready to transform your business operations?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-10">
              Let's engineer a bespoke digital solution tailored to your company's unique architecture.
            </p>
            <Link href="/contact">
              <GlowingButton variant="primary" className="text-base px-8 py-4">
                Book Consultation
              </GlowingButton>
            </Link>
          </FadeIn>
        </div>
      </section>
    </PageLayout>
  );
}
