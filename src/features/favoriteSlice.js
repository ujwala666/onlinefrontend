import { createSlice } from "@reduxjs/toolkit";

const savedFavorites =
  JSON.parse(localStorage.getItem("favorites")) || [];

const initialState = {
  favorites: savedFavorites,
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const project = action.payload;

      const exists = state.favorites.find(
        (item) => item.id === project.id
      );

      if (exists) {
        state.favorites = state.favorites.filter(
          (item) => item.id !== project.id
        );
      } else {
        state.favorites.push(project);
      }

      localStorage.setItem(
        "favorites",
        JSON.stringify(state.favorites)
      );
    },

    clearFavorites: (state) => {
      state.favorites = [];
      localStorage.removeItem("favorites");
    },
  },
});

export const { toggleFavorite, clearFavorites } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;