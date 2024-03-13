import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

import Root from "./pages/Root";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import CreatePlaylist from "./pages/CreatePlaylist";
import ViewPlaylist from "./pages/ViewPlaylist";
import Settings from "./pages/Settings";

import "./index.css";

const queryClient = new QueryClient();

function App() {
  //used to pass accessToken into any page
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const response = await axios.get("/api/spotify-token");
        setAccessToken(response.data.accessToken);
      } catch (error) {
        console.error("Error fetching Spotify access token:", error);
      }
    };

    fetchAccessToken();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "home", element: <Home /> },
        { path: "profile", element: <Profile accessToken={accessToken} /> },
        { path: "create-playlist", element: <CreatePlaylist /> },
        { path: "view-playlist", element: <ViewPlaylist /> },
        { path: "settings", element: <Settings /> },
        { index: true, element: <Navigate to="/home" replace /> },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  );
}


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
