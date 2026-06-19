import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import favoriteReducer from "../features/favoriteSlice";
import reviewReducer from "../features/reviewSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoriteReducer,
    reviews: reviewReducer,
  },
});

export default store;