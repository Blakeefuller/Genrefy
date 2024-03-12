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

import "./index.css";

const queryClient = new QueryClient();

/*const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            { path: "fetch-search", element: <FetchSearch /> },
            { path: "fetch-post", element: <FetchPost /> },
            { path: "query-search", element: <QuerySearch /> },
            { path: "query-post", element: <QueryPost /> },
            {
                path: "org-repos/:org",
                element: <RouterOrgRepos />,
                loader: orgLoader
            },
            {
                path: "router-post",
                element: <RouterPost />,
                action: postAction
            },
            { index: true, element: <Navigate to="/fetch-search" replace /> }
        ]
    }
])*/

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
      { index: true, element: <Navigate to="/home" replace /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
