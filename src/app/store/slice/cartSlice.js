import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  loading: false,
  error: null,
  searchData: [],
  removeCart: false,
  removeWish: false,
  loginPopup: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    updateCart: (state, action) => {
      state.cart = action.payload;
    },
    updateWishlist: (state, action) => {
      state.cart = action.payload;
    },
    updateProfileImage: (state, action) => {
      state.profileImage = action.payload;
    },
    removeCart: (state, action) => {
      state.cart = [];
      state.removeCart = action.payload; // Set removeCart flag
    },
    removeWishlist: (state, action) => {
      state.cart = [];
      state.removeWish = action.payload; // Set removeWish flag
    },
    loginPopup: (state, action) => {
      state.loginPopup = action.payload; // Set loginPopup flag
    },
  },
});

export const {
  updateCart,
  updateWishlist,
  updateProfileImage,
  removeCart,
  removeWishlist,
  loginPopup
} = cartSlice.actions;

export default cartSlice.reducer;
