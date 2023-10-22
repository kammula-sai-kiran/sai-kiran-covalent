// useCryptoData.js
import {  useEffect, useCallback } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import generateRequiredCryptoData from '../../utils/generateRequiredCryptoData';
import {
  setCryptoData,
  setBookmarkedCryptoCoins,
  unSetBookmarkedCryptoCoins,
} from '../../redux/reducers';
import { ALL_CRYPTO_DATA_URL } from '../../constants';

const useCryptoTable = () => {
  const cryptoData = useSelector((s) => s.crypto.cryptoData);
  const previousCryptoData = useSelector((s) => s.crypto.previousCryptoData);
  const bookmarkedCryptoCoins = useSelector((s) => s.crypto.bookmarkedCryptoCoins);
  const dispatch = useDispatch();

  const handleCheckboxChange = (cryptoCoin) => {
    if (bookmarkedCryptoCoins?.includes(cryptoCoin))
      dispatch(unSetBookmarkedCryptoCoins(cryptoCoin));
    else dispatch(setBookmarkedCryptoCoins(cryptoCoin));
  };

  const getPriceColor = (currentPrice, i) => {
    if (previousCryptoData[i]?.price < currentPrice) return 'table-success';
    if (previousCryptoData[i]?.price > currentPrice) return 'table-danger';
    if (previousCryptoData[i]?.price === currentPrice) return 'table-primary';
  };

  const fetchCryptoData = useCallback(async () => {
    try {
      const response = await axios.get(ALL_CRYPTO_DATA_URL);
      const data = await response.data;
      const allCryptoData = await data.DISPLAY;
      const cryptoData = generateRequiredCryptoData(allCryptoData);
      dispatch(setCryptoData(cryptoData));
    } catch (error) {
      console.error(error.message);
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchDataPeriodically = () => {
      fetchCryptoData();
    };

    fetchDataPeriodically();

    const intervalId = setInterval(fetchDataPeriodically, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchCryptoData]);

  return {
    cryptoData,
    getPriceColor,
    bookmarkedCryptoCoins,
    handleCheckboxChange,
  };
};

export default useCryptoTable;
