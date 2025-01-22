import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import App from "./App.tsx";
import { AuthGuard, LoggedInAuth } from "./auth/AuthGuard.tsx";

import Home from "./pages/Home.tsx";
import Explore from "./pages/Explore.tsx";
import Create from "./pages/Create.tsx";
import Generate from "./pages/subCreate/Generate.tsx";
import Write from "./pages/subCreate/Write.tsx";
import MyQuotes from "./pages/MyQuotes.tsx";
import Support from "./pages/Support.tsx";
import Login from "./pages/Login.tsx";
import SignUp from "./pages/Signup.tsx";

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
        path: "/create/generate",
        element: (
          <AuthGuard>
            <Generate />
          </AuthGuard>
        ),
      },
      {
        path: "/create/write",
        element: (
          <AuthGuard>
            <Write />
          </AuthGuard>
        ),
      },
      {
        path: "/my-quotes",
        element: (
          <AuthGuard>
            <MyQuotes />
          </AuthGuard>
        ),
      },
      {
        path: "/support",
        element: (
          <AuthGuard>
            <Support />
          </AuthGuard>
        ),
      },
      {
        path: "/login",
        element: (
          <LoggedInAuth>
            <Login />
          </LoggedInAuth>
        ),
      },
      {
        path: "/signup",
        element: (
          <LoggedInAuth>
            <SignUp />
          </LoggedInAuth>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
