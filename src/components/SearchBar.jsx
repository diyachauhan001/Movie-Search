import React from 'react';

function SearchBar({ setSearchTerm }) {
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for a movie..."
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;