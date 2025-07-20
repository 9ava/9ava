import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  const handleLanguageToggle = () => {
    setLanguage(language === "ko" ? "en" : "ko");
  };

  return (
    <header
      style={{
        backgroundColor: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#333" : "#fff",
        padding: "1rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1>{language === "ko" ? "내 웹사이트" : "My Website"}</h1>
      <div>
        <button onClick={toggleTheme}>
          {theme === "light" ? "다크 모드" : "라이트 모드"}
        </button>
        <button onClick={handleLanguageToggle} style={{ marginLeft: "10px" }}>
          {language === "ko" ? "English" : "한국어"}
        </button>
      </div>
    </header>
  );
}
