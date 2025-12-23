import { motion } from "framer-motion";
import { SkillBar } from "./SkillBar";
import { Code, Database, Globe, Palette, Shield, Zap, Brain, Link } from "lucide-react";

const skills = [
  { skill: "Python / Java", level: 90, color: "primary" as const },
  { skill: "Solidity", level: 85, color: "secondary" as const },
  { skill: "Blockchain (ICP, Web3.js)", level: 88, color: "accent" as const },
  { skill: "TensorFlow ", level: 82, color: "primary" as const },
  { skill: "HTML / CSS / React", level: 85, color: "secondary" as const },
  { skill: "Smart Contracts", level: 87, color: "accent" as const },
];

const attributes = [
  { icon: Zap, label: "Speed", value: "S+" },
  { icon: Shield, label: "Security", value: "S" },
  { icon: Brain, label: "AI/ML", value: "S+" },
  { icon: Link, label: "Web3", value: "S+" },
  { icon: Database, label: "Backend", value: "A+" },
  { icon: Globe, label: "Frontend", value: "A" },
];

const certifications = [
   "AWS APAC – Solutions Architecture Job Simulation",
  "Walmart USA – Advanced Software Engineering Completion Certificate",
  "Data Analyst Certification",
  "Blockchain Fundamentals",
  "Java Programming – Great Learning",
  "Generative AI – Udemy",
  "Ethical Hacking – Udemy",
  "Blockchain Basics – Certified",
];

export const SkillsSection = () => {
  return (
    <section className="py-20 px-4 relative">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <motion.span
          className="inline-block font-future text-xs text-muted-foreground mb-4 tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          [ CHARACTER STATS ]
        </motion.span>
        <h2 className="font-pixel text-xl sm:text-2xl text-foreground mb-4">
          SKILL <span className="text-primary neon-text">TREE</span>
        </h2>
        <p className="font-future text-muted-foreground max-w-md mx-auto">
          Unlocked abilities from BCA (AI & ML) at Sharda University
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* XP Bars */}
        <div className="game-card">
          <h3 className="font-pixel text-sm text-primary mb-6 neon-text">
            POWER LEVELS
          </h3>
          {skills.map((skill, index) => (
            <SkillBar key={skill.skill} {...skill} index={index} />
          ))}
        </div>

        {/* Attribute cards */}
        <div>
          <div className="game-card mb-6">
            <h3 className="font-pixel text-sm text-secondary mb-6 neon-text-secondary">
              ATTRIBUTES
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {attributes.map((attr, index) => (
                <motion.div
                  key={attr.label}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, type: "spring" }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex flex-col items-center p-4 bg-muted/30 rounded-lg border border-border hover:border-primary transition-colors"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <attr.icon className="text-primary mb-2" size={24} />
                  </motion.div>
                  <span className="font-future text-xs text-muted-foreground mb-1">
                    {attr.label}
                  </span>
                  <span className="font-pixel text-sm text-accent neon-text-accent">
                    {attr.value}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="game-card"
          >
            <h3 className="font-pixel text-sm text-accent mb-4 neon-text-accent">
              ACHIEVEMENTS UNLOCKED
            </h3>
            <div className="space-y-2">
              {certifications.map((cert, i) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-2 text-sm font-future text-muted-foreground"
                >
                  <span className="text-accent">🏆</span>
                  {cert}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
