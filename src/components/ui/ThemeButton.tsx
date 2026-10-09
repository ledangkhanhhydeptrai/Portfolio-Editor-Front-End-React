import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";


const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button type="button" onClick={toggleTheme}>
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  );
};

export default ThemeButton;