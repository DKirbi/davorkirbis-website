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
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  </StrictMode>,
);
