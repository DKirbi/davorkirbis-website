import "./i18n";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import Root from "./routes/root";
import { AboutMe } from "./routes/about-me";

import { CV } from "./routes/cv";
import { Photos } from "./routes/photos";
import "@mantine/core/styles.css";
import { Analytics } from "@vercel/analytics/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <AboutMe />,
      },

      {
        path: "resume",
        element: <CV />,
      },
      {
        path: "photos",
        element: <Photos />,
      },
    ],
  },
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
