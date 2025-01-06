import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import { AboutMe } from "./routes/about-me";
import { Home } from "./routes/home";
import { CV } from "./routes/cv";
import { Photos } from "./routes/photos";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "about-me",
        element: <AboutMe />,
      },
      {
        path: "cv",
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
    <RouterProvider router={router} />
  </StrictMode>
);
