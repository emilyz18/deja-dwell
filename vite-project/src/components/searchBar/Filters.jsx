import React from 'react'
import './Filters.css' // Filters specific CSS

const Filters = ({ filters, handleFilterChange }) => {
    console.log("start date")
    console.log(filters.startDate)

  return (
    <div className="filters">
      <div className="filter-section filter-inputs">
        <label>
          Max Price:
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Province:
          <input
            type="text"
            name="province"
            placeholder="ex. BC"
            value={filters.province}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            placeholder="ex. Vancouver"
            value={filters.city}
            onChange={handleFilterChange}
          />
        </label>

        <label>
          Start Date:
          <input
            type="text"
            name="startDate"
            placeholder="YYYY-MM-DD"
            value={filters.startDate}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          Duration:
          <select
            name="duration"
            value={filters.duration}
            onChange={handleFilterChange}
          >
            <option value="">Select Duration</option>
            <option value="less than 3 months">less than 3 months</option>
            <option value="4 months">4 months</option>
            <option value="6 months">6 months</option>
            <option value="8 months">8 months</option>
            <option value="10 months">10 months</option>
            <option value="12 months">12 months</option>
            <option value="long term">long term</option>

          </select>
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
        <label>
          <input
            type="checkbox"
            name="allowParty"
            checked={filters.allowParty}
            onChange={handleFilterChange}
          />
          Allow Party
        </label>
        <label>
          <input
            type="checkbox"
            name="allowWeed"
            checked={filters.allowWeed}
            onChange={handleFilterChange}
          />
          Allow Weed
        </label>
      </div>
    </div>
  )
}

export default Filters
