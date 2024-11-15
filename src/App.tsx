import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { EuiGlobalToastList, EuiProvider, EuiThemeProvider } from "@elastic/eui";
import "@elastic/eui/dist/eui_theme_light.json";
import "@elastic/eui/dist/eui_theme_dark.json";
import { useAppDispatch, useAppSelector } from "./app/hooks"; // 커스텀 훅 사용
import { setToasts } from "./app/slices/MeetingSlice";

// 페이지 컴포넌트 
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateMeeting from "./pages/CreateMeeting";
import SingleMeeting from "./pages/SingleMeeting";
import VideoConference from "./pages/VideoConference";
import MyMeetings from "./pages/MyMeetings";
import Meeting from "./pages/Meeting";
import JoinMeeting from "./pages/JoinMeeting";

// 리덕스 상태의 타입을 명시해야 합니다.
interface RootState {
  auth: {
    isDarkTheme: boolean;
  };
}

function App(){
  const dispatch = useAppDispatch(); // dispatch 호출
  const toasts = useAppSelector((zoom) => zoom.meeting.toasts);
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
  const removeToast = (removeToast: {id: string}) => {
    dispatch(setToasts(
      toasts.filter((toast: { id: string }) => toast.id == removeToast.id)
    )
    );
  }

  return (
    <EuiProvider>
      <EuiThemeProvider colorMode={theme} modify={overrides}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<CreateMeeting />} />
          <Route path="/1by1" element={<SingleMeeting />} />
          <Route path="/videoconference" element={<VideoConference />} />
          <Route path="/mymeetings" element={<MyMeetings />} />
          <Route path="/meeting" element={<Meeting />} />
          <Route path="/join/:id" element={<JoinMeeting />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
        <EuiGlobalToastList
          toasts={toasts}
          dismissToast={removeToast}
          toastLifeTimeMs={5000}
        />
      </EuiThemeProvider>
    </EuiProvider>
  );
};

export default App;
