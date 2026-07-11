import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import avdarLogo from "@/assets/avdar-logo.png";

export function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/products", label: "Products" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/industries", label: "Industries" },
  ];

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
          <div className={`flex items-center justify-between rounded-2xl transition-all duration-500 border ${
            scrolled
              ? "bg-background/70 backdrop-blur-2xl border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.35)] px-6 py-2.5"
              : "bg-white/[0.03] backdrop-blur-md border-white/5 px-4 py-1.5"
          }`}>
            <Link href="/" className="flex items-center gap-3 group z-50">
              <img 
                src={avdarLogo} 
                alt="Avdar Innovations Logo" 
                className="h-14 w-auto object-contain group-hover:opacity-80 transition-opacity" 
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-white ${
                    location === link.href ? "text-white" : "text-white/60"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <Link href="/contact" className="relative group overflow-hidden rounded-full p-[1px]">
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-orange-500 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative bg-background/90 backdrop-blur-md px-6 py-2 rounded-full flex items-center gap-2 transition-all duration-300 group-hover:bg-background/50">
                  <span className="text-sm font-semibold text-white">Book Consultation</span>
                  <ChevronRight className="w-4 h-4 text-orange-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>

            <button 
              className="lg:hidden text-white z-50 p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
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
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`border-b border-white/10 pb-4 ${
                    location === link.href ? "text-primary" : "text-white/80"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link 
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="text-orange-400 mt-4"
              >
                Book Consultation
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
