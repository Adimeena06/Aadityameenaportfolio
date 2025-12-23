import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { GameNav } from "@/components/GameNav";
import { HeroSection } from "@/components/HeroSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";
import { MomosAvatar } from "@/components/MomosAvatar";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { BackgroundMusic } from "@/components/BackgroundMusic";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";

const PortfolioContent = () => {
  const { hasSelectedColor } = useTheme();
  const [showWelcome, setShowWelcome] = useState(true);
  const [musicEnabled, setMusicEnabled] = useState(false);

  useEffect(() => {
    // Check if user has already selected a color
    const hasSelected = localStorage.getItem("portfolio-color-selected");
    if (hasSelected === "true") {
      setShowWelcome(false);
    }
  }, []);

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <AnimatePresence>
        {showWelcome && (
          <WelcomeScreen 
            onComplete={handleWelcomeComplete}
            onMusicToggle={setMusicEnabled}
            musicEnabled={musicEnabled}
          />
        )}
      </AnimatePresence>

      {!showWelcome && (
        <>
          <GameNav />
          <BackgroundMusic enabled={musicEnabled} onToggle={setMusicEnabled} />
          <MomosAvatar />
          
          <main>
            <section id="hero">
              <HeroSection />
            </section>
            
            <section id="skills">
              <SkillsSection />
            </section>
            
            <section id="projects">
              <ProjectsSection />
            </section>
            
            <section id="contact">
              <ContactSection />
            </section>
          </main>
        </>
      )}
    </div>
  );
};

const Index = () => {
  return (
    <ThemeProvider>
      <PortfolioContent />
    </ThemeProvider>
  );
};

export default Index;
