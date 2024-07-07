import './Filters.css'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../themes.jsx'
import Button from '@mui/material/Button'

const Filters = ({
  tempFilters,
  handleTempFilterChange,
  applyFilters,
  clearFilters,
}) => {
  return (
    <>
      <div className="filters">
        <div className="filter-section filter-inputs">
          <label>
            Max Price:
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              min={0}
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
        </div>
        <div className="filter-section filter-inputs">
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
          <label>
            End Date:
            <input
              type="text"
              name="endDate"
              placeholder="YYYY-MM-DD"
              value={tempFilters.endDate}
              onChange={handleTempFilterChange}
            />
          </label>
          <label>
            Number of Bedrooms:
            <input
              type="number"
              id="bedroomNum"
              name="bedroomNum"
              min={0}
              value={tempFilters.bedroomNum}
              onChange={handleTempFilterChange}
            />
          </label>
          <label>
            Number of Bathrooms:
            <input
              type="number"
              id="bathroomNum"
              name="bathroomNum"
              min={0}
              value={tempFilters.bathroomNum}
              onChange={handleTempFilterChange}
            />
          </label>
        </div>
        <div className="filter-section filter-checkboxes">
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
          
          <ThemeProvider theme={theme}>
            <div className="button-group">
              <Button
                color="jet"
                variant="contained"
                onClick={clearFilters}
                sx={{ fontSize: '11px' }}
              >
                Clear filters
              </Button>
              <Button
                color="jet"
                variant="contained"
                onClick={applyFilters}
                sx={{ fontSize: '11px' }}
              >
                Apply filters
              </Button>
            </div>
          </ThemeProvider>
        </div>
        <div className="filter-section filter-checkboxes">
            <label>
              <input
                type="checkbox"
                name="furnished"
                checked={tempFilters.furnished}
                onChange={handleTempFilterChange}
              />
              Furnished
            </label>
            <label>
              <input
                type="checkbox"
                name="ac"
                checked={tempFilters.ac}
                onChange={handleTempFilterChange}
              />
              AC
            </label>
            <label>
              <input
                type="checkbox"
                name="heater"
                checked={tempFilters.heater}
                onChange={handleTempFilterChange}
              />
              Heater
            </label>
          </div>
      </div>
    </>
  )
}

export default Filters
