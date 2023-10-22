import { createSlice } from "@reduxjs/toolkit";

const cryptoSlice = createSlice({
  name: "crypto",
  initialState: {
    cryptoData: [],
    previousCryptoData: [],
    bookmarkedCryptoCoins: [],
    bookmarkedCoinsPricesData: [],
    previousBookmarkedCoinsPricesData: [],
    additionalCryptoData: [],
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
    setAdditionalCryptoData: (state, action) => {
      state.additionalCryptoData = action.payload;
    },
  },
});

export const {
  setCryptoData,
  setBookmarkedCryptoCoins,
  unSetBookmarkedCryptoCoins,
  setBookmarkedCoinsPricesData,
  setAdditionalCryptoData,
} = cryptoSlice.actions;
export default cryptoSlice.reducer;
