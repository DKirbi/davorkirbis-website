import "./i18n";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/tokens.css";
import "./index.scss";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { ColorSchemeProvider } from "@/lib/color-scheme";
// Entry composes sibling routes; relative imports kept for brevity.
// All cross-folder imports elsewhere use the `@/` alias.
import LangRoot from "./routes/root";
import { AboutMe } from "./routes/about-me";

import { CV } from "./routes/cv";
import { Work } from "./routes/work";
import { Photos } from "./routes/photos";
import { Analytics } from "@vercel/analytics/react";

// Routing: every page lives under `/:lang/...` so URLs are shareable. The
// default language is `en`; bare `/`, unknown paths, and unsupported `:lang`
// values all redirect to `/en/home`. `LangRoot` validates `:lang` and syncs
// `i18n.language` with the URL — see `src/routes/root.tsx`.
const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/en/home" replace /> },
  {
    path: "/:lang",
    element: <LangRoot />,
    children: [
      { index: true, element: <Navigate to="home" replace /> },
      { path: "home", element: <AboutMe /> },
      { path: "work", element: <Work /> },
      { path: "resume", element: <CV /> },
      { path: "photos", element: <Photos /> },
      { path: "*", element: <Navigate to="/en/home" replace /> },
    ],
  },
  { path: "*", element: <Navigate to="/en/home" replace /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ColorSchemeProvider>
      <RouterProvider router={router} />
      <Analytics />
    </ColorSchemeProvider>
  </StrictMode>,
);
