import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genres: [],
};

const genreSlice = createSlice({
  name: "genres",
  initialState,
  reducers: {
    addGenre(state, action) {
      const { genre } = action.payload;
      state.genres.push(genre);
    },
    removeGenre(state, action) {
      const { genre } = action.payload;
      state.genres = state.genres.filter((g) => g !== genre);
    },
  },
});

export const { addGenre, removeGenre } = genreSlice.actions;

export default genreSlice.reducer;
