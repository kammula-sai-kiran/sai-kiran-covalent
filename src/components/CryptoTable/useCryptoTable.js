import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setBookmarkedCryptoCoins,
  unSetBookmarkedCryptoCoins,
} from "../../redux/reducers";
import {  MODAL_TITLE_CONSTANT } from "../../constants";
import generateModalContent from "../../utils/generateModalContent";
import { fetchCryptoData } from "../../redux/apis";

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

  useEffect(() => {
    const fetchDataPeriodically = () => {
      dispatch(fetchCryptoData());
    };

    fetchDataPeriodically();

    const intervalId = setInterval(fetchDataPeriodically, 60000);
    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch]);

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
