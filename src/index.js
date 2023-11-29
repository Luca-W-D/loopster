import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

import "./index.css";

// Routing managment
import Core from "./routes/Core";
import ErrorPage from "./routes/ErrorPage";
import Welcome from "./routes/Welcome";
import LinkAccount from "./routes/LinkAccount";
import Dashboard from "./routes/Dashboard";
import Help from "./routes/Help";

// Token management
import { tokenManager } from "./managers/TokenManager";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Core />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: "/link",
        element: <LinkAccount />,
        loader: async () => {
          const response = await tokenManager.isReady();
          if (response) return redirect("/dashboard");
          return null;
        },
      },
      {
        path: "/link/example",
        element: <LinkAccount example={true} />,
        loader: async () => {
          const response = await tokenManager.isReady();
          if (response) return redirect("/dashboard");
          return null;
        },
      },
      {
        path: "/redirect",
        element: <></>,
        loader: async () => {
          localStorage.removeItem("tutorialPrompted");
          const urlParams = new URLSearchParams(window.location.search);
          let code = urlParams.get("code");
          await tokenManager.setCode(code);
          const success = await tokenManager.isReady();
          if (success) return redirect("/dashboard");
          return redirect("/error");
        },
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        loader: async () => {
          const response = await tokenManager.isReady();
          if (!response) return redirect("/link");
          return null;
        },
      },
      {
        path: "/help",
        element: <Help />,
      },
      {
        path: "/error",
        element: <ErrorPage />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
