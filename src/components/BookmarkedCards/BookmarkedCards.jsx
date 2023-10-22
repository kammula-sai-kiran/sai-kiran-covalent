import React from "react";

import CustomCard from "../Card";
import { NO_BOOKMARKS, YOUR_BOOKMARKS } from "../../constants";
import ArrowIcon from "../../assets/ArrowIcon";

import useBookmarkedCards from "./useBookmarkedCards";
import "./BookmarkedCards.css";

const BookmarkedCards = () => {
  const { bookmarkedCoinsPricesData, getPriceColor } = useBookmarkedCards();

  return (
    <div className="bookmarks">
      <div className="bookmark-title">{YOUR_BOOKMARKS}</div>
      <div className="bookmark-cards">
        {bookmarkedCoinsPricesData?.length ? (
          bookmarkedCoinsPricesData?.map((item) => (
            <CustomCard
              key={item[0]}
              cardData={
                <div className="price">
                  {item[0]} : ${item[1]}
                  {getPriceColor(item) !== "price-nochange" ? (
                    <ArrowIcon
                      direction={
                        getPriceColor(item) === "price-increase" ? "up" : "down"
                      }
                    />
                  ) : null}
                </div>
              }
              variant={getPriceColor(item)}
            />
          ))
        ) : (
          <div className="no-bookmarks">{NO_BOOKMARKS}</div>
        )}
      </div>
    </div>
  );
};

export default BookmarkedCards;
