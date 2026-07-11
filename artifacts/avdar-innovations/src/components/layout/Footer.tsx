import { Link } from "wouter";
import { Instagram, Facebook, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import avdarLogo from "@/assets/avdar-logo.png";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative pt-24 pb-8 overflow-hidden bg-white/[0.02] backdrop-blur-2xl border-t border-white/10">
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
                src={avdarLogo} 
                alt="Avdar Innovations" 
                className="h-20 w-auto hover:opacity-80 transition-opacity"
              />
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
              Building the future of business software. Enterprise AI solutions, SaaS platforms, and digital transformation for visionary SMEs globally.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/avdarinnovations/" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white/70 hover:text-orange-400 hover:bg-white/10 transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61589838802556" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white/70 hover:text-blue-400 hover:bg-white/10 transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://wa.me/919967853364" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-white/70 hover:text-green-400 hover:bg-white/10 transition-all">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links Cols */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="font-display font-medium text-white">Company</h4>
            <div className="flex flex-col gap-3 text-sm">
              <Link href="/about" className="text-muted-foreground hover:text-white transition-colors">About Us</Link>
              <Link href="/founder" className="text-muted-foreground hover:text-white transition-colors">Founder</Link>
              <Link href="/careers" className="text-muted-foreground hover:text-white transition-colors">Careers</Link>
              <Link href="/blog" className="text-muted-foreground hover:text-white transition-colors">Blog</Link>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-4">
            <h4 className="font-display font-medium text-white">Expertise</h4>
            <div className="flex flex-col gap-3 text-sm">
              <Link href="/services" className="text-muted-foreground hover:text-white transition-colors">Services</Link>
              <Link href="/products" className="text-muted-foreground hover:text-white transition-colors">AI Products</Link>
              <Link href="/industries" className="text-muted-foreground hover:text-white transition-colors">Industries</Link>
              <Link href="/portfolio" className="text-muted-foreground hover:text-white transition-colors">Portfolio</Link>
            </div>
          </div>

          {/* Contact Col */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <h4 className="font-display font-medium text-white">Contact</h4>
            <p className="text-sm text-muted-foreground">Reach out to our team for inquiries or support.</p>
            
            <div className="mt-2 flex flex-col gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <a href="mailto:contact@avdarinnovations.com" className="hover:text-white transition-colors">contact@avdarinnovations.com</a>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary" />
                  <a href="tel:+919967853364" className="hover:text-white transition-colors">+91 99678 53364</a>
                </div>
                <a href="tel:+919702497241" className="hover:text-white transition-colors pl-7">+91 97024 97241</a>
                <a href="tel:+919911594905" className="hover:text-white transition-colors pl-7">+91 99115 94905</a>
              </div>
              <div className="flex items-start gap-3 pt-2">
                <MapPin className="w-4 h-4 text-orange-400 mt-0.5" />
                <span className="leading-relaxed">OC-1125, Gaur City Center, Sector 4, Greater Noida West, 201009</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {currentYear} Avdar Innovations Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="mailto:hello@avdarinnovations.com" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="mailto:hello@avdarinnovations.com" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
