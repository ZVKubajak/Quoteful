import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";

import Home from "./pages/Home.tsx";
import Explore from "./pages/Explore.tsx";
import Create from "./pages/Create.tsx";
import MyQuotes from "./pages/MyQuotes.tsx";
import Support from "./pages/Support.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path: "/my-quotes",
        element: <MyQuotes />,
      },
      {
        path: "/support",
        element: <Support />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
