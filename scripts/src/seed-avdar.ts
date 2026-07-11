import dotenv from "dotenv";
import path from "path";
import fs from "fs";

// Resolve paths to find atlas-credentials.env
const pathsToTry = [
  path.resolve(import.meta.dirname, "../../../atlas-credentials.env"),
  path.resolve(import.meta.dirname, "../../atlas-credentials.env"),
  path.resolve(import.meta.dirname, "../atlas-credentials.env"),
  path.resolve(import.meta.dirname, "./atlas-credentials.env"),
];

for (const p of pathsToTry) {
  if (fs.existsSync(p)) {
    dotenv.config({ path: p });
    break;
  }
}
dotenv.config();

import {
  connectDb,
  SiteSettingsModel,
  ThemeSettingsModel,
  NavLinkModel,
  FooterLinkModel,
  ServiceModel,
  ProductModel,
  PortfolioProjectModel,
  IndustryModel,
  BlogPostModel,
  CareerRoleModel,
  Counter
} from "@workspace/db";

async function seed() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("MONGODB_URI is not defined in environment variables.");
  }
  console.log("Connecting to MongoDB...");
  await connectDb(mongoUri);
  console.log("Connected to MongoDB.");

  console.log("Clearing existing data...");
  await SiteSettingsModel.deleteMany({});
  await ThemeSettingsModel.deleteMany({});
  await NavLinkModel.deleteMany({});
  await FooterLinkModel.deleteMany({});
  await ServiceModel.deleteMany({});
  await ProductModel.deleteMany({});
  await PortfolioProjectModel.deleteMany({});
  await IndustryModel.deleteMany({});
  await BlogPostModel.deleteMany({});
  await CareerRoleModel.deleteMany({});
  await Counter.deleteMany({});

  console.log("Seeding site settings...");
  await SiteSettingsModel.create({
    id: 1,
    siteName: "Avdar Innovations",
    tagline: "Engineering the future of enterprise software.",
    logoUrl: "/assets/avdar-logo.png",
    contactEmail: "contact@avdarinnovations.com",
    contactPhones: ["+91 99678 53364 (WhatsApp)", "+91 97024 97241 (WhatsApp)", "+91 99115 94905 (WhatsApp)"],
    contactAddress: "OC-1125, Gaur City Center, Sector 4, Greater Noida West, 201009, Uttar Pradesh, India",
    mapEmbedUrl: "https://www.google.com/maps?q=Gaur+City+Center+Sector+4+Greater+Noida+West+201009&output=embed",
    socialLinks: [
      { label: "Instagram", url: "https://www.instagram.com/avdarinnovations/" },
      { label: "Facebook", url: "https://www.facebook.com/profile.php?id=61589838802556" },
      { label: "WhatsApp", url: "https://wa.me/919967853364" },
    ],
  });

  console.log("Seeding theme settings...");
  await ThemeSettingsModel.create({ id: 1 });

  console.log("Seeding nav links...");
  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/products", label: "Products" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/industries", label: "Industries" },
  ];
  for (const [i, link] of navLinks.entries()) {
    await NavLinkModel.create({ ...link, order: i });
  }

  console.log("Seeding footer links...");
  const footerCompany = [
    { href: "/about", label: "About Us" },
    { href: "/founder", label: "Founder" },
    { href: "/careers", label: "Careers" },
    { href: "/blog", label: "Blog" },
  ];
  const footerExpertise = [
    { href: "/services", label: "Services" },
    { href: "/products", label: "AI Products" },
    { href: "/industries", label: "Industries" },
    { href: "/portfolio", label: "Portfolio" },
  ];
  for (const [i, link] of footerCompany.entries()) {
    await FooterLinkModel.create({ ...link, section: "company", order: i });
  }
  for (const [i, link] of footerExpertise.entries()) {
    await FooterLinkModel.create({ ...link, section: "expertise", order: i });
  }

  console.log("Seeding services...");
  const services = [
    { icon: "Globe", name: "Website Development", desc: "Corporate sites, landing pages, and portfolios optimized for speed and conversion.", tech: "Next.js, Tailwind, Framer" },
    { icon: "AppWindow", name: "Web Applications", desc: "Complex SPAs, dashboards, and portals requiring heavy data manipulation.", tech: "React, Vue, Svelte" },
    { icon: "Smartphone", name: "Android Apps", desc: "Native Android applications tailored for the Google Play ecosystem.", tech: "Kotlin, Java" },
    { icon: "Smartphone", name: "iOS Apps", desc: "Premium native iOS experiences built for Apple's strict design guidelines.", tech: "Swift, Objective-C" },
    { icon: "Code", name: "Flutter Apps", desc: "Cross-platform mobile apps delivering near-native performance from a single codebase.", tech: "Flutter, Dart" },
    { icon: "Server", name: "Node Backend", desc: "Blazing fast, event-driven backend architectures for real-time applications.", tech: "Node.js, Express, NestJS" },
    { icon: "Database", name: "ERP Systems", desc: "Enterprise Resource Planning to unify your manufacturing, supply chain, and HR.", tech: "Custom Full Stack" },
    { icon: "Layout", name: "CRM Platforms", desc: "Customer Relationship Management software tailored to your specific sales funnel.", tech: "React, PostgreSQL" },
    { icon: "ShoppingCart", name: "POS Systems", desc: "Cloud-synced Point of Sale for retail and dining with offline capabilities.", tech: "Electron, React Native" },
    { icon: "ShieldCheck", name: "Hospital Software", desc: "HIPAA-compliant EHR, patient portals, and telemedicine integrations.", tech: "WebRTC, Secure Enclaves" },
    { icon: "MonitorPlay", name: "Restaurant Software", desc: "Digital menus, kitchen display systems (KDS), and automated ordering.", tech: "Sockets, IoT" },
    { icon: "Layout", name: "Education LMS", desc: "Learning Management Systems with video streaming and interactive grading.", tech: "AWS Medialive, Next.js" },
    { icon: "ShoppingCart", name: "Marketplace Development", desc: "Multi-vendor B2B/B2C marketplaces with split payments and vendor dashboards.", tech: "Stripe Connect, MongoDB" },
    { icon: "Smartphone", name: "Taxi Apps", desc: "Ride-hailing ecosystems with real-time GPS tracking and dynamic pricing.", tech: "Google Maps API, WebSockets" },
    { icon: "ShoppingCart", name: "Delivery Apps", desc: "Logistics and food delivery platforms matching drivers to orders instantly.", tech: "Redis, Go" },
    { icon: "Database", name: "Inventory & Billing", desc: "Automated stock tracking, barcode scanning, and invoice generation.", tech: "Python, Vue.js" },
    { icon: "Server", name: "Enterprise Software", desc: "Bespoke internal tools designed to replace your messy spreadsheet workflows.", tech: "React, Node.js" },
    { icon: "BrainCircuit", name: "AI Development", desc: "End-to-end machine learning pipelines and custom predictive models.", tech: "Python, TensorFlow, PyTorch" },
    { icon: "BrainCircuit", name: "Generative AI", desc: "Integrating ChatGPT, Claude, or custom LLMs to generate text, images, or code.", tech: "OpenAI, LangChain" },
    { icon: "LineChart", name: "AI Chatbots", desc: "Context-aware customer service agents trained on your proprietary data.", tech: "Vector DBs, Pinecone" },
    { icon: "Cpu", name: "Automation", desc: "Event-driven workflows that eliminate manual data entry and repetitive tasks.", tech: "Zapier, Make, Custom Hooks" },
    { icon: "Cloud", name: "Cloud & DevOps", desc: "Auto-scaling infrastructure, CI/CD pipelines, and zero-downtime deployments.", tech: "AWS, Docker, Kubernetes" },
    { icon: "Link2", name: "API Integration", desc: "Connecting disparate software systems to communicate seamlessly.", tech: "REST, GraphQL, SOAP" },
    { icon: "CreditCard", name: "Payment Gateway", desc: "Secure integration of Stripe, PayPal, Razorpay, and regional processors.", tech: "PCI-DSS Compliant" },
    { icon: "Wifi", name: "IoT Development", desc: "Connecting physical hardware, sensors, and machines to web dashboards.", tech: "MQTT, C++, Raspberry Pi" },
    { icon: "ShieldCheck", name: "Blockchain", desc: "Smart contracts, Web3 dApps, and decentralized secure ledgers.", tech: "Solidity, Ethereum" },
    { icon: "Layout", name: "UI/UX Design", desc: "Wireframing, prototyping, and high-fidelity interfaces focused on user retention.", tech: "Figma, Adobe XD" },
    { icon: "Search", name: "SEO & Digital Marketing", desc: "Technical SEO, content strategy, and paid acquisition to drive traffic.", tech: "Analytics, SEMrush" },
    { icon: "ShieldCheck", name: "Branding", desc: "Visual identity, logos, color theory, and comprehensive brand guidelines.", tech: "Illustrator, CorelDRAW" },
    { icon: "Video", name: "Video/Graphic Design", desc: "Motion graphics, explainer videos, and social media assets.", tech: "After Effects, Premiere" },
  ];
  for (const [i, s] of services.entries()) {
    await ServiceModel.create({
      title: s.name,
      description: `${s.desc} (Tech: ${s.tech})`,
      icon: s.icon,
      order: i,
    });
  }

  console.log("Seeding products...");
  const products = [
    {
      name: "Avdar Social AI",
      tagline: "Automate your brand presence.",
      desc: "An intelligent platform that learns your brand voice, generates high-converting social content, schedules posts across platforms, and analyzes engagement—all on autopilot. Stop wasting hours on content creation when our tuned LLMs can match your tone perfectly.\n\nFuture Vision: We are developing autonomous agent capabilities that will allow Social AI to actively engage with followers in the comments, negotiate influencer partnerships, and dynamically adjust ad spend based on real-time virality.",
      features: ["Brand Voice Fine-Tuning", "Multi-platform Scheduling", "Automated Image & Video Generation", "Sentiment & Trend Analysis", "Competitor Tracking Dashboards", "Hashtag Optimization Engine"],
    },
    {
      name: "Avdar AutoLedger",
      tagline: "Zero-touch financial intelligence.",
      desc: "AI-powered accounting software that automatically categorizes transactions, reconciles statements, flags anomalies, and generates predictive cash flow reports. Built for modern CFOs who want to look forward, not backward.\n\nFuture Vision: AutoLedger will soon integrate directly with national banking APIs to execute automated supplier payments based on contract terms, fully automating the Accounts Payable lifecycle with AI-driven fraud detection.",
      features: ["OCR Receipt Scanning & Parsing", "Predictive Cash Flow Modeling", "Automated Tax Compliance Alerts", "Multi-currency Reconciliation", "Vendor Spend Optimization", "Real-time Profitability Dashboards"],
    },
    {
      name: "Avdar SmartPOS",
      tagline: "The predictive point of sale.",
      desc: "Designed for modern retail and restaurants. SmartPOS predicts inventory needs based on weather, local events, and historical trends, while managing floor operations with zero lag. Operates flawlessly offline and syncs instantly when connected.\n\nFuture Vision: SmartPOS is evolving to include computer-vision integrations that analyze foot traffic and queue lengths, automatically alerting managers to open new registers or restock high-demand shelves before they empty.",
      features: ["Predictive Inventory Ordering", "Real-time Multi-store Analytics", "Robust Offline Mode", "Customer Loyalty & Reward Engine", "Kitchen Display System (KDS) Sync", "Staff Performance Tracking"],
    },
  ];
  for (const [i, p] of products.entries()) {
    await ProductModel.create({
      title: p.name,
      category: p.tagline,
      description: p.desc,
      features: p.features,
      order: i,
    });
  }

  console.log("Seeding portfolio projects...");
  const projects = [
    { title: "Ziyonstar", category: "Mobile Repair & Resale", url: "ziyonstar.com", image: "https://images.unsplash.com/photo-1512499617640-c74ae3a79d37?auto=format&fit=crop&q=80&w=2070", problem: "The mobile repair and device resale market runs on unreliable local shops with no standardized pricing, tracking, or trust layer for customers.", solution: "Built a Cashify-style device valuation and repair booking platform with dedicated apps for Users and Technicians, plus a full Admin panel to manage bookings, pricing, technician assignment, and payouts in real time.", tech: "React, React Native, Node.js, MongoDB, Razorpay" },
    { title: "Cloudwash", category: "Laundry & Services", url: "cloudwash.in", image: "https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&q=80&w=2070", problem: "On-demand laundry operators needed a way to manage pickup scheduling, order tracking, and delivery without relying on manual phone-based coordination.", solution: "Delivered a laundry booking website and companion mobile application covering order scheduling, live status tracking, pricing by garment type, and delivery coordination end to end.", tech: "React, Node.js, Express, MongoDB, Firebase" },
    { title: "Fixxev", category: "EV Industry", url: "fixxev.com", image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=2070", problem: "The EV service industry lacked a unified platform to connect vehicle owners with certified service centers and franchise partners at scale.", solution: "Built a website plus User, Franchise, and Admin apps to manage EV service requests, franchise onboarding, service tracking, and centralized operational oversight.", tech: "React, React Native, Node.js, PostgreSQL" },
    { title: "Rolixia CRM", category: "CRM & ERP", url: "", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070", problem: "Growing multi-branch businesses needed a single high-class system to manage inventory, franchise operations, bookings, orders, and customers instead of juggling disconnected spreadsheets and tools.", solution: "Engineered a premium end-to-end CRM covering complete inventory management, franchise management, booking and order pipelines, and full customer lifecycle tracking in one dashboard.", tech: "React, Node.js, PostgreSQL, Redis, AWS" },
    { title: "OpenTag", category: "Emergency & IoT", url: "", image: "https://images.unsplash.com/photo-1580983230786-e2517ee6f9f2?auto=format&fit=crop&q=80&w=2070", problem: "In an emergency involving a vehicle, pet, or traveler, there was no fast, universal way for a bystander to reach the owner or trigger help.", solution: "Built a QR-based vehicle emergency system with website and app: a scannable tag sticks to cars, bikes, pet collars, or travel bags, and scanning it instantly lets anyone raise an emergency request to the owner.", tech: "React, React Native, Node.js, QR/NFC, MongoDB" },
    { title: "Samajwadi Platform", category: "Political & Social", url: "", image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&q=80&w=2070", problem: "Political supporters had no dedicated platform to create personalized branded content or stay updated with verified regional political news.", solution: "Built a registration-based platform where users can generate personalized political photos and videos, and browse a live feed of regular political news and updates.", tech: "React, Node.js, Canvas/Media Processing, MongoDB" },
    { title: "Ashish For Public", category: "Political", url: "", image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&q=80&w=2070", problem: "A public figure needed a professional digital presence to communicate directly with constituents and showcase community initiatives.", solution: "Designed and built a political outreach website to publish updates, initiatives, and public engagement content with a clean, trustworthy presentation.", tech: "React, Node.js, CMS, MongoDB" },
    { title: "Shashib College Portal", category: "Education", url: "", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=2070", problem: "A college needed a modern digital front door for admissions, academics, and campus information instead of a static, outdated site.", solution: "Built a full college website covering admissions information, academic programs, faculty and campus details, and student resources in a fast, modern interface.", tech: "React, Node.js, MongoDB" },
    { title: "TransGlobe", category: "Taxi & Delivery", url: "", image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=2070", problem: "An enterprise mobility operator needed an Ola/Uber-class ride platform that also served corporate accounts, not just individual riders.", solution: "Built a complete ride-hailing ecosystem with dedicated User, Driver, Corporate, Supervisor, and Admin apps, covering live tracking, corporate billing, dispatch supervision, and fleet oversight.", tech: "React, React Native, Node.js, WebSockets, Google Maps API" },
    { title: "OjasIndia", category: "Ecommerce", url: "ojasindia.com", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=2070", problem: "A growing ecommerce brand needed a marketplace that could onboard multiple vendors and resellers, not just sell its own catalog directly.", solution: "Built a multi-vendor ecommerce platform with dedicated User, Vendor, Reseller, and Admin panels covering catalog management, order routing, reseller margins, and platform-wide administration.", tech: "React, Node.js, MongoDB, Razorpay" },
    { title: "MedSync Enterprise", category: "Healthcare", url: "", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2070", problem: "A major hospital network struggled with fragmented patient data, high no-show rates, and manual appointment scheduling across 15 facilities.", solution: "Engineered a unified HIPAA-compliant portal with predictive AI scheduling, reducing no-shows by 30%, and integrated secure telemedicine capabilities.", tech: "React, Node.js, PostgreSQL, WebRTC, AWS" },
    { title: "EduLearn AI", category: "Education", url: "", image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=2074", problem: "A national university needed a modern LMS to handle 50,000+ concurrent students during remote learning without server crashes.", solution: "Built a highly scalable cloud-native LMS with AI-driven personalized learning paths and automated essay grading assistants.", tech: "Next.js, Python, AWS, Redis, LangChain" },
    { title: "SwiftRide Analytics", category: "Taxi & Delivery", url: "", image: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=2070", problem: "A regional logistics company lacked real-time fleet visibility, resulting in inefficient routes and high fuel costs.", solution: "Developed a native mobile ecosystem (Driver + User apps) with sub-second websocket tracking and ML-powered dynamic route optimization.", tech: "Flutter, Go, WebSockets, Google Maps API" },
    { title: "Nexus CRM", category: "CRM & Sales", url: "", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070", problem: "A premium real estate agency was losing high-value leads due to slow response times outside of business hours.", solution: "Deployed a custom CRM with automated WhatsApp integrations and an intelligent AI chatbot capable of instant property matching and lead qualification.", tech: "React, Express, OpenAI API, Twilio" },
    { title: "Forge ERP", category: "Manufacturing", url: "", image: "https://images.unsplash.com/photo-1565439390141-866d9bb4e73b?auto=format&fit=crop&q=80&w=2070", problem: "Legacy on-premise software causing severe production bottlenecks and inaccurate inventory forecasting.", solution: "Migrated entire operations to a custom cloud ERP, connecting IoT factory sensors to a central dashboard for real-time yield monitoring.", tech: "Vue.js, Java, TimescaleDB, MQTT" },
    { title: "Crave Marketplace", category: "Ecommerce", url: "", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=2070", problem: "A boutique retailer needed a multi-vendor marketplace capable of handling high-volume holiday flash sales without degrading UX.", solution: "Architected a serverless microservices platform with edge-cached product catalogs and automated vendor payout splits.", tech: "Next.js, Serverless, Stripe Connect, MongoDB" },
    { title: "FinGuard Security", category: "Finance", url: "", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=2074", problem: "A fintech startup required a highly secure, fraud-resistant transaction ledger capable of processing thousands of micro-payments per minute.", solution: "Implemented a distributed ledger system backed by Kubernetes microservices and real-time AI anomaly detection algorithms.", tech: "Node.js, PostgreSQL, Docker, TensorFlow" },
    { title: "DineSmart POS", category: "Restaurant", url: "", image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=2070", problem: "A fast-casual restaurant chain experienced massive delays due to disconnects between front-of-house orders and kitchen displays.", solution: "Built an offline-first POS app for tablets linked to a real-time KDS (Kitchen Display System), reducing order errors to near zero.", tech: "React Native, SQLite, Express, WebSockets" },
    { title: "GovPort Digital", category: "Government", url: "", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=2070", problem: "A municipal department relied on paper forms for citizen permits, causing massive backlogs and frustration.", solution: "Designed an accessible, highly secure citizen portal with automated document verification and digital signature capabilities.", tech: "Laravel, Vue.js, AWS GovCloud" },
    { title: "LuxeStay Manager", category: "Hospitality", url: "", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2070", problem: "A boutique hotel group needed a centralized system to manage bookings across multiple OTAs and coordinate housekeeping.", solution: "Created a unified channel manager API integration paired with a mobile app for staff to track room status in real-time.", tech: "Ruby on Rails, React, React Native" },
    { title: "AgriYield Predictor", category: "Agriculture", url: "", image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=2070", problem: "Farming cooperatives struggled to estimate crop yields and optimize fertilizer usage based on erratic weather.", solution: "Deployed a data dashboard pulling from satellite imagery APIs and soil sensors to run predictive yield machine learning models.", tech: "Python, Django, React, Google Earth Engine" },
    { title: "WashCycle App", category: "Laundry/Services", url: "", image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&q=80&w=2070", problem: "An on-demand laundry startup lacked a scalable way to coordinate customer pickups, facility processing, and driver routing.", solution: "Engineered a full suite: Customer iOS/Android app, Facility Web Dashboard, and Driver App, complete with automated billing.", tech: "Flutter, Firebase, Stripe, Google Maps" },
  ];
  for (const [i, p] of projects.entries()) {
    await PortfolioProjectModel.create({
      title: p.title,
      category: p.category,
      image: p.image,
      url: p.url || "",
      challenge: p.problem,
      solution: p.solution,
      tags: p.tech.split(", "),
      order: i,
    });
  }

  console.log("Seeding industries...");
  const industries = [
    { name: "Healthcare", icon: "HeartPulse", desc: "HIPAA-compliant telemedicine apps, EHR integrations, patient portals, and AI-driven appointment scheduling that reduces no-shows and optimizes clinic flow." },
    { name: "Education", icon: "GraduationCap", desc: "Highly scalable LMS platforms, virtual classrooms with WebRTC, automated grading systems, and student administration portals built for high concurrent traffic." },
    { name: "Retail & Ecommerce", icon: "ShoppingBag", desc: "Multi-vendor marketplaces, high-conversion headless commerce storefronts, and predictive inventory systems that prevent stockouts during peak sales." },
    { name: "Manufacturing", icon: "Factory", desc: "Custom ERP solutions connecting IoT factory sensors to management dashboards for real-time yield monitoring and supply chain optimization." },
    { name: "Finance & Fintech", icon: "Landmark", desc: "Bank-grade secure payment gateways, automated ledgers, algorithmic trading interfaces, and fraud-detection AI models." },
    { name: "Restaurants & Food", icon: "Utensils", desc: "Smart offline-first POS systems, automated online ordering apps, and Kitchen Display Systems (KDS) that eliminate front-to-back friction." },
    { name: "Automobile & Taxi", icon: "Car", desc: "Real-time fleet management, ride-hailing mobile ecosystems with sub-second websocket tracking, and dynamic pricing engines." },
    { name: "Travel & Hospitality", icon: "Plane", desc: "Global booking engines, intelligent itinerary planners, centralized channel managers, and mobile concierge apps for premium guests." },
    { name: "Real Estate", icon: "Home", desc: "Property listing aggregators, lead-tracking CRM platforms with WhatsApp bot integration, and immersive virtual tour capabilities." },
    { name: "Construction", icon: "HardHat", desc: "Project management tools designed for the field, automated bidding systems, and contractor tracking portals." },
    { name: "Agriculture", icon: "Tractor", desc: "Agri-tech B2B marketplaces, supply chain traceability ledgers, and yield prediction tools powered by satellite API data." },
    { name: "Government", icon: "Building2", desc: "Secure citizen service portals, digital public infrastructure, and automated document processing workflows compliant with strict regulations." },
    { name: "Logistics & Delivery", icon: "Coffee", desc: "End-to-end delivery platforms matching drivers to orders instantly, optimizing routes with ML to minimize fuel consumption." },
    { name: "Beauty & Wellness", icon: "Sparkles", desc: "Salon scheduling software, subscription membership apps, and localized marketing tools to drive recurring bookings." },
    { name: "Fitness", icon: "Dumbbell", desc: "Gym management SaaS, personal trainer matching platforms, and workout tracking apps with wearable device integrations." },
    { name: "Insurance", icon: "ShieldCheck", desc: "Automated claims processing platforms, AI-driven risk assessment models, and streamlined broker administration dashboards." },
  ];
  for (const [i, ind] of industries.entries()) {
    await IndustryModel.create({ title: ind.name, description: ind.desc, icon: ind.icon, order: i });
  }

  console.log("Seeding blog posts...");
  const blog = [
    { slug: "future-of-sme-automation", title: "Why SMEs Must Automate or Die in the Next 5 Years", excerpt: "The gap between enterprises and SMEs used to be capital. Today, it's automation. Learn how generative AI levels the playing field and makes efficiency accessible.", category: "AI & Automation" },
    { slug: "custom-erp-vs-saas", title: "The Hidden Costs of Off-the-Shelf SaaS Platforms", excerpt: "Why scaling businesses eventually hit a wall with generic software, and the profound long-term ROI of building custom enterprise architecture.", category: "Engineering" },
    { slug: "generative-ai-in-healthcare", title: "Predictive Healthcare: How AI is Changing Patient Management", excerpt: "From automated triage to predictive resource allocation, we explore the software infrastructure powering modern hospitals and reducing physician burnout.", category: "Industry Insights" },
    { slug: "react-vs-flutter-enterprise", title: "React Native vs Flutter: The Enterprise Perspective", excerpt: "When to choose which cross-platform framework. We break down performance, developer velocity, and maintainability for large-scale mobile applications.", category: "Tech Stack" },
    { slug: "securing-the-modern-api", title: "Zero Trust Architecture: Securing the Modern API", excerpt: "As cyber threats evolve, perimeter defense is dead. How to implement zero-trust principles in your Node.js and microservice architectures.", category: "Security" },
    { slug: "the-death-of-the-spreadsheet", title: "The Death of the Spreadsheet: Why Internal Tools Matter", excerpt: "If your operations run on massive Excel files, you are losing money. The case for bespoke internal dashboards and CRM tools.", category: "Digital Transformation" },
  ];
  for (const [i, b] of blog.entries()) {
    await BlogPostModel.create({
      title: b.title,
      slug: b.slug,
      excerpt: b.excerpt,
      content: b.excerpt,
      author: "Avdar Team",
      category: b.category,
      order: i,
    });
  }

  console.log("Seeding career roles...");
  const roles = [
    { title: "Senior React/Next.js Engineer", department: "Engineering", location: "Remote / India", type: "Full-time", description: "4+ Years Experience. We hire owners who obsess over details and want to architect the future of software." },
    { title: "AI/ML Python Engineer", department: "Data Science", location: "Remote / India", type: "Full-time", description: "3+ Years Experience. Focused on machine learning pipelines and custom predictive models." },
    { title: "Senior Flutter Developer", department: "Engineering", location: "Remote / India", type: "Full-time", description: "3+ Years Experience. Building cross-platform mobile apps delivering near-native performance." },
    { title: "Node.js Backend Architect", department: "Engineering", location: "Remote / India", type: "Full-time", description: "5+ Years Experience. Designing blazing fast, event-driven backend architectures." },
    { title: "Product Designer (UI/UX)", department: "Design", location: "Remote / India", type: "Full-time", description: "3+ Years Experience. Focusing on wireframing, prototyping, and high-fidelity interfaces." },
    { title: "Project Manager (Agile/Scrum)", department: "Operations", location: "Remote / India", type: "Full-time", description: "4+ Years Experience. Given a problem and the autonomy to solve it. Extreme ownership required." },
    { title: "Enterprise Sales Executive", department: "Sales", location: "Remote / Global", type: "Full-time", description: "5+ Years Experience. Engaging with visionary SMEs globally for digital transformation." },
    { title: "DevOps/Cloud Engineer (AWS)", department: "Engineering", location: "Remote / India", type: "Full-time", description: "3+ Years Experience. Building auto-scaling infrastructure and CI/CD pipelines." },
  ];
  for (const [i, r] of roles.entries()) {
    await CareerRoleModel.create({ ...r, order: i });
  }

  console.log("Seed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
