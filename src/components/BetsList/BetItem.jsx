import React from "react";
import { useBasket } from "../../context/BasketContext";

const BetItem = ({ bet }) => {
  const { basket, addBet, removeBet } = useBasket();

  const isOptionSelected = (betId, optionId) => {
    return basket.some(
      (item) => item.betId === betId && item.option.ID === optionId
    );
  };

  const handleBetClick = (betId, option, betName) => {
    if (isOptionSelected(betId, option.ID)) {
      removeBet(betId, option.ID);
    } else {
      addBet(betId, option, betName);
    }
  };

  const renderBetOption = (betId, option, betName) => {
    const isEmpty = !option?.O;
    return (
      <td
        className={`bet-option ${
          isOptionSelected(betId, option?.ID) ? "selected" : ""
        } ${isEmpty ? "disabled" : ""}`}
        onClick={isEmpty ? null : () => handleBetClick(betId, option, betName)}
      >
        {option?.O || ""}
      </td>
    );
  };

  const renderFirstRow = () => (
    <tr className="bet-item">
      <td colSpan="3">
        {bet.D} {bet.DAY} {bet.LN}
      </td>
      <td>Yorumlar</td>
      <td></td>
      <td>1</td>
      <td>X</td>
      <td>2</td>
      <td>Alt</td>
      <td>Üst</td>
      <td>H1</td>
      <td>1</td>
      <td>X</td>
      <td>2</td>
      <td>H2</td>
      <td>1-X</td>
      <td>1-2</td>
      <td>X-2</td>
      <td>Var</td>
      <td>Yok</td>
      <td>+99</td>
    </tr>
  );

  const renderSecondRow = () => (
    <tr className="bet-item">
      <td colSpan="3">
        <span className="bet-code">{bet.C}</span> {bet.T} {bet.N}
      </td>
      <td>Yorumlar</td>
      <td>{bet.OCG["1"]?.MBS || "-"}</td>
      {renderBetOption(bet.C, bet.OCG["1"]?.OC["0"], bet.N)}
      {renderBetOption(bet.C, bet.OCG["1"]?.OC["1"], bet.N)}
      {renderBetOption(bet.C, bet.OCG["1"]?.OC["2"], bet.N)}
      {renderBetOption(bet.C, bet.OCG["5"]?.OC["25"], bet.N)}
      {renderBetOption(bet.C, bet.OCG["5"]?.OC["26"], bet.N)}
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      {renderBetOption(bet.C, bet.OCG["2"]?.OC["3"], bet.N)}
      {renderBetOption(bet.C, bet.OCG["2"]?.OC["4"], bet.N)}
      {renderBetOption(bet.C, bet.OCG["2"]?.OC["5"], bet.N)}
      <td></td>
      <td></td>
      <td
        className={`bet-option ${
          isOptionSelected(bet.C, "+99") ? "selected" : ""
        }`}
        onClick={() => handleBetClick(bet.C, { ID: "+99", O: "3" }, bet.N)}
      >
        3
      </td>
    </tr>
  );

  return (
    <>
      {renderFirstRow()}
      {renderSecondRow()}
    </>
  );
};

export default BetItem;
