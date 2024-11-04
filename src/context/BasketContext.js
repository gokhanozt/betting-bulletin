import React, { createContext, useContext, useState, useEffect } from "react";

const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem("basket"));
    if (storedBasket) {
      setBasket(storedBasket);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  const addBet = (betId, option, betName) => {
    setBasket((prevBasket) => {
      const updatedBasket = prevBasket.filter((item) => item.betId !== betId);
      return [...updatedBasket, { betId, option, betName }];
    });
  };

  const removeBet = (betId, optionId) => {
    setBasket((prevBasket) =>
      prevBasket.filter(
        (item) => item.betId !== betId || item.option.ID !== optionId
      )
    );
  };

  const totalOdds = basket
    .reduce((acc, item) => acc * parseFloat(item.option.O), 1)
    .toFixed(2);

  return (
    <BasketContext.Provider value={{ basket, addBet, removeBet, totalOdds }}>
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => useContext(BasketContext);
