import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Root from "./pages/Root";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreatePlaylist from "./pages/CreatePlaylist";
import ViewPlaylist from "./pages/ViewPlaylist";
import Settings from "./pages/Settings";
import Callback from "./pages/Callback";

import "./index.css";

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "home", element: <Home /> },
        { path: "profile", element: <Profile /> },
        { path: "create-playlist", element: <CreatePlaylist /> },
        { path: "view-playlist", element: <ViewPlaylist /> },
        { path: "settings", element: <Settings /> },
        { path: "callback", element: <Callback /> },
        { index: true, element: <Navigate to="/home" replace /> },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
