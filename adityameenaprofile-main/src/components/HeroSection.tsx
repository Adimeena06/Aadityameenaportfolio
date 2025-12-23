import { motion } from "framer-motion";
import { ChevronDown, Gamepad2, GraduationCap, MapPin } from "lucide-react";
import { TypewriterText } from "./TypewriterText";
import { FloatingParticles } from "./FloatingParticles";

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <FloatingParticles />
      
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.1) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Player status */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-muted/50 rounded-full border border-border"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Gamepad2 className="text-primary" size={20} />
          </motion.div>
          <span className="font-future text-sm text-muted-foreground">
            Status: <span className="text-green-400">Open to Internships and Job offers</span>
          </span>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </motion.div>

        {/* Main title */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="font-pixel text-2xl sm:text-3xl md:text-4xl mb-4 text-foreground leading-relaxed"
            animate={{ 
              textShadow: [
                "0 0 20px hsl(var(--primary) / 0.3)",
                "0 0 40px hsl(var(--primary) / 0.5)",
                "0 0 20px hsl(var(--primary) / 0.3)",
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            AADITYA MEENA
          </motion.h1>
          
          <motion.p 
            className="font-future text-xl sm:text-2xl md:text-3xl mb-2 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            I am a <TypewriterText />
          </motion.p>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="font-future text-sm text-muted-foreground max-w-2xl mx-auto mt-4 leading-relaxed"
          >
            Passionate about blockchain engineering, AI-driven systems, and Web3 innovation. 
            Building secure, scalable, and decentralized applications.
          </motion.p>
        </motion.div>

        {/* Education & Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-4 mt-6"
        >
          <div className="flex items-center gap-2 text-sm font-future text-muted-foreground">
            <GraduationCap size={16} className="text-primary" />
            <span>BCA (AI & ML) @ Sharda University</span>
          </div>
          <div className="flex items-center gap-2 text-sm font-future text-muted-foreground">
            <MapPin size={16} className="text-secondary" />
            <span>Greater Noida, India</span>
          </div>
        </motion.div>

        {/* Level badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
          className="inline-block mt-8"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 rounded-full opacity-20"
              style={{
                background: "conic-gradient(from 0deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)), hsl(var(--primary)))",
              }}
            />
            <div className="relative bg-card px-6 py-3 rounded-lg border border-primary neon-border">
              <span className="font-pixel text-xs text-primary">LEVEL 99 BLOCKCHAIN DEV</span>
            </div>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap justify-center gap-6 mt-12"
        >
          {[
            { label: "Smart Contracts", value: "10+" },
            { label: "AI Projects", value: "5+" },
            { label: "Hackathons", value: "🏆" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.1, y: -5 }}
              className="game-card px-6 py-4"
            >
              <div className="font-pixel text-lg text-primary neon-text">
                {stat.value}
              </div>
              <div className="font-future text-xs text-muted-foreground mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="font-future text-xs">SCROLL TO CONTINUE</span>
            <ChevronDown className="text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
