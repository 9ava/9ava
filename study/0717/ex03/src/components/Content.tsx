import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

export default function Content() {
  const { theme } = useTheme();
  const { language } = useLanguage();

  return (
    <main
      style={{
        backgroundColor: theme === "light" ? "#f5f5f5" : "#222",
        color: theme === "light" ? "#333" : "#fff",
        padding: "1rem",
      }}
    >
      <p>
        {language === "ko"
          ? "환영합니다! 이 웹사이트는 다양한 기능을 제공합니다."
          : "Welcome! This website offers various features."}
      </p>
    </main>
  );
}
