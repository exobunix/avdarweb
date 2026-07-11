import { Link } from "wouter";
import { Instagram, Facebook, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { useGetSiteSettings, useListFooterLinks } from "@workspace/api-client-react";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { data: settings } = useGetSiteSettings();
  const { data: footerLinks } = useListFooterLinks();

  const logoUrl = settings?.logoUrl || "https://ik.imagekit.io/smcdngw8m/avdarweb/avdar-logo_-e85m7WOi.png";
  
  const companyLinks = footerLinks && footerLinks.filter((l) => l.section === "Company").length > 0
    ? [...footerLinks].filter((l) => l.section === "Company").sort((a, b) => a.order - b.order)
    : [
        { href: "/about", label: "About Us" },
        { href: "/founder", label: "Founder" },
        { href: "/careers", label: "Careers" },
        { href: "/blog", label: "Blog" }
      ];

  const expertiseLinks = footerLinks && footerLinks.filter((l) => l.section === "Expertise").length > 0
    ? [...footerLinks].filter((l) => l.section === "Expertise").sort((a, b) => a.order - b.order)
    : [
        { href: "/services", label: "Services" },
        { href: "/products", label: "AI Products" },
        { href: "/industries", label: "Industries" },
        { href: "/portfolio", label: "Portfolio" }
      ];

  // Render social icon links based on platform name
  const renderSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return <Instagram className="w-5 h-5" />;
      case "facebook":
        return <Facebook className="w-5 h-5" />;
      case "whatsapp":
      case "chat":
        return <MessageCircle className="w-5 h-5" />;
      default:
        return <MessageCircle className="w-5 h-5" />;
    }
  };

  return (
    <footer className="relative pt-24 pb-8 overflow-hidden bg-white/[0.02] backdrop-blur-2xl border-t border-border">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Brand Col */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="inline-block">
              <img 
                src={logoUrl} 
                alt={settings?.siteName || "Avdar Innovations"} 
                className="h-28 w-auto md:h-32 object-contain hover:opacity-80 transition-opacity"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              {settings?.tagline || "Building the future of business software. Enterprise AI solutions, SaaS platforms, and digital transformation for visionary SMEs globally."}
            </p>
            <div className="flex gap-4">
              {settings?.socialLinks && settings.socialLinks.length > 0 ? (
                settings.socialLinks.map((link, idx) => (
                  <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-foreground/75 hover:text-primary hover:bg-white/10 transition-all border border-border">
                    {renderSocialIcon(link.label)}
                  </a>
                ))
              ) : (
                <>
                  <a href="https://www.instagram.com/avdarinnovations/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-foreground/75 hover:text-orange-400 hover:bg-white/10 transition-all border border-border">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://www.facebook.com/profile.php?id=61589838802556" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-foreground/75 hover:text-blue-400 hover:bg-white/10 transition-all border border-border">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="https://wa.me/919967853364" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-foreground/75 hover:text-green-400 hover:bg-white/10 transition-all border border-border">
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Links Cols */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="font-display font-medium text-foreground">Company</h4>
            <div className="flex flex-col gap-3 text-sm">
              {companyLinks.map((link, idx) => (
                <Link key={idx} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">{link.label}</Link>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="font-display font-medium text-foreground">Expertise</h4>
            <div className="flex flex-col gap-3 text-sm">
              {expertiseLinks.map((link, idx) => (
                <Link key={idx} href={link.href} className="text-muted-foreground hover:text-foreground transition-colors">{link.label}</Link>
              ))}
            </div>
          </div>

          {/* Contact Col */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h4 className="font-display font-medium text-foreground">Contact</h4>
            <p className="text-sm text-muted-foreground font-medium">Reach out to our team for inquiries or support.</p>
            
            <div className="mt-2 flex flex-col gap-4 text-sm text-muted-foreground">
              {settings?.contactEmail && (
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary" />
                  <a href={`mailto:${settings.contactEmail}`} className="hover:text-foreground transition-colors">{settings.contactEmail}</a>
                </div>
              )}
              {settings?.contactPhones && settings.contactPhones.length > 0 && (
                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-primary mt-1" />
                    <div className="flex flex-col gap-1">
                      {settings.contactPhones.map((phone, idx) => (
                        <span key={idx} className="block hover:text-foreground transition-colors">
                          {phone}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {settings?.contactAddress && (
                <div className="flex items-start gap-3 pt-2">
                  <MapPin className="w-4 h-4 text-orange-400 mt-0.5" />
                  <span className="leading-relaxed">{settings.contactAddress}</span>
                </div>
              )}
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} {settings?.siteName || "Avdar Innovations Pvt. Ltd."} All rights reserved.</p>
          <div className="flex gap-6">
            <a href="mailto:hello@avdarinnovations.com" className="hover:text-foreground transition-colors">Privacy Policy</a>
            <a href="mailto:hello@avdarinnovations.com" className="hover:text-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
