import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./fonts/silka-regular-webfont.woff2";
import { RecoilRoot } from "recoil";
import { Analytics } from "@vercel/analytics/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RecoilRoot>
    <App />
    <Analytics />
  </RecoilRoot>
);
