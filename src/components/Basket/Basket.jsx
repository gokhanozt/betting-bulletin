import React, { useState } from "react";
import { useBasket } from "../../context/BasketContext";
import "./Basket.scss";

const Basket = () => {
  const { basket, totalOdds } = useBasket();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleBasket = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className={`basket ${isExpanded ? "expanded" : "minimized"}`}
      onClick={toggleBasket}
    >
      <div className="basket-header">
        <h2>Kupon</h2>
        <span className="total-odds">Toplam Oran: {totalOdds} ₺</span>
      </div>

      {isExpanded && (
        <ul className="basket-list">
          {basket.map((item, index) => (
            <li key={index} className="basket-item">
              <span className="team-name">{item.betName}</span>
              <span className="odds">Oran: {item.option.O} ₺</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Basket;
