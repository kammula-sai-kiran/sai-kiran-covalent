import React from 'react';
import CustomCard from '../Card';
import './BookmarkedCards.css';
import useBookmarkedCards from './useBookmarkedCards';
import { NO_BOOKMARKS, YOUR_BOOKMARKS } from '../../constants';

const BookmarkedCards = () => {
  const { bookmarkedCoinsPricesData, getPriceColor } = useBookmarkedCards();

  return (
    <div className="bookmarks">
      <div className="bookmark-title">{YOUR_BOOKMARKS}</div>
      <div className="bookmark-cards">
        {bookmarkedCoinsPricesData?.length
          ? bookmarkedCoinsPricesData?.map((item) => (
              <CustomCard
                key={item[0]}
                cardData={`${item[0]} : ${item[1]}$`}
                variant={getPriceColor(item)}
              />
            ))
          : NO_BOOKMARKS}
      </div>
    </div>
  );
};

export default BookmarkedCards;
