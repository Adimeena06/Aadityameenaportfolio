import { motion } from "framer-motion";

interface SkillBarProps {
  skill: string;
  level: number;
  maxLevel?: number;
  color?: "primary" | "secondary" | "accent";
  index: number;
}

export const SkillBar = ({ 
  skill, 
  level, 
  maxLevel = 100, 
  color = "primary",
  index 
}: SkillBarProps) => {
  const percentage = (level / maxLevel) * 100;

  const gradients = {
    primary: "from-primary to-secondary",
    secondary: "from-secondary to-accent",
    accent: "from-accent to-primary",
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-6"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-future text-sm text-foreground">{skill}</span>
        <span className="font-pixel text-xs text-primary neon-text">
          LVL {level}
        </span>
      </div>
      <div className="xp-bar">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
          className={`xp-fill bg-gradient-to-r ${gradients[color]}`}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-muted-foreground font-future">
          {level}/{maxLevel} XP
        </span>
        <span className="text-xs text-muted-foreground font-future">
          {Math.round(percentage)}%
        </span>
      </div>
    </motion.div>
  );
};
