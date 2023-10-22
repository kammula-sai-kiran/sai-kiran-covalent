import React from 'react';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import useCryptoTable from './useCryptoTable'; // Import the custom hook
import { TABLE_COLUMNS } from '../../constants';
import './CryptoTable.css'

const CryptoTable = () => {
  const {
    cryptoData,
    getPriceColor,
    bookmarkedCryptoCoins,
    handleCheckboxChange,
  } = useCryptoTable(); // Use the custom hook

  return (
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
            <td className="coin">
              <img
                src={coinData?.imageUrl}
                className="coin-logo"
                alt={coinData?.key}
              ></img>
              {coinData?.key}
            </td>
            <td className={getPriceColor(coinData?.price, i)}>
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
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CryptoTable;
