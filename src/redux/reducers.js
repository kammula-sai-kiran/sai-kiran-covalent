import { createSlice } from "@reduxjs/toolkit";

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    cryptoData: [],
    previousCryptoData: [],
    bookmarkedCryptoCoins: [],
    bookmarkedCoinsPricesData: [],
    previousBookmarkedCoinsPricesData: [],
  },
  reducers: {
    setCryptoData: (state, action) => {
      state.previousCryptoData = state.cryptoData;
      state.cryptoData = action.payload;
    },
    setBookmarkedCoinsPricesData: (state, action) => {
      state.previousBookmarkedCoinsPricesData = state.bookmarkedCoinsPricesData;
      state.bookmarkedCoinsPricesData = action.payload;
    },
    setBookmarkedCryptoCoins: (state, action) => {
      state.bookmarkedCryptoCoins.push(action.payload);
    },
    unSetBookmarkedCryptoCoins: (state, action) => {
      const newBookmarks = state.bookmarkedCryptoCoins.filter(
        (item) => item !== action.payload
      );
      state.previousBookmarkedCoinsPricesData = state.bookmarkedCoinsPricesData;
      state.bookmarkedCryptoCoins = newBookmarks;
    },
  },
});

export const {
  setCryptoData,
  setBookmarkedCryptoCoins,
  unSetBookmarkedCryptoCoins,
  setBookmarkedCoinsPricesData,
} = cryptoSlice.actions;
export default cryptoSlice.reducer;
