import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // 확장자는 명시하지 않아도 됩니다.
import './index.css';
import "@elastic/eui/dist/eui_theme_light.json";
import "@elastic/eui/dist/eui_theme_dark.json";

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
