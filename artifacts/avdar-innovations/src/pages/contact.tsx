import { PageLayout } from "@/components/layout/PageLayout";
import { AnimatedText, GlassCard, FadeIn } from "@/components/ui/animated-components";
import { useState } from "react";
import { Mail, MapPin, Phone, Instagram, Facebook, Send, ChevronDown, ChevronUp, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useGetSiteSettings, useListPageContent } from "@workspace/api-client-react";
import { getBlockValue } from "@/lib/cms";

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const { data: settings } = useGetSiteSettings();
  const { data: pageBlocks } = useListPageContent("contact");

  const heroBlock = getBlockValue(pageBlocks, "hero", {
    title: "Empower Your Operations.",
    description: "Let's build something exceptional. Connect with our engineering architects to map out your digital transformation."
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
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

  // Fallbacks for contact details
  const contactEmail = settings?.contactEmail || "contact@avdarinnovations.com";
  const contactPhones = settings?.contactPhones && settings.contactPhones.length > 0
    ? settings.contactPhones
    : ["+91 99678 53364", "+91 97024 97241", "+91 99115 94905"];
  const contactAddress = settings?.contactAddress || "OC-1125, Gaur City Center, Sector 4, Greater Noida West, 201009, Uttar Pradesh, India";
  const mapEmbedUrl = settings?.mapEmbedUrl || "https://www.google.com/maps?q=Gaur+City+Center+Sector+4+Greater+Noida+West+201009&output=embed";

  const renderSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return <Instagram className="w-5 h-5" />;
      case "facebook":
        return <Facebook className="w-5 h-5" />;
      default:
        return <MessageCircle className="w-5 h-5" />;
    }
  };

  return (
    <PageLayout>
      <section className="py-24 relative overflow-hidden">
        {/* Background Map Abstract */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center grayscale contrast-150" />
          <div className="absolute inset-0 bg-background/90" />
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 200 Q 200 100 400 300 T 800 200 T 1200 400" stroke="rgba(2, 132, 199, 0.5)" strokeWidth="1" fill="none" />
            <path d="M0 400 Q 300 500 600 300 T 1000 500 T 1400 200" stroke="rgba(234, 88, 12, 0.3)" strokeWidth="1" fill="none" />
          </svg>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <AnimatedText 
              text={heroBlock.title}
              className="text-5xl md:text-7xl font-display font-bold mb-6 text-foreground"
            />
            <p className="text-xl text-muted-foreground leading-relaxed">
              {heroBlock.description}
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 mb-32 items-stretch">
            {/* Form */}
            <div className="lg:col-span-7">
              <FadeIn direction="right">
                <GlassCard className="p-8 md:p-12 h-full border border-border">
                  <h3 className="text-2xl font-display font-bold text-foreground mb-8">Send a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Your Name</label>
                        <input type="text" required className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Work Email</label>
                        <input type="email" required className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors" />
                      </div>
                    </div>
                    
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Company Name</label>
                        <input type="text" className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Project Budget</label>
                        <select className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors [&_option]:bg-background">
                          <option value="1-5k">$1k - $5k</option>
                          <option value="5-10k">$5k - $10k</option>
                          <option value="10-25k">$10k - $25k</option>
                          <option value="25k+">$25k +</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Project Details</label>
                      <textarea required rows={4} className="w-full bg-white/5 border border-border rounded-xl px-4 py-3 text-foreground focus:border-primary focus:outline-none transition-colors resize-none" placeholder="Describe the operational challenges you want to solve..." />
                    </div>

                    <button type="submit" disabled={isSubmitting} className="w-full bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-all">
                      {isSubmitting ? "Sending..." : "Submit Inquiry"} <Send className="w-4 h-4" />
                    </button>
                  </form>
                </GlassCard>
              </FadeIn>
            </div>

            {/* Info */}
            <div className="lg:col-span-5 flex flex-col">
              <FadeIn direction="left" className="h-full flex flex-col">
                <GlassCard className="p-8 md:p-12 h-full flex flex-col justify-between border border-border">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-foreground mb-8">Contact Info</h3>
                    <div className="space-y-6 text-muted-foreground">
                      <div className="flex items-start gap-4 group">
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-border flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/20 transition-colors">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-muted-foreground mb-1">Email Us</div>
                          <a href={`mailto:${contactEmail}`} className="text-foreground hover:text-primary transition-colors font-semibold">{contactEmail}</a>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 group">
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-border flex items-center justify-center text-primary shrink-0 group-hover:bg-primary/20 transition-colors">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-muted-foreground mb-1">Call Us</div>
                          <div className="flex flex-col gap-1">
                            {contactPhones.map((phone, i) => (
                              <span key={i} className="text-foreground font-semibold">
                                {phone}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 group">
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-border flex items-center justify-center text-green-400 shrink-0 group-hover:bg-green-500/20 transition-colors">
                          <MessageCircle className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-muted-foreground mb-1">WhatsApp</div>
                          <span className="text-foreground font-semibold text-sm">All numbers above are available on WhatsApp for quick queries.</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-4 group">
                        <div className="w-12 h-12 rounded-xl bg-white/5 border border-border flex items-center justify-center text-orange-400 shrink-0 group-hover:bg-orange-500/20 transition-colors">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-muted-foreground mb-1">Office Address</div>
                          <span className="text-foreground font-semibold leading-relaxed">{contactAddress}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-border mt-8">
                    <h3 className="text-sm font-mono text-muted-foreground mb-4 uppercase tracking-widest">Connect Socially</h3>
                    <div className="flex gap-4">
                      {settings?.socialLinks && settings.socialLinks.length > 0 ? (
                        settings.socialLinks.map((link, idx) => (
                          <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-white/5 border border-border flex items-center justify-center text-foreground/70 hover:text-primary hover:bg-white/10 transition-all hover:scale-110">
                            {renderSocialIcon(link.label)}
                          </a>
                        ))
                      ) : (
                        <>
                          <a href="https://www.instagram.com/avdarinnovations/" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-white/5 border border-border flex items-center justify-center text-foreground/70 hover:text-orange-400 hover:bg-white/10 transition-all hover:scale-110">
                            <Instagram className="w-5 h-5" />
                          </a>
                          <a href="https://www.facebook.com/profile.php?id=61589838802556" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-white/5 border border-border flex items-center justify-center text-foreground/70 hover:text-blue-400 hover:bg-white/10 transition-all hover:scale-110">
                            <Facebook className="w-5 h-5" />
                          </a>
                          <a href="https://wa.me/919967853364" target="_blank" rel="noreferrer" className="w-12 h-12 rounded-xl bg-white/5 border border-border flex items-center justify-center text-foreground/70 hover:text-green-400 hover:bg-white/10 transition-all hover:scale-110">
                            <MessageCircle className="w-5 h-5" />
                          </a>
                        </>
                      )}
                    </div>
                  </div>
                </GlassCard>
              </FadeIn>
            </div>
          </div>

          {/* Map Section */}
          <div className="mb-32">
            <GlassCard className="border border-border p-0 overflow-hidden">
              <div className="grid lg:grid-cols-3">
                <div className="lg:col-span-2 h-[380px]">
                  <iframe
                    title="Avdar Innovations Office Location"
                    src={mapEmbedUrl}
                    className="w-full h-full border-0 grayscale-[40%] contrast-125"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center gap-4 bg-white/[0.02]">
                  <h3 className="text-xl font-display font-bold text-foreground">Visit Our Office</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {contactAddress}
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-center mb-16 text-foreground">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
                  <GlassCard className="p-6 cursor-pointer border border-border">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-lg font-bold text-foreground">{faq.q}</h3>
                      <span className="text-primary">{openFaq === idx ? <ChevronUp /> : <ChevronDown />}</span>
                    </div>
                    {openFaq === idx && (
                      <p className="mt-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
                        {faq.a}
                      </p>
                    )}
                  </GlassCard>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
