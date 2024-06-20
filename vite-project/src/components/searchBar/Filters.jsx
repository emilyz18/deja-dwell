import React from 'react'
import './Filters.css' // Filters specific CSS

const Filters = ({ filters, handleFilterChange }) => {
  return (
    <div className="filters">
      <div className="filter-section filter-inputs">
        <label>
          Max Price:
          <input
            type="text"
            id="maxPrice"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
          />
        </label>
        <label htmlFor="minPrice">Min Price:
        <input
          type="text"
          id="minPrice"
          name="minPrice"
          value={filters.minPrice}
          onChange={handleFilterChange}
        />
        </label>
        <label>
          Province:
          <input
            type="text"
            name="province"
            value={filters.province}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={filters.city}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Duration:
          <input
            type="text"
            name="duration"
            value={filters.duration}
            onChange={handleFilterChange}
          />
        </label>
      </div>

      <div className="filter-section filter-checkboxes">
        <label>
          <input
            type="checkbox"
            name="allowPet"
            checked={filters.allowPet}
            onChange={handleFilterChange}
          />
          Allow Pet
        </label>
        <label>
          <input
            type="checkbox"
            name="allowSmoke"
            checked={filters.allowSmoke}
            onChange={handleFilterChange}
          />
          Allow Smoke
        </label>
      </div>
    </div>
  )
}

export default Filters
