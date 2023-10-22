import React from "react";
import Table from "react-bootstrap/Table";
import { ListGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";

import CustomModal from "../Modal/Modal";
import { TABLE_COLUMNS } from "../../constants";

import useCryptoTable from "./useCryptoTable";

import "./CryptoTable.css";

const CryptoTable = () => {
  const {
    cryptoData,
    // getPriceColor,
    bookmarkedCryptoCoins,
    handleCheckboxChange,
    handleCoinClick,
    showModal,
    setShowModal,
    modalContent,
    modalTitle,
  } = useCryptoTable();

  return (
    <div>
      <CustomModal
        showModal={showModal}
        setShowModal={setShowModal}
        modalContent={
          <ListGroup>
            {modalContent?.map((item) => (
              <ListGroup.Item key={item.key}>
                {item.key}: {item.value}
              </ListGroup.Item>
            ))}
          </ListGroup>
        }
        modalTitle={modalTitle}
      />
      <Table className="table table-primary table-bordered table-hover">
        <thead>
          <tr>
            {TABLE_COLUMNS.map((columnName) => (
              <th scope="col" key={columnName}>
                {columnName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cryptoData?.map((coinData, i) => (
            <tr key={coinData?.key}>
              <th scope="row">{i + 1}</th>
              <td
                className="coin"
                onClick={() => handleCoinClick(coinData?.key)}
              >
                <img
                  src={coinData?.imageUrl}
                  className="coin-logo"
                  alt={coinData?.key}
                ></img>
                {coinData?.key}
              </td>
              <td
              // className={getPriceColor(coinData?.price, i)}
              >
                {coinData?.price}
              </td>
              <td>{coinData?.updatedTime}</td>
              <td>{coinData?.totalVol}</td>
              <td>{coinData?.directVol}</td>
              <td>{coinData?.topTierVol}</td>
              <td>{coinData?.marketCap}</td>
              <td>
                <Form.Check
                  type="checkbox"
                  checked={bookmarkedCryptoCoins?.includes(coinData?.key)}
                  onChange={() => handleCheckboxChange(coinData?.key)}
                  className="checkbox-cell"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CryptoTable;
