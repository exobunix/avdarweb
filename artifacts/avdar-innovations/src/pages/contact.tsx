import { PageLayout } from "@/components/layout/PageLayout";
import { AnimatedText, GlassCard, FadeIn } from "@/components/ui/animated-components";
import { useState } from "react";
import { Mail, MapPin, Phone, Instagram, Facebook, Send, ChevronDown, ChevronUp, MessageCircle, ArrowUpRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message Received",
        description: "We'll get back to you within 24 hours to discuss your project.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  const faqs = [
    {
      q: "What is your typical project timeline?",
      a: "Depending on the scope, a custom web or mobile application usually takes 8-12 weeks from discovery to deployment. Enterprise ERP or complex AI integration projects span 3-6 months, broken into deliverable agile sprints."
    },
    {
      q: "Do you provide post-launch support and maintenance?",
      a: "Yes. Every project includes a 30-day warranty period for bug fixes. Following that, we offer custom SLA-backed maintenance contracts that cover server management, security patching, model fine-tuning, and feature scaling."
    },
    {
      q: "What is your pricing model?",
      a: "We avoid hourly billing to ensure aligned incentives. We price based on project scope and value delivered, providing a fixed, transparent cost upfront. For ongoing retained engineering teams, we offer monthly flat-rate structures."
    },
    {
      q: "Can you integrate with our existing legacy systems?",
      a: "Absolutely. A significant part of our enterprise work involves building secure middleware and APIs to connect modern React/Node frontends or AI engines with older on-premise databases (like SAP or Oracle)."
    },
    {
      q: "Do you sign NDAs?",
      a: "Yes. We take intellectual property and security extremely seriously. We are happy to sign standard Non-Disclosure Agreements before our first discovery call."
    }
  ];

  return (
    <PageLayout>
      <section className="py-24 relative overflow-hidden">
        {/* Background Map Abstract */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center grayscale contrast-150" />
          <div className="absolute inset-0 bg-background/90" />
          {/* Abstract map lines */}
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 200 Q 200 100 400 300 T 800 200 T 1200 400" stroke="rgba(2, 132, 199, 0.5)" strokeWidth="1" fill="none" />
            <path d="M0 400 Q 300 500 600 300 T 1000 500 T 1400 200" stroke="rgba(234, 88, 12, 0.3)" strokeWidth="1" fill="none" />
          </svg>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-3xl mb-16">
            <AnimatedText 
              text="Let's build."
              className="text-5xl md:text-7xl font-display font-bold mb-6"
            />
            <p className="text-xl text-muted-foreground leading-relaxed">
              Ready to transform your business operations? Book a free technical consultation with our engineering architects to map out your digital infrastructure.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 mb-32">
            <FadeIn direction="right" className="lg:col-span-3 h-full">
              <GlassCard className="border border-white/10 h-full">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/80">Full Name</label>
                      <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-white/20 hover:border-white/20" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/80">Company</label>
                      <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-white/20 hover:border-white/20" placeholder="Acme Corp" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Email Address</label>
                    <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-white/20 hover:border-white/20" placeholder="john@example.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Project Scope</label>
                    <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none cursor-pointer hover:border-white/20">
                      <option className="bg-background text-white">AI & Automation Engineering</option>
                      <option className="bg-background text-white">Enterprise Software (ERP/CRM)</option>
                      <option className="bg-background text-white">Web Platform / Mobile App</option>
                      <option className="bg-background text-white">Cloud Infrastructure & DevOps</option>
                      <option className="bg-background text-white">Other Inquiry</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Project Details</label>
                    <textarea required rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none placeholder:text-white/20 hover:border-white/20" placeholder="Tell us about the core problem you're trying to solve, your timeline, and any specific technology requirements..."></textarea>
                  </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-primary text-white hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(2,132,199,0.3)] hover:shadow-[0_0_30px_rgba(2,132,199,0.5)] disabled:opacity-70 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? "Sending Request..." : "Send Technical Inquiry"} <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </form>
              </GlassCard>
            </FadeIn>

            <FadeIn direction="left" delay={0.2} className="lg:col-span-2 space-y-6 h-full">
              <GlassCard className="flex flex-col gap-8 h-full border border-white/10">
                <div>
                  <h3 className="text-2xl font-display font-bold text-white mb-8">Contact Info</h3>
                  <div className="space-y-6 text-muted-foreground">
                    <div className="flex items-start gap-4 group">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white/50 mb-1">Email Us</div>
                        <a href="mailto:contact@avdarinnovations.com" className="text-white hover:text-primary transition-colors font-medium">contact@avdarinnovations.com</a>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 group">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/20 transition-colors">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white/50 mb-1">Call Us</div>
                        <div className="flex flex-col gap-1">
                          <a href="tel:+919967853364" className="text-white hover:text-primary transition-colors font-medium">+91 99678 53364</a>
                          <a href="tel:+919702497241" className="text-white hover:text-primary transition-colors font-medium">+91 97024 97241</a>
                          <a href="tel:+919911594905" className="text-white hover:text-primary transition-colors font-medium">+91 99115 94905</a>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 group">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-green-400 shrink-0 group-hover:bg-green-500/20 transition-colors">
                        <MessageCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white/50 mb-1">WhatsApp</div>
                        <span className="text-white font-medium text-sm">All numbers above are available on WhatsApp for quick queries.</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 group">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-orange-400 shrink-0 group-hover:bg-orange-500/20 transition-colors">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white/50 mb-1">Office Address</div>
                        <span className="text-white font-medium">OC-1125, Gaur City Center<br/>Sector 4, Greater Noida West<br/><span className="text-muted-foreground text-sm font-normal">201009, Uttar Pradesh, India</span></span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t border-white/10 mt-auto">
                  <h3 className="text-sm font-mono text-white/50 mb-4 uppercase tracking-widest">Connect Socially</h3>
                  <div className="flex gap-4">
                    <a href="https://www.instagram.com/avdarinnovations/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-orange-400 hover:bg-white/10 transition-all hover:scale-110">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61589838802556" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-blue-400 hover:bg-white/10 transition-all hover:scale-110">
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href="https://wa.me/919967853364" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-green-400 hover:bg-white/10 transition-all hover:scale-110">
                      <MessageCircle className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </GlassCard>
            </FadeIn>
          </div>

          {/* Map Section */}
          <div className="mb-32">
            <GlassCard className="border border-white/10 p-0 overflow-hidden">
              <div className="grid lg:grid-cols-3">
                <div className="lg:col-span-2 h-[380px]">
                  <iframe
                    title="Avdar Innovations Office Location"
                    src="https://www.google.com/maps?q=Gaur+City+Center+Sector+4+Greater+Noida+West+201009&output=embed"
                    className="w-full h-full border-0 grayscale-[40%] contrast-125"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center gap-4 bg-white/[0.02]">
                  <h3 className="text-xl font-display font-bold text-white">Visit Our Office</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    OC-1125, Gaur City Center, Sector 4, Greater Noida West, 201009, Uttar Pradesh, India.
                  </p>
                  <a
                    href="https://www.google.com/maps?q=Gaur+City+Center+Sector+4+Greater+Noida+West+201009"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors text-sm font-medium mt-2"
                  >
                    Get Directions <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">Everything you need to know about working with us.</p>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="glass-panel border border-white/10 rounded-2xl overflow-hidden transition-all duration-300">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/[0.02] transition-colors"
                  >
                    <span className="font-bold text-lg text-white">{faq.q}</span>
                    <span className="text-primary shrink-0 ml-4">
                      {openFaq === i ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>
                  <div 
                    className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <p className="text-muted-foreground leading-relaxed pt-2 border-t border-white/5">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </section>
    </PageLayout>
  );
}
