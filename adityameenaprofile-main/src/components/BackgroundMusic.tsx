import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

interface BackgroundMusicProps {
  enabled: boolean;
  onToggle: (enabled: boolean) => void;
}

export const BackgroundMusic = ({ enabled, onToggle }: BackgroundMusicProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.15;
    
    // Using a free chiptune/gaming music URL
    audio.src = "https://assets.mixkit.co/music/preview/mixkit-games-worldbeat-466.mp3";
    
    audio.addEventListener("canplaythrough", () => setIsLoaded(true));
    audio.addEventListener("error", () => console.log("Music failed to load"));
    
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  useEffect(() => {
    if (audioRef.current && isLoaded) {
      if (enabled) {
        audioRef.current.play().catch(() => {
          // Autoplay blocked, user needs to interact
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [enabled, isLoaded]);

  return (
    <motion.button
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => onToggle(!enabled)}
      className="fixed top-24 right-6 z-40 p-3 bg-card/80 backdrop-blur-md border border-border rounded-lg text-muted-foreground hover:text-primary transition-colors"
      title={enabled ? "Mute Music" : "Play Music"}
    >
      {enabled ? (
        <Volume2 size={20} className="text-primary" />
      ) : (
        <VolumeX size={20} />
      )}
      
      {/* Animated sound waves when playing */}
      {enabled && (
        <div className="absolute -right-1 -top-1 flex gap-0.5">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="w-0.5 bg-primary rounded-full"
              animate={{
                height: [4, 8, 4],
              }}
              transition={{
                duration: 0.5,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      )}
    </motion.button>
  );
};
