import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X, MessageCircle } from "lucide-react";

const messages = [
  "Hey there! I'm Momos! 👋",
  "Welcome to Aaditya's portfolio!",
  "He's a Blockchain & AI Developer! 🎮",
  "Check out his Web3 projects!",
  "He built AI Therapist with emotion detection!",
  "Smart contracts are his specialty! ⛓️",
  "Scroll down to see more quests!",
  "He's looking for internships! 🚀",
];

const aboutMessages = [
  "Aaditya is a BCA student at Sharda University!",
  "He specializes in AI & Machine Learning!",
  "Blockchain + AI = His superpower! 🔥",
  "He's worked on ICP smart contracts!",
  "Built organ donation system on blockchain!",
  "Leads 50+ volunteers as CSA Head!",
];

export const MomosAvatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [showBubble, setShowBubble] = useState(true);
  const [messageType, setMessageType] = useState<"greeting" | "about">("greeting");

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isOpen) {
        setShowBubble(true);
        const msgs = messageType === "greeting" ? messages : aboutMessages;
        setCurrentMessage((prev) => (prev + 1) % msgs.length);
        
        setTimeout(() => setShowBubble(false), 4000);
      }
    }, 8000);

    return () => clearInterval(interval);
  }, [isOpen, messageType]);

  const handleClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMessageType(messageType === "greeting" ? "about" : "greeting");
    }
  };

  const msgs = messageType === "greeting" ? messages : aboutMessages;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat bubble */}
      <AnimatePresence>
        {(showBubble || isOpen) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            className="absolute bottom-full right-0 mb-4 w-64"
          >
            <div className="game-card p-4 relative">
              <button
                onClick={() => setShowBubble(false)}
                className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
              >
                <X size={14} />
              </button>
              <p className="font-future text-sm text-foreground pr-4">
                {msgs[currentMessage]}
              </p>
              {isOpen && (
                <div className="mt-3 flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setMessageType("about")}
                    className="px-3 py-1 bg-primary/20 border border-primary rounded text-xs font-future text-primary"
                  >
                    About Aaditya
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setCurrentMessage((prev) => (prev + 1) % msgs.length);
                    }}
                    className="px-3 py-1 bg-secondary/20 border border-secondary rounded text-xs font-future text-secondary"
                  >
                    Next Tip
                  </motion.button>
                </div>
              )}
              {/* Triangle pointer */}
              <div className="absolute -bottom-2 right-8 w-4 h-4 bg-card rotate-45 border-r border-b border-border" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Avatar */}
      <motion.button
        onClick={handleClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary p-1 cursor-pointer"
        animate={{
          y: [0, -5, 0],
          boxShadow: [
            "0 0 20px hsl(var(--primary) / 0.5)",
            "0 0 30px hsl(var(--primary) / 0.8)",
            "0 0 20px hsl(var(--primary) / 0.5)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-full h-full rounded-full bg-card flex items-center justify-center overflow-hidden">
          {/* Momos face */}
          <div className="relative">
            {/* Face */}
            <motion.div
              className="text-3xl"
              animate={{ rotate: isOpen ? [0, -10, 10, 0] : 0 }}
              transition={{ duration: 0.5 }}
            >
              🥟
            </motion.div>
            {/* Eyes that blink */}
            <motion.div
              className="absolute top-1 left-1/2 -translate-x-1/2 flex gap-2"
              animate={{ scaleY: [1, 0.1, 1] }}
              transition={{ duration: 0.15, repeat: Infinity, repeatDelay: 3 }}
            >
              <span className="text-[8px]">👀</span>
            </motion.div>
          </div>
        </div>

        {/* Notification dot */}
        {!isOpen && (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center"
          >
            <MessageCircle size={12} className="text-accent-foreground" />
          </motion.div>
        )}
      </motion.button>

      {/* Name tag */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
      >
        <span className="font-pixel text-[8px] text-primary neon-text">MOMOS</span>
      </motion.div>
    </div>
  );
};
