import React from "react";
import { createRoot } from "react-dom/client"; // TypeScript에서 createRoot 사용
import App from "./App";
import "@elastic/eui/dist/eui_theme_light.json";
import "@elastic/eui/dist/eui_theme_dark.json";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter } from "react-router-dom";

// root element 가져오기 및 타입 체크
const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement); // createRoot를 사용하여 렌더링

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}
