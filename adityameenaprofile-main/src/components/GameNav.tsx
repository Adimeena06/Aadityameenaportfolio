import { motion, useScroll, useSpring } from "framer-motion";
import { Gamepad2, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "Skills", href: "#skills" },
  { label: "Quests", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const GameNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent z-50 origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-1 left-0 right-0 z-40 px-4 py-4"
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between bg-card/80 backdrop-blur-md rounded-full px-6 py-3 border border-border">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="flex items-center gap-2"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Gamepad2 className="text-primary" size={24} />
            </motion.div>
            <span className="font-pixel text-xs text-foreground hidden sm:block">
              P1
            </span>
          </motion.div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 font-future text-sm text-muted-foreground hover:text-primary transition-colors relative group"
              >
                {item.label}
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary origin-left"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Mobile menu button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-foreground"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile menu */}
        <motion.div
          initial={false}
          animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
          className="md:hidden overflow-hidden mt-2"
        >
          <div className="bg-card/95 backdrop-blur-md rounded-2xl border border-border p-4">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ x: -20, opacity: 0 }}
                animate={isOpen ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setIsOpen(false)}
                className="block py-3 px-4 font-future text-sm text-muted-foreground hover:text-primary hover:bg-muted/30 rounded-lg transition-all"
              >
                {item.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
};
