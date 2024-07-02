import React, { useState } from 'react'
import Filters from './Filters'
import './SearchBar.css'

const SearchBar = ({ searchTerm, setSearchTerm, filters, setFilters }) => {
  const [filtersVisible, setFiltersVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState(searchTerm);


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  }

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible)
  }

  const performSearch = () => {
    setSearchTerm(searchQuery);
  };

  return (
    <div className="search-bar">
      <div className="search-input">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
        />
        <button onClick={performSearch}>Search</button>
        <button onClick={toggleFilters}>Filters</button>
      </div>
      {filtersVisible && (
        <Filters filters={filters} handleFilterChange={handleFilterChange} />
      )}
    </div>
  )
}

export default SearchBar
