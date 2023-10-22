import { useEffect, useCallback } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setBookmarkedCoinsPricesData } from "../../redux/reducers";
import generateBookmarkedData from "../../utils/generateBookmarkedData";

const useBookmarkedCards = () => {
  const dispatch = useDispatch();
  const bookmarkedCryptoCoins = useSelector(
    (s) => s.crypto.bookmarkedCryptoCoins
  );
  const previousBookmarkedCoinsPricesData = useSelector(
    (s) => s.crypto.previousBookmarkedCoinsPricesData
  );
  const bookmarkedCoinsPricesData = useSelector(
    (s) => s.crypto.bookmarkedCoinsPricesData
  );

  const getPriceColor = (item) => {
    const conditionToFind = (arr) => arr.includes(item?.[0]);
    const foundArray = previousBookmarkedCoinsPricesData.find(conditionToFind);
    if (foundArray) {
      if (foundArray?.[1] < item[1]) return "price-increase";
      if (foundArray?.[1] > item[1]) return "price-decrease";
      else return "price-nochange";
    } else return "price-nochange";
  };

  const fetchCryptoPrices = useCallback(async () => {
    try {
      const bookMarkedCoinsAsString =
        bookmarkedCryptoCoins && bookmarkedCryptoCoins.join(",");
      const url = `https://min-api.cryptocompare.com/data/pricemulti?fsyms=${bookMarkedCoinsAsString}&tsyms=USD`;
      if (bookmarkedCryptoCoins?.length) {
        const response = await axios.get(url);
        const data = await response.data;
        const bookmarkedCoinsPricesData = generateBookmarkedData(data);
        dispatch(setBookmarkedCoinsPricesData(bookmarkedCoinsPricesData));
      } else dispatch(setBookmarkedCoinsPricesData([]));
    } catch (error) {
      console.error(error.message);
    }
  }, [bookmarkedCryptoCoins, dispatch]);

  useEffect(() => {
    const fetchDataPeriodically = () => {
      fetchCryptoPrices();
    };

    fetchDataPeriodically();

    const intervalId = setInterval(fetchDataPeriodically, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [bookmarkedCryptoCoins, fetchCryptoPrices]);

  return {
    getPriceColor,
    bookmarkedCoinsPricesData,
    fetchCryptoPrices,
  };
};

export default useBookmarkedCards;
