import { createSlice } from "@reduxjs/toolkit";

const savedReviews =
  JSON.parse(localStorage.getItem("reviews")) || [];

const initialState = {
  reviews: savedReviews,
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    addReview: (state, action) => {
      state.reviews.push(action.payload);

      localStorage.setItem(
        "reviews",
        JSON.stringify(state.reviews)
      );
    },

    updateReview: (state, action) => {
      const { id, updatedReview } = action.payload;

      state.reviews = state.reviews.map((review) =>
        review.id === id
          ? { ...review, ...updatedReview }
          : review
      );

      localStorage.setItem(
        "reviews",
        JSON.stringify(state.reviews)
      );
    },

    deleteReview: (state, action) => {
      state.reviews = state.reviews.filter(
        (review) => review.id !== action.payload
      );

      localStorage.setItem(
        "reviews",
        JSON.stringify(state.reviews)
      );
    },

    clearReviews: (state) => {
      state.reviews = [];

      localStorage.removeItem("reviews");
    },
  },
});

export const {
  addReview,
  updateReview,
  deleteReview,
  clearReviews,
} = reviewSlice.actions;

export default reviewSlice.reducer;