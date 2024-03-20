import React, { useEffect, useState } from "react";
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
import { Provider, useDispatch } from 'react-redux'

import "./index.css";

import { store } from "./store";
import genreReducer, { addGenre } from "./genreSlice";

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
        { path: "view-playlist/:id", element: <ViewPlaylist />},
        { path: "settings", element: <Settings /> },
        { path: "callback", element: <Callback /> },
        { index: true, element: <Navigate to="/home" replace /> },
      ],
    },
  ]);
  const dispatch = useDispatch()

  useEffect(() => {
    // hard coded genres users can choose from
    const allGenres = ["pop", "rnb", "dinner", "party", "jazz", "rock", "hiphop", "country", "workout", "latin", "disney", "indie"]
    // add All Genres to our slice
    allGenres.forEach((item) =>  ( dispatch(addGenre(item))  ) )
    // dispatch(addGenre("joemama"))
  }, [dispatch])

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  // {/* </React.StrictMode> */}
);
