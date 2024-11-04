import React, { useState, useMemo } from "react";
import useFetchBets from "../../hooks/useFetchBets";
import BetItem from "./BetItem";
import SearchBar from "./SearchBar";
import Pagination from "./Pagination";
import "./BetsList.scss";

const PAGE_SIZE = 50;

const BetsList = () => {
  const { bets, loading, error } = useFetchBets();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBets = useMemo(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return bets.filter(
      (bet) =>
        bet.N.toLowerCase().includes(lowerCaseSearchTerm) ||
        bet.LN.toLowerCase().includes(lowerCaseSearchTerm) ||
        bet.C.toString().includes(lowerCaseSearchTerm)
    );
  }, [bets, searchTerm]);

  const pageData = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    return filteredBets.slice(startIndex, startIndex + PAGE_SIZE);
  }, [filteredBets, currentPage]);

  const totalPages = Math.ceil(filteredBets.length / PAGE_SIZE);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  if (loading)
    return (
      <div className="loadingWrapper">
        <p>Loading...</p>
        <span className="loader"></span>
      </div>
    );
  if (error) return <p>Error: {error}</p>;
  if (!bets || bets.length === 0) return <p>No bets available</p>;

  return (
    <div className="bets-table-wrapper">
      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      <table className="bets-table">
        <thead>
          <tr>
            <th colSpan="3">Event Count: {bets.length}</th>
            <th>Yorumlar</th>
            <th>MBS</th>
            <th>1</th>
            <th>X</th>
            <th>2</th>
            <th>Alt</th>
            <th>Üst</th>
            <th>H1</th>
            <th>1</th>
            <th>X</th>
            <th>2</th>
            <th>H2</th>
            <th>1-X</th>
            <th>1-2</th>
            <th>X-2</th>
            <th>Var</th>
            <th>Yok</th>
            <th>+99</th>
          </tr>
        </thead>
        <tbody>
          {pageData.map((bet) => (
            <BetItem key={bet.C} bet={bet} />
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default BetsList;
