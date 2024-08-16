import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sign from "./routes/Sign.tsx";
import Config from "./routes/Config.tsx";
import APITest from "./routes/APITest.tsx";
import SWRTest from "./routes/SWRTest.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Config />,
  },
  {
    path: "/sign",
    element: <Sign />,
  },
  {
    path: "/api-test",
    element: <APITest />,
  },
  {
    path: "/swr-test",
    element: <SWRTest />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
