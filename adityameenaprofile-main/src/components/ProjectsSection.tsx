import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";

const projects = [
  {
    title: "AI-BASED THERAPIST",
    description: "Developed a non-verbal AI therapy system detecting user emotions via facial expressions using TensorFlow, OpenCV, and ML models.",
    tags: ["TensorFlow", "OpenCV", "Python", "ML"],
    difficulty: "Legendary" as const,
    xpReward: 500,
  },
  {
    title: "BLOCKCHAIN ORGAN DONATION",
    description: "Built a smart contract system ensuring transparency and traceability of donor-recipient data with immutable verification.",
    tags: ["ICP", "Smart Contracts", "HTML/CSS", "JavaScript"],
    difficulty: "Legendary" as const,
    xpReward: 450,
  },
  {
    title: "NULLCLASS INTERNSHIP",
    description: "Designed and deployed smart contracts for DApps, improved transaction security and gas efficiency on ICP platform.",
    tags: ["Solidity", "ICP", "Smart Contracts", "DApps"],
    difficulty: "Hard" as const,
    xpReward: 400,
  },


  {
    title: "CSA VOLUNTEER MANAGEMENT",
    description: "Led 50+ volunteers across technical events as Head of CSA Volunteer Department at Sharda University.",
    tags: ["Leadership", "Events", "Team Management"],
    difficulty: "Medium" as const,
    xpReward: 250,
  },
];

export const ProjectsSection = () => {
  return (
    <section className="py-20 px-4 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-20 w-96 h-96 rounded-full border border-primary"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-20 w-64 h-64 rounded-full border border-secondary"
        />
      </div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 relative z-10"
      >
        <motion.span
          className="inline-block font-future text-xs text-muted-foreground mb-4 tracking-widest"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          [ QUEST LOG ]
        </motion.span>
        <h2 className="font-pixel text-xl sm:text-2xl text-foreground mb-4">
          COMPLETED <span className="text-secondary neon-text-secondary">QUESTS</span>
        </h2>
        <p className="font-future text-muted-foreground max-w-md mx-auto">
          Each project is a quest completed in blockchain, AI, and Web3 development
        </p>
      </motion.div>

      {/* Project grid */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} {...project} index={index} />
        ))}
      </div>

      {/* Experience highlight */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-16"
      >
        <div className="inline-flex flex-col sm:flex-row items-center gap-4 game-card">
          <div className="text-center sm:text-left">
            <span className="font-pixel text-xs text-primary neon-text">CURRENT QUEST</span>
            <p className="font-future text-sm text-muted-foreground mt-1">
              Seeking Software Engineering Internship (Winter/Spring 2026)
            </p>
          </div>
          <div className="h-8 w-px bg-border hidden sm:block" />
          <div className="text-center sm:text-left">
            <span className="font-pixel text-xs text-secondary neon-text-secondary">GUILD</span>
            <p className="font-future text-sm text-muted-foreground mt-1">
              BCA (AI & ML) @ Sharda University
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
