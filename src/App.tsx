import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { EuiProvider, EuiThemeProvider } from "@elastic/eui";
import "@elastic/eui/dist/eui_theme_light.json";
import "@elastic/eui/dist/eui_theme_dark.json";
import { useAppDispatch, useAppSelector } from "./app/hooks"; // 커스텀 훅 사용
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateMeeting from "./pages/CreateMeeting";
import SingleMeeting from "./pages/SingleMeeting";

// 리덕스 상태의 타입을 명시해야 합니다.
interface RootState {
  auth: {
    isDarkTheme: boolean;
  };
}

const App: React.FC = () => {
  const dispatch = useAppDispatch(); // dispatch 호출
  const isDarkTheme = useAppSelector((state: RootState) => state.auth.isDarkTheme); // redux 상태 가져오기
  const [theme, setTheme] = useState<"light" | "dark">("light"); // 테마 타입 명시

  useEffect(() => {
    setTheme(isDarkTheme ? "dark" : "light");

    const backgroundColor = isDarkTheme ? "#121212" : "#FFFFFF";
    document.body.style.backgroundColor = backgroundColor;

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [isDarkTheme]);

  const overrides = {
    colors: {
      light: { primary: "#0b5cff" },
      dark: { primary: "#0b5cff" },
    },
  };

  return (
    <EuiProvider>
      <EuiThemeProvider colorMode={theme} modify={overrides}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreateMeeting />} />
          <Route path="/single" element={<SingleMeeting />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </EuiThemeProvider>
    </EuiProvider>
  );
};

export default App;
