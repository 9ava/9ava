import React from "react";
import "./App.css";
import "@fontsource/material-icons";
import RefTest from "./pages/RefTest";
import UserProfile from "./pages/UserProfile";
import { UserProvider } from "./contexts/UserContext";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { Header } from "./components/Header";
import Content from "./components/Content";
import { Footer } from "./components/Footer";

function AppContent() {
  const { theme } = useTheme();

  return (
    <div
      className="App"
      style={{
        backgroundColor: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#333" : "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Content />
      <UserProvider>
        <RefTest />
        <UserProfile />
      </UserProvider>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
