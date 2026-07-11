import { PageLayout } from "@/components/layout/PageLayout";
import { AnimatedText, GlassCard, FadeIn } from "@/components/ui/animated-components";
import { motion } from "framer-motion";
import { 
  HeartPulse, GraduationCap, ShoppingBag, Factory, 
  Landmark, Utensils, Car, Plane, Home, HardHat, 
  Tractor, Building2, Coffee, Sparkles, Dumbbell,
  ShieldCheck
} from "lucide-react";

export default function Industries() {
  const industries = [
    { name: "Healthcare", icon: HeartPulse, desc: "HIPAA-compliant telemedicine apps, EHR integrations, patient portals, and AI-driven appointment scheduling that reduces no-shows and optimizes clinic flow." },
    { name: "Education", icon: GraduationCap, desc: "Highly scalable LMS platforms, virtual classrooms with WebRTC, automated grading systems, and student administration portals built for high concurrent traffic." },
    { name: "Retail & Ecommerce", icon: ShoppingBag, desc: "Multi-vendor marketplaces, high-conversion headless commerce storefronts, and predictive inventory systems that prevent stockouts during peak sales." },
    { name: "Manufacturing", icon: Factory, desc: "Custom ERP solutions connecting IoT factory sensors to management dashboards for real-time yield monitoring and supply chain optimization." },
    { name: "Finance & Fintech", icon: Landmark, desc: "Bank-grade secure payment gateways, automated ledgers, algorithmic trading interfaces, and fraud-detection AI models." },
    { name: "Restaurants & Food", icon: Utensils, desc: "Smart offline-first POS systems, automated online ordering apps, and Kitchen Display Systems (KDS) that eliminate front-to-back friction." },
    { name: "Automobile & Taxi", icon: Car, desc: "Real-time fleet management, ride-hailing mobile ecosystems with sub-second websocket tracking, and dynamic pricing engines." },
    { name: "Travel & Hospitality", icon: Plane, desc: "Global booking engines, intelligent itinerary planners, centralized channel managers, and mobile concierge apps for premium guests." },
    { name: "Real Estate", icon: Home, desc: "Property listing aggregators, lead-tracking CRM platforms with WhatsApp bot integration, and immersive virtual tour capabilities." },
    { name: "Construction", icon: HardHat, desc: "Project management tools designed for the field, automated bidding systems, and contractor tracking portals." },
    { name: "Agriculture", icon: Tractor, desc: "Agri-tech B2B marketplaces, supply chain traceability ledgers, and yield prediction tools powered by satellite API data." },
    { name: "Government", icon: Building2, desc: "Secure citizen service portals, digital public infrastructure, and automated document processing workflows compliant with strict regulations." },
    { name: "Logistics & Delivery", icon: Coffee, desc: "End-to-end delivery platforms matching drivers to orders instantly, optimizing routes with ML to minimize fuel consumption." },
    { name: "Beauty & Wellness", icon: Sparkles, desc: "Salon scheduling software, subscription membership apps, and localized marketing tools to drive recurring bookings." },
    { name: "Fitness", icon: Dumbbell, desc: "Gym management SaaS, personal trainer matching platforms, and workout tracking apps with wearable device integrations." },
    { name: "Insurance", icon: ShieldCheck, desc: "Automated claims processing platforms, AI-driven risk assessment models, and streamlined broker administration dashboards." }
  ];

  return (
    <PageLayout>
      <section className="py-24 relative overflow-hidden">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <AnimatedText 
              text="Industries We Empower."
              className="text-5xl md:text-7xl font-display font-bold mb-6"
            />
            <p className="text-xl text-muted-foreground leading-relaxed">
              Software is not one-size-fits-all. We build vertically integrated solutions that understand the specific language, regulations, and operational challenges of your industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {industries.map((ind, i) => (
              <FadeIn key={ind.name} delay={(i % 4) * 0.1}>
                <GlassCard className="h-full flex flex-col group hover:bg-white/[0.08] hover:border-primary/30 transition-all duration-300 cursor-default">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(2,132,199,0.3)]">
                    <ind.icon className="w-6 h-6 text-white group-hover:text-primary transition-colors duration-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{ind.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-grow">{ind.desc}</p>
                </GlassCard>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
