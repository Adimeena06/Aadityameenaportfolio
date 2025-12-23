import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  name: string;
}

const colorPresets: Record<string, ThemeColors> = {
  cyan: {
    primary: "180 100% 50%",
    secondary: "300 100% 60%",
    accent: "45 100% 55%",
    name: "Cyan"
  },
  purple: {
    primary: "270 100% 60%",
    secondary: "320 100% 60%",
    accent: "45 100% 55%",
    name: "Purple"
  },
  green: {
    primary: "142 70% 45%",
    secondary: "180 100% 50%",
    accent: "45 100% 55%",
    name: "Green"
  },
  orange: {
    primary: "25 100% 55%",
    secondary: "45 100% 55%",
    accent: "0 100% 60%",
    name: "Orange"
  },
  pink: {
    primary: "330 100% 60%",
    secondary: "280 100% 60%",
    accent: "45 100% 55%",
    name: "Pink"
  },
  blue: {
    primary: "220 100% 55%",
    secondary: "260 100% 60%",
    accent: "45 100% 55%",
    name: "Blue"
  },
  red: {
    primary: "0 100% 55%",
    secondary: "330 100% 60%",
    accent: "45 100% 55%",
    name: "Red"
  },
  yellow: {
    primary: "50 100% 50%",
    secondary: "30 100% 55%",
    accent: "0 100% 60%",
    name: "Yellow"
  },
};

interface ThemeContextType {
  currentColor: string;
  setColor: (color: string) => void;
  colorPresets: typeof colorPresets;
  hasSelectedColor: boolean;
  setHasSelectedColor: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentColor, setCurrentColor] = useState("cyan");
  const [hasSelectedColor, setHasSelectedColor] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-color");
    const hasSelected = localStorage.getItem("portfolio-color-selected");
    if (saved && colorPresets[saved]) {
      setCurrentColor(saved);
    }
    if (hasSelected === "true") {
      setHasSelectedColor(true);
    }
  }, []);

  useEffect(() => {
    const colors = colorPresets[currentColor];
    if (colors) {
      document.documentElement.style.setProperty("--primary", colors.primary);
      document.documentElement.style.setProperty("--secondary", colors.secondary);
      document.documentElement.style.setProperty("--accent", colors.accent);
      document.documentElement.style.setProperty("--ring", colors.primary);
      document.documentElement.style.setProperty("--border", `${colors.primary.split(" ")[0]} 50% 20%`);
      localStorage.setItem("portfolio-color", currentColor);
    }
  }, [currentColor]);

  const setColor = (color: string) => {
    if (colorPresets[color]) {
      setCurrentColor(color);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentColor, setColor, colorPresets, hasSelectedColor, setHasSelectedColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};
