import { useEffect, useCallback, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import generateRequiredCryptoData from "../../utils/generateRequiredCryptoData";
import {
  setCryptoData,
  setBookmarkedCryptoCoins,
  unSetBookmarkedCryptoCoins,
  setAdditionalCryptoData,
} from "../../redux/reducers";
import { ALL_CRYPTO_DATA_URL, MODAL_TITLE_CONSTANT } from "../../constants";
import generateModalContent from "../../utils/generateModalContent";

const useCryptoTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [modalTitle, setModalTitle] = useState("");
  const cryptoData = useSelector((s) => s.crypto.cryptoData);
  const previousCryptoData = useSelector((s) => s.crypto.previousCryptoData);
  const bookmarkedCryptoCoins = useSelector(
    (s) => s.crypto.bookmarkedCryptoCoins
  );
  const additionalCryptoData = useSelector(
    (s) => s.crypto.additionalCryptoData
  );

  const dispatch = useDispatch();

  const handleCoinClick = (coinKey) => {
    setShowModal(true);
    setModalContent(generateModalContent(additionalCryptoData[coinKey]));
    setModalTitle(`${MODAL_TITLE_CONSTANT} ${coinKey}`);
  };

  const handleCheckboxChange = (cryptoCoin) => {
    if (bookmarkedCryptoCoins?.includes(cryptoCoin))
      dispatch(unSetBookmarkedCryptoCoins(cryptoCoin));
    else dispatch(setBookmarkedCryptoCoins(cryptoCoin));
  };

  const getPriceColor = (currentPrice, i) => {
    if (previousCryptoData[i]?.price < currentPrice) return "table-success";
    if (previousCryptoData[i]?.price > currentPrice) return "table-danger";
    if (previousCryptoData[i]?.price === currentPrice) return "table-primary";
  };

  const fetchCryptoData = useCallback(async () => {
    try {
      const response = await axios.get(ALL_CRYPTO_DATA_URL);
      const data = await response.data;
      const allCryptoData = await data.DISPLAY;
      const [cryptoData, additionalCryptoData] =
        generateRequiredCryptoData(allCryptoData);
      dispatch(setCryptoData(cryptoData));
      dispatch(setAdditionalCryptoData(additionalCryptoData));
    } catch (error) {
      console.error(error.message);
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchDataPeriodically = () => {
      fetchCryptoData();
    };

    fetchDataPeriodically();

    const intervalId = setInterval(fetchDataPeriodically, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchCryptoData]);

  return {
    cryptoData,
    getPriceColor,
    bookmarkedCryptoCoins,
    handleCheckboxChange,
    handleCoinClick,
    showModal,
    setShowModal,
    modalContent,
    modalTitle,
  };
};

export default useCryptoTable;
