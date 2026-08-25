import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Sun, Moon } from "lucide-react";
import { useGetSiteSettings, useListNavLinks } from "@workspace/api-client-react";
import { useTheme } from "@/hooks/useTheme";
import { GlowingButton } from "@/components/ui/animated-components";

export function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { mode, toggle } = useTheme();
  const { data: settings } = useGetSiteSettings();
  const { data: navLinks } = useListNavLinks();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true); // scrolling down
      } else {
        setHidden(false); // scrolling up
      }
      lastScrollY = currentScrollY;
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const defaultNavLinks = [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/products", label: "Products" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/industries", label: "Industries" },
    { href: "/blog", label: "Blog" },
  ];

  const displayLinks = navLinks && navLinks.length > 0
    ? [...navLinks].sort((a, b) => a.order - b.order)
    : defaultNavLinks;

  const logoUrl = settings?.logoUrl || "https://ik.imagekit.io/smcdngw8m/avdarweb/avdar-logo_-e85m7WOi.png";

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-4" : "py-6"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className={`flex items-center justify-between lg:grid lg:grid-cols-3 lg:items-center rounded-2xl transition-all duration-500 border ${
            scrolled
              ? "bg-background/70 backdrop-blur-2xl border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.35)] px-6 py-2.5"
              : "bg-white/[0.03] backdrop-blur-md border-white/5 px-4 py-1.5"
          }`}>
            <Link href="/" className="flex items-center gap-3 group z-50 relative justify-self-start">
              <img 
                src={logoUrl} 
                alt={settings?.siteName || "Avdar Innovations Logo"} 
                className="h-20 w-auto md:h-24 object-contain group-hover:opacity-80 transition-opacity relative z-10" 
              />
            </Link>

            <nav className="hidden lg:flex items-center justify-center gap-8">
              {displayLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-foreground ${
                    location === link.href ? "text-foreground font-semibold" : "text-foreground/60"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center justify-end gap-4">
              {/* Theme Mode Toggle */}
              <button
                onClick={toggle}
                className="p-2 rounded-full border border-border bg-card/50 text-foreground hover:bg-muted transition-all duration-300"
                aria-label="Toggle Dark/Light Mode"
              >
                {mode === "dark" ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-blue-500" />}
              </button>

              <Link href="/contact">
                <GlowingButton variant="primary" className="py-2.5 px-6">
                  Book Consultation
                </GlowingButton>
              </Link>
            </div>

            <div className="flex items-center gap-2 lg:hidden">
              {/* Theme Mode Toggle for Mobile */}
              <button
                onClick={toggle}
                className="p-2 rounded-full border border-border bg-card/50 text-foreground hover:bg-muted transition-all duration-300"
                aria-label="Toggle Dark/Light Mode"
              >
                {mode === "dark" ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4 text-blue-500" />}
              </button>

              <button 
                className="text-foreground p-2 z-50"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl pt-32 px-6 pb-6 flex flex-col"
          >
            <div className="flex flex-col gap-6 text-2xl font-display font-medium">
              {displayLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`border-b border-border pb-4 hover:text-primary transition-colors ${
                    location === link.href ? "text-primary font-semibold" : "text-foreground/80"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-orange-500 mt-4 flex items-center gap-2"
              >
                Book Consultation <ChevronRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
