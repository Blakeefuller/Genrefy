import { configureStore } from "@reduxjs/toolkit";
import genreSlice from "./genreSlice";

export const store = configureStore({
  reducer: {
    genres: genreSlice,
  },
});
