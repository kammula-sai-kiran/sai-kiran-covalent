import axios from "axios";
import { ALL_CRYPTO_DATA_URL } from "../constants";
import generateRequiredCryptoData from "../utils/generateRequiredCryptoData";
import { setAdditionalCryptoData, setBookmarkedCoinsPricesData, setCryptoData } from "./reducers";
import generateBookmarkedData from "../utils/generateBookmarkedData";

export const fetchCryptoData = () => async (dispatch) => {
    try {
      const response = await axios.get(ALL_CRYPTO_DATA_URL);
      const data = await response.data;
      const allCryptoData = await data.DISPLAY;
      const [cryptoData, additionalCryptoData] = generateRequiredCryptoData(allCryptoData);
  
      dispatch(setCryptoData(cryptoData));
      dispatch(setAdditionalCryptoData(additionalCryptoData));
    } catch (error) {
      console.error(error.message);
    }
  };

  export const fetchBookmarkedCryptoPrices = () => async (dispatch, getState) => {
    const state = getState();
    const { bookmarkedCryptoCoins } = state.crypto;
  
    try {
      const bookMarkedCoinsAsString = bookmarkedCryptoCoins && bookmarkedCryptoCoins.join(",");
      const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${bookMarkedCoinsAsString}&tsyms=USD`;
      if (bookmarkedCryptoCoins?.length) {
        const response = await axios.get(url);
        const data = await response.data;
        const bookmarkedCoinsPricesData = generateBookmarkedData(data);
        dispatch(setBookmarkedCoinsPricesData(bookmarkedCoinsPricesData));
      } else {
        dispatch(setBookmarkedCoinsPricesData([]));
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  