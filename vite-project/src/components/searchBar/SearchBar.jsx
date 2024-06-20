import React, { useState } from 'react';
import Filters from './Filters';
import './SearchBar.css'; // Your SearchBar specific CSS

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: '',
    province: '',
    city: '',
    duration: '',
    allowPet: false,
    allowSmoke: false
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  const handleSearch = () => {
    // Implement your search logic here
    console.log('Search Term:', searchTerm);
    console.log('Filters:', filters);
  };

  return (
    <div className="search-bar">
      <div className="search-input">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search..."
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={toggleFilters}>Filters</button>
      </div>
      {filtersVisible && (
        <Filters
          filters={filters}
          handleFilterChange={handleFilterChange}
        />
      )}
    </div>
  );
};

export default SearchBar;
