import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import RatioTool from "./components/RatioTool";

export type Theme = "light" | "dark";

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );

  // Keep <html> in sync with theme
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Listen for parent window postMessage
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      const data = event.data || {};
      if (
        (data.type === "THEME_CHANGE" || data.type === "THEME_RESPONSE") &&
        (data.theme === "light" || data.theme === "dark")
      ) {
        setTheme(data.theme);
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col items-center pt-6 pb-12 px-4 font-sans dark:bg-[#050706] dark:text-white">
      <div className="w-full max-w-[460px] mx-auto flex flex-col items-center">
        <Header />
        <RatioTool />
      </div>
    </div>
  );
};

export default App;
