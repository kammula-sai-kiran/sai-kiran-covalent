import React from 'react';
import CryptoTable from '../../components/CryptoTable/CryptoTable';
import BookmarkedCards from '../../components/BookmarkedCards/BookmarkedCards';

const HomePage = () => {
    return (
        <div>
            <BookmarkedCards />
            <CryptoTable />
        </div>

    )
};

export default HomePage