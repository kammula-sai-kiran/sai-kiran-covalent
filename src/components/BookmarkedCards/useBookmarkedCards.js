import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookmarkedCryptoPrices } from "../../redux/apis";

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



  useEffect(() => {
    const fetchDataPeriodically = () => {
      dispatch(fetchBookmarkedCryptoPrices());
    };

    fetchDataPeriodically();

    const intervalId = setInterval(fetchDataPeriodically, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, bookmarkedCryptoCoins]);

  return {
    getPriceColor,
    bookmarkedCoinsPricesData,
  };
};

export default useBookmarkedCards;
