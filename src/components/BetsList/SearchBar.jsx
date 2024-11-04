import React, { useState, useEffect } from "react";

const SearchBar = ({ searchTerm, onSearchChange }) => {
  const [value, setValue] = useState(searchTerm);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(value);
    }, 300);

    return () => clearTimeout(timer);
  }, [value, onSearchChange]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Takım, Lig adı veya Maç koduna göre ara..."
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
