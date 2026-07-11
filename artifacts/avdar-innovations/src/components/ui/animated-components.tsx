import { motion, useScroll, useTransform, useSpring, HTMLMotionProps } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] origin-left z-[60] bg-gradient-to-r from-blue-500 via-primary to-orange-500"
    />
  );
}

export function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia("(pointer: coarse)").matches) return;
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const handleLeave = () => setVisible(false);
    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-[5] rounded-full hidden lg:block"
      style={{
        width: 500,
        height: 500,
        left: pos.x - 250,
        top: pos.y - 250,
        background: "radial-gradient(circle, rgba(2,132,199,0.06), rgba(234,88,12,0.03) 40%, transparent 70%)",
      }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
    />
  );
}

export function FadeIn({ 
  children, 
  className = "", 
  delay = 0, 
  direction = "up",
  viewOnce = true
}: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number; 
  direction?: "up" | "down" | "left" | "right" | "none";
  viewOnce?: boolean;
}) {
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    none: { x: 0, y: 0 }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: viewOnce, margin: "-10%" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function GlowingButton({ 
  children, 
  href, 
  onClick, 
  variant = "primary",
  className = "" 
}: { 
  children: React.ReactNode; 
  href?: string; 
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}) {
  const baseStyles = "relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-medium text-sm transition-all duration-300 overflow-hidden group";
  
  let styles = "";
  if (variant === "primary") {
    styles = "bg-foreground text-background hover:bg-foreground/90";
  } else if (variant === "secondary") {
    styles = "bg-primary text-primary-foreground hover:bg-primary/90 glow-blue";
  } else {
    styles = "border border-foreground/20 text-foreground hover:bg-foreground/5";
  }

  const Inner = () => (
    <>
      {variant === "primary" && (
        <span className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={`${baseStyles} ${styles} ${className}`}>
        <Inner />
      </button>
    );
  }

  return (
    <div className={`${baseStyles} ${styles} ${className}`}>
      <Inner />
    </div>
  );
}

export function AnimatedText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");
  
  return (
    <h1 className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ 
              duration: 0.8, 
              ease: [0.16, 1, 0.3, 1],
              delay: delay + (i * 0.04) 
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export function GlassCard({ children, className = "", hover = true }: { children: React.ReactNode; className?: string; hover?: boolean }) {
  return (
    <div className={`glass-panel p-8 rounded-2xl ${hover ? 'hover:-translate-y-2 hover:border-white/20 hover:shadow-[0_10px_40px_rgba(2,132,199,0.15)] transition-all duration-500 group' : ''} ${className}`}>
      {children}
    </div>
  );
}

export function StaggerGrid({
  children,
  className = "",
  staggerDelay = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
}) {
  const directions = {
    up: { y: 32, x: 0 },
    down: { y: -32, x: 0 },
    left: { x: 32, y: 0 },
    right: { x: -32, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, ...directions[direction] },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HoverLift({
  children,
  className = "",
  glow = "blue",
}: {
  children: React.ReactNode;
  className?: string;
  glow?: "blue" | "orange" | "none";
}) {
  const glowShadow =
    glow === "blue"
      ? "0 20px 50px -15px rgba(2,132,199,0.25)"
      : glow === "orange"
      ? "0 20px 50px -15px rgba(234,88,12,0.25)"
      : "0 20px 50px -15px rgba(0,0,0,0.4)";

  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: glowShadow }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.img 
        style={{ y, scale: 1.1 }} 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover" 
      />
    </div>
  );
}
