import { PageLayout } from "@/components/layout/PageLayout";
import { AnimatedText, GlassCard, FadeIn } from "@/components/ui/animated-components";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Portfolio() {
  const projects = [
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
    },
    {
      title: "Ashish For Public",
      category: "Political",
      url: "ashishforpublic",
      image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=2070",
      problem: "A public figure needed a professional digital presence to communicate directly with constituents and showcase community initiatives.",
      solution: "Designed and built a political outreach website to publish updates, initiatives, and public engagement content with a clean, trustworthy presentation.",
      tech: "React, Node.js, CMS, MongoDB"
    },
    {
      title: "Shashib College Portal",
      category: "Education",
      url: "shashib website",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=2070",
      problem: "A college needed a modern digital front door for admissions, academics, and campus information instead of a static, outdated site.",
      solution: "Built a full college website covering admissions information, academic programs, faculty and campus details, and student resources in a fast, modern interface.",
      tech: "React, Node.js, MongoDB"
    },
    {
      title: "TransGlobe",
      category: "Taxi & Delivery",
      url: "transglobe",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=2070",
      problem: "An enterprise mobility operator needed an Ola/Uber-class ride platform that also served corporate accounts, not just individual riders.",
      solution: "Built a complete ride-hailing ecosystem with dedicated User, Driver, Corporate, Supervisor, and Admin apps, covering live tracking, corporate billing, dispatch supervision, and fleet oversight.",
      tech: "React, React Native, Node.js, WebSockets, Google Maps API"
    },
    {
      title: "OjasIndia",
      category: "Ecommerce",
      url: "ojasindia.com",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=2070",
      problem: "A growing ecommerce brand needed a marketplace that could onboard multiple vendors and resellers, not just sell its own catalog directly.",
      solution: "Built a multi-vendor ecommerce platform with dedicated User, Vendor, Reseller, and Admin panels covering catalog management, order routing, reseller margins, and platform-wide administration.",
      tech: "React, Node.js, MongoDB, Razorpay"
    },
    {
      title: "MedSync Enterprise",
      category: "Healthcare",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070",
      problem: "A major hospital network struggled with fragmented patient data, high no-show rates, and manual appointment scheduling across 15 facilities.",
      solution: "Engineered a unified HIPAA-compliant portal with predictive AI scheduling, reducing no-shows by 30%, and integrated secure telemedicine capabilities.",
      tech: "React, Node.js, PostgreSQL, WebRTC, AWS"
    },
    {
      title: "EduLearn AI",
      category: "Education",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=2074",
      problem: "A national university needed a modern LMS to handle 50,000+ concurrent students during remote learning without server crashes.",
      solution: "Built a highly scalable cloud-native LMS with AI-driven personalized learning paths and automated essay grading assistants.",
      tech: "Next.js, Python, AWS, Redis, LangChain"
    },
    {
      title: "SwiftRide Analytics",
      category: "Taxi & Delivery",
      image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=2070",
      problem: "A regional logistics company lacked real-time fleet visibility, resulting in inefficient routes and high fuel costs.",
      solution: "Developed a native mobile ecosystem (Driver + User apps) with sub-second websocket tracking and ML-powered dynamic route optimization.",
      tech: "Flutter, Go, WebSockets, Google Maps API"
    },
    {
      title: "Nexus CRM",
      category: "CRM & Sales",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070",
      problem: "A premium real estate agency was losing high-value leads due to slow response times outside of business hours.",
      solution: "Deployed a custom CRM with automated WhatsApp integrations and an intelligent AI chatbot capable of instant property matching and lead qualification.",
      tech: "React, Express, OpenAI API, Twilio"
    },
    {
      title: "Forge ERP",
      category: "Manufacturing",
      image: "https://images.unsplash.com/photo-1565439390141-866d9bb4e73b?auto=format&fit=crop&q=80&w=2070",
      problem: "Legacy on-premise software causing severe production bottlenecks and inaccurate inventory forecasting.",
      solution: "Migrated entire operations to a custom cloud ERP, connecting IoT factory sensors to a central dashboard for real-time yield monitoring.",
      tech: "Vue.js, Java, TimescaleDB, MQTT"
    },
    {
      title: "Crave Marketplace",
      category: "Ecommerce",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=2070",
      problem: "A boutique retailer needed a multi-vendor marketplace capable of handling high-volume holiday flash sales without degrading UX.",
      solution: "Architected a serverless microservices platform with edge-cached product catalogs and automated vendor payout splits.",
      tech: "Next.js, Serverless, Stripe Connect, MongoDB"
    },
    {
      title: "FinGuard Security",
      category: "Finance",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=2074",
      problem: "A fintech startup required a highly secure, fraud-resistant transaction ledger capable of processing thousands of micro-payments per minute.",
      solution: "Implemented a distributed ledger system backed by Kubernetes microservices and real-time AI anomaly detection algorithms.",
      tech: "Node.js, PostgreSQL, Docker, TensorFlow"
    },
    {
      title: "DineSmart POS",
      category: "Restaurant",
      image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=2070",
      problem: "A fast-casual restaurant chain experienced massive delays due to disconnects between front-of-house orders and kitchen displays.",
      solution: "Built an offline-first POS app for tablets linked to a real-time KDS (Kitchen Display System), reducing order errors to near zero.",
      tech: "React Native, SQLite, Express, WebSockets"
    },
    {
      title: "GovPort Digital",
      category: "Government",
      image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=2070",
      problem: "A municipal department relied on paper forms for citizen permits, causing massive backlogs and frustration.",
      solution: "Designed an accessible, highly secure citizen portal with automated document verification and digital signature capabilities.",
      tech: "Laravel, Vue.js, AWS GovCloud"
    },
    {
      title: "LuxeStay Manager",
      category: "Hospitality",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2070",
      problem: "A boutique hotel group needed a centralized system to manage bookings across multiple OTAs and coordinate housekeeping.",
      solution: "Created a unified channel manager API integration paired with a mobile app for staff to track room status in real-time.",
      tech: "Ruby on Rails, React, React Native"
    },
    {
      title: "AgriYield Predictor",
      category: "Agriculture",
      image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=2070",
      problem: "Farming cooperatives struggled to estimate crop yields and optimize fertilizer usage based on erratic weather.",
      solution: "Deployed a data dashboard pulling from satellite imagery APIs and soil sensors to run predictive yield machine learning models.",
      tech: "Python, Django, React, Google Earth Engine"
    },
    {
      title: "WashCycle App",
      category: "Laundry/Services",
      image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&q=80&w=2070",
      problem: "An on-demand laundry startup lacked a scalable way to coordinate customer pickups, facility processing, and driver routing.",
      solution: "Engineered a full suite: Customer iOS/Android app, Facility Web Dashboard, and Driver App, complete with automated billing.",
      tech: "Flutter, Firebase, Stripe, Google Maps"
    }
  ];

  return (
    <PageLayout>
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-20">
            <AnimatedText 
              text="Our Work."
              className="text-5xl md:text-7xl font-display font-bold mb-6"
            />
            <p className="text-xl text-muted-foreground">
              A curated selection of digital transformations. We partner with visionaries across diverse sectors to turn complex operational bottlenecks into elegant, scalable software.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {projects.map((project, i) => (
              <FadeIn key={i} delay={(i % 2) * 0.1}>
                <div className="group cursor-pointer flex flex-col h-full bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden hover:bg-white/[0.05] transition-colors duration-500 shadow-lg hover:shadow-2xl hover:border-primary/20">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <div className="absolute inset-0 bg-background/40 group-hover:bg-transparent transition-colors duration-700 z-10" />
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] ease-out filter brightness-75 group-hover:brightness-100"
                    />
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 text-xs font-mono font-medium bg-black/70 backdrop-blur-md border border-white/10 rounded-full text-white shadow-lg">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4 z-20 w-12 h-12 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 shadow-xl">
                      <ArrowUpRight className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center justify-between gap-4 mb-6">
                      <h3 className="text-3xl font-display font-bold text-white group-hover:text-primary transition-colors">{project.title}</h3>
                      {project.url && project.url.includes(".") && (
                        <a
                          href={`https://${project.url}`}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs font-mono text-primary hover:text-white transition-colors shrink-0 border border-primary/30 rounded-full px-3 py-1.5 hover:bg-primary/20"
                        >
                          {project.url}
                        </a>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 gap-5 text-sm flex-grow mb-6">
                      <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                        <span className="text-orange-400 block mb-2 font-semibold uppercase tracking-wider text-xs flex items-center gap-2">
                          <span className="w-1 h-4 bg-orange-400 rounded-full"></span> Challenge
                        </span>
                        <p className="text-muted-foreground leading-relaxed">{project.problem}</p>
                      </div>
                      <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                        <span className="text-primary block mb-2 font-semibold uppercase tracking-wider text-xs flex items-center gap-2">
                          <span className="w-1 h-4 bg-primary rounded-full"></span> Solution
                        </span>
                        <p className="text-white/80 leading-relaxed">{project.solution}</p>
                      </div>
                    </div>

                    <div className="pt-4 flex flex-wrap gap-2 mt-auto border-t border-white/5">
                      {project.tech.split(", ").map(t => (
                        <span key={t} className="text-xs font-mono text-white/70 bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg group-hover:border-white/20 transition-colors">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <p className="text-muted-foreground mb-6">Have a similar project in mind?</p>
            <a href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium text-sm bg-white text-background hover:bg-white/90 transition-all">
              Discuss Your Project
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
