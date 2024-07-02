import './Filters.css'

const Filters = ({ tempFilters, handleTempFilterChange, applyFilters }) => {
  return (
    <div className="filters">
      <div className="filter-section filter-inputs">
        <label>
          Max Price:
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            value={tempFilters.maxPrice}
            onChange={handleTempFilterChange}
          />
        </label>
        <label>
          Province:
          <input
            type="text"
            name="province"
            placeholder="ex. BC"
            value={tempFilters.province}
            onChange={handleTempFilterChange}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            placeholder="ex. Vancouver"
            value={tempFilters.city}
            onChange={handleTempFilterChange}
          />
        </label>
        <label>
          Start Date:
          <input
            type="text"
            name="startDate"
            placeholder="YYYY-MM-DD"
            value={tempFilters.startDate}
            onChange={handleTempFilterChange}
          />
        </label>
      </div>
      <div className="filter-section filter-checkboxes">
        
        <label>
          Duration:
          <select
            name="duration"
            value={tempFilters.duration}
            onChange={handleTempFilterChange}
          >
            <option value="">Select Duration</option>
            <option value="less than 3 months">less than 3 months</option>
            <option value="4month">4 months</option>
            <option value="6month">6 months</option>
            <option value="8month">8 months</option>
            <option value="10month">10 months</option>
            <option value="12month">12 months</option>
            <option value="longterm">long term</option>
          </select>
        </label>
        <label>
          Room Type:
          <select
            name="roomType"
            value={tempFilters.roomType}
            onChange={handleTempFilterChange}
          >
            <option value="">Select Room Type</option>
            <option value="Studio">Studio</option>
            <option value="1B1B">1 Bedroom 1 Bathroom</option>
            <option value="2B2B">2 Bedrooms 2 Bathrooms</option>
            <option value="2B1B">2 Bedrooms 1 Bathroom</option>
            <option value="3B+sB">3 Bedrooms Shared Bathroom</option>
            <option value="3B+3B+">3+ Bedrooms 3+ Bathrooms</option>
          </select>
        </label>
        <label>
          <input
            type="checkbox"
            name="allowPet"
            checked={tempFilters.allowPet}
            onChange={handleTempFilterChange}
          />
          Allow Pet
        </label>
        <label>
          <input
            type="checkbox"
            name="allowSmoke"
            checked={tempFilters.allowSmoke}
            onChange={handleTempFilterChange}
          />
          Allow Smoke
        </label>
        <label>
          <input
            type="checkbox"
            name="allowParty"
            checked={tempFilters.allowParty}
            onChange={handleTempFilterChange}
          />
          Allow Party
        </label>
        <label>
          <input
            type="checkbox"
            name="allowWeed"
            checked={tempFilters.allowWeed}
            onChange={handleTempFilterChange}
          />
          Allow Weed
        </label>
      </div>
      <button onClick={applyFilters}>Apply Filters</button>
    </div>
  )
}

export default Filters
