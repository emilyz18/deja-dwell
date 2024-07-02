import React, { useState } from 'react'
import Filters from './Filters'
import './SearchBar.css'

const SearchBar = ({ searchTerm, setSearchTerm, filters, setFilters }) => {
  const [filtersVisible, setFiltersVisible] = useState(false)
  const [searchQuery, setSearchQuery] = useState(searchTerm)
  const [tempFilters, setTempFilters] = useState(filters) // Temporary state for filters

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleTempFilterChange = (e) => {
    const { name, value, type, checked } = e.target
    setTempFilters({
      ...tempFilters,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible)
  }

  const performSearch = () => {
    setSearchTerm(searchQuery)
  }

  const applyFilters = () => {
    setFilters(tempFilters) // Apply temporary filters to the main filters state
  }

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
        <Filters
          tempFilters={tempFilters}
          handleTempFilterChange={handleTempFilterChange}
          applyFilters={applyFilters}
        />
      )}
    </div>
  )
}

export default SearchBar
