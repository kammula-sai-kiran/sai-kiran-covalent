import React from "react";

import CryptoTable from "../../components/CryptoTable";
import BookmarkedCards from "../../components/BookmarkedCards";

const HomePage = () => {
  return (
    <div>
      <BookmarkedCards />
      <CryptoTable />
    </div>
  );
};

export default HomePage;
