import { motion } from "framer-motion";
import { ExternalLink, Star } from "lucide-react";
import { useState } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  difficulty: "Easy" | "Medium" | "Hard" | "Legendary";
  xpReward: number;
  index: number;
}

export const ProjectCard = ({
  title,
  description,
  tags,
  difficulty,
  xpReward,
  index,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const difficultyColors = {
    Easy: "text-green-400",
    Medium: "text-accent",
    Hard: "text-secondary",
    Legendary: "text-primary neon-text",
  };

  const difficultyStars = {
    Easy: 1,
    Medium: 2,
    Hard: 3,
    Legendary: 4,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ scale: 1.02, y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => setIsUnlocked(true)}
      className="game-card cursor-pointer relative group"
    >
      {/* Achievement unlock effect */}
      {isUnlocked && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 1] }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 border-2 border-accent rounded-lg pointer-events-none"
          style={{ boxShadow: "var(--neon-glow-accent)" }}
        />
      )}

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <motion.h3 
            className="font-pixel text-sm text-foreground mb-1"
            animate={isHovered ? { color: "hsl(180, 100%, 50%)" } : {}}
          >
            {title}
          </motion.h3>
          <div className="flex items-center gap-1">
            {Array.from({ length: difficultyStars[difficulty] }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <Star
                  size={12}
                  className={`${difficultyColors[difficulty]} fill-current`}
                />
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          className="bg-muted px-3 py-1 rounded font-future text-xs text-accent"
          whileHover={{ scale: 1.1 }}
        >
          +{xpReward} XP
        </motion.div>
      </div>

      {/* Description */}
      <p className="font-future text-sm text-muted-foreground mb-4 leading-relaxed">
        {description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 + i * 0.05 }}
            className="px-2 py-1 bg-muted/50 border border-border rounded text-xs font-future text-primary"
          >
            {tag}
          </motion.span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-4 border-t border-border">
        <span className={`font-future text-xs ${difficultyColors[difficulty]}`}>
          {difficulty}
        </span>
        <motion.div
          className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity"
          animate={isHovered ? { x: [0, 5, 0] } : {}}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          <span className="font-future text-xs">View Quest</span>
          <ExternalLink size={14} />
        </motion.div>
      </div>

      {/* Glowing border on hover */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        animate={isHovered ? { 
          boxShadow: "0 0 30px hsl(180 100% 50% / 0.3), inset 0 0 30px hsl(180 100% 50% / 0.1)" 
        } : { 
          boxShadow: "none" 
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};
