import "./i18n";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
// Entry composes sibling routes; relative imports kept for brevity.
// All cross-folder imports elsewhere use the `@/` alias.
import LangRoot from "./routes/root";
import { AboutMe } from "./routes/about-me";

import { CV } from "./routes/cv";
import { CaseStudies } from "./routes/case-studies";
import { Photos } from "./routes/photos";
import "@mantine/core/styles.css";
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
      { path: "resume", element: <CV /> },
      { path: "case-studies", element: <CaseStudies /> },
      { path: "photos", element: <Photos /> },
      { path: "*", element: <Navigate to="/en/home" replace /> },
    ],
  },
  { path: "*", element: <Navigate to="/en/home" replace /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider
      defaultColorScheme="light"
      theme={{
        primaryColor: "brand",
        primaryShade: { light: 6, dark: 5 },
        colors: {
          brand: [
            "#e1f4f9",
            "#c6e6ef",
            "#9fcfdd",
            "#74b8cb",
            "#4fa5bc",
            "#3699b3",
            "#25889f",
            "#0f768a",
            "#006777",
            "#005866",
          ],
        },
      }}
    >
      <RouterProvider router={router} />
      <Analytics />
    </MantineProvider>
  </StrictMode>,
);
