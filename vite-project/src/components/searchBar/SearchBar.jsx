import React, { useState } from 'react'
import Filters from './Filters'
import './SearchBar.css'
import Button from '@mui/material/Button'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../themes.jsx'

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

  const clearFilters = () => {
    setTempFilters({
      maxPrice: '',
      province: '',
      city: '',
      startDate: '',
      endDate: '',
      bedroomNum: '',
      bathroomNum: '',
      allowPet: false,
      allowSmoke: false,
      allowParty: false,
      allowWeed: false,
    });
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
        <ThemeProvider theme={theme}>
          <Button color="jet" variant="contained" onClick={performSearch}>
            Search
          </Button>
          <Button color="jet" variant="contained" onClick={toggleFilters}>
            Filters
          </Button>
        </ThemeProvider>
      </div>
      {filtersVisible && (
        <Filters
          tempFilters={tempFilters}
          handleTempFilterChange={handleTempFilterChange}
          applyFilters={applyFilters}
          clearFilters={clearFilters}
        />
      )}
    </div>
  )
}

export default SearchBar
