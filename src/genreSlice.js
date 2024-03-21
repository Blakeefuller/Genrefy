import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  genres: [],
};

const genreSlice = createSlice({
  name: "genreSlice",
  initialState,
  reducers: {
    addGenre(state, action) {
      const genre = action.payload;
      state.genres.push({
        genre: genre,
        checked: false,
      });
    },
    removeGenre(state, action) {
      const { genre } = action.payload;
      state.genres = state.genres.filter((g) => g.genre !== genre);
    },
    toggleGenre(state, action) {
      const genre = action.payload
      const foundGenre = state.genres.find(g => g.genre === genre)
      if (foundGenre) {
        foundGenre.checked = !foundGenre.checked
      }
    },
  },
  selectors: {
    getSelectedGenres(sliceState) {
      console.log(sliceState.genres.filter((g) => g.checked == true));
      return sliceState.genres.filter((g) => g.checked == true);
    },
  }
});

export const { addGenre, removeGenre, toggleGenre } = genreSlice.actions;
export const { getSelectedGenres } = genreSlice.selectors;
export const selectGenres = genreSlice.selectSlice
export default genreSlice.reducer;
