import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Volume2, VolumeX } from "lucide-react";

const dialogues = [
  "Hey there, Player! 👋",
  "I'm Momos, your friendly guide!",
  "Welcome to Aaditya Meena's portfolio!",
  "Before we begin our adventure...",
  "What's your favorite color?",
];

interface WelcomeScreenProps {
  onComplete: () => void;
  onMusicToggle: (enabled: boolean) => void;
  musicEnabled: boolean;
}

export const WelcomeScreen = ({ onComplete, onMusicToggle, musicEnabled }: WelcomeScreenProps) => {
  const { setColor, colorPresets, setHasSelectedColor } = useTheme();
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showColors, setShowColors] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  useEffect(() => {
    if (dialogueIndex >= dialogues.length) {
      setShowColors(true);
      return;
    }

    const text = dialogues[dialogueIndex];
    let charIndex = 0;
    setDisplayedText("");
    setIsTyping(true);

    const interval = setInterval(() => {
      if (charIndex < text.length) {
        setDisplayedText(text.slice(0, charIndex + 1));
        charIndex++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [dialogueIndex]);

  const handleNext = () => {
    if (isTyping) {
      setDisplayedText(dialogues[dialogueIndex]);
      setIsTyping(false);
    } else if (dialogueIndex < dialogues.length - 1) {
      setDialogueIndex((prev) => prev + 1);
    } else {
      setShowColors(true);
    }
  };

  const handleColorSelect = (colorKey: string) => {
    setSelectedColor(colorKey);
    setColor(colorKey);
  };

  const handleStart = () => {
    if (selectedColor) {
      setHasSelectedColor(true);
      localStorage.setItem("portfolio-color-selected", "true");
      onComplete();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-background flex items-center justify-center overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary) / 0.2) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary) / 0.2) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-primary/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Music toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={() => onMusicToggle(!musicEnabled)}
        className="absolute top-6 right-6 p-3 bg-card border border-border rounded-lg text-muted-foreground hover:text-primary transition-colors"
      >
        {musicEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </motion.button>

      {/* Main content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
        {/* Momos Avatar */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="mb-8"
        >
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, -5, 5, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block"
          >
            <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary p-1">
              <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                <span className="text-6xl">🥟</span>
              </div>
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-pixel text-sm text-primary neon-text mt-4"
            >
              MOMOS
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Dialogue box */}
        <AnimatePresence mode="wait">
          {!showColors ? (
            <motion.div
              key="dialogue"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="game-card p-6 mb-8"
            >
              <p className="font-future text-xl text-foreground min-h-[60px]">
                {displayedText}
                {isTyping && <span className="animate-pulse">|</span>}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-future text-sm"
              >
                {isTyping ? "Skip" : dialogueIndex < dialogues.length - 1 ? "Next" : "Choose Color!"}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="colors"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="game-card p-6"
            >
              <h3 className="font-pixel text-sm text-foreground mb-6">
                PICK YOUR <span className="text-primary neon-text">POWER COLOR</span>
              </h3>
              
              <div className="grid grid-cols-4 gap-4 mb-6">
                {Object.entries(colorPresets).map(([key, colors], index) => (
                  <motion.button
                    key={key}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleColorSelect(key)}
                    className={`relative p-4 rounded-lg border-2 transition-all ${
                      selectedColor === key
                        ? "border-foreground shadow-lg"
                        : "border-transparent hover:border-muted"
                    }`}
                    style={{
                      background: `linear-gradient(135deg, hsl(${colors.primary}), hsl(${colors.secondary}))`,
                    }}
                  >
                    <span className="font-future text-xs text-white drop-shadow-lg">
                      {colors.name}
                    </span>
                    {selectedColor === key && (
                      <motion.div
                        layoutId="selected"
                        className="absolute inset-0 rounded-lg border-2 border-white"
                        initial={false}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: selectedColor ? 1.05 : 1 }}
                whileTap={{ scale: selectedColor ? 0.95 : 1 }}
                onClick={handleStart}
                disabled={!selectedColor}
                className={`px-8 py-3 rounded-lg font-pixel text-sm transition-all ${
                  selectedColor
                    ? "bg-primary text-primary-foreground neon-border cursor-pointer"
                    : "bg-muted text-muted-foreground cursor-not-allowed"
                }`}
              >
                START ADVENTURE!
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
