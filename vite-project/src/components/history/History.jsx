// History.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMatchesAsync } from '../../redux/matches/matchThunks';
import MatchItem from './MatchItem';
import { ExpandedPropertyCard } from '../expandedPropertyCard/expandedPropertyCard';
import { getPropertiesAsync } from '../../redux/properties/thunks';

import './History.css';

function History({ tenantId }) {

    const [popupVisible, setPopupVisible] = useState(false)
    const [selectedProperty, setSelectedProperty] = useState(null)
    const allProperties = useSelector((state) => state.properties.list);

  const matches = useSelector((state) => state.matches.list);

  // Filter matches based on tenantId
  const filteredMatches = matches.filter((match) => match.TenantID === tenantId);

  const displayPopup = (match) => {
    console.log("click popup")
    const currentProperty = allProperties.find((property) => property.HouseID == match.HouseID);

    setSelectedProperty(currentProperty)
    setPopupVisible(true)
  }

  const closePopup = () => {
    setPopupVisible(false)
    setSelectedProperty(null)
  }

  console.log(selectedProperty)
  return (
    <div className="history-container">
      <div className="match-list">
        {filteredMatches.map((match) => (
          <MatchItem key={match.MatchID} match={match} displayPopup={() => displayPopup(match)} />
        ))}
      </div>

      {popupVisible && (
        <div className="property-popup-background" onClick={closePopup}>
          <div className="property-popup" onClick={(e) => e.stopPropagation()}>
            <ExpandedPropertyCard propertyInfo={selectedProperty} />
          </div>
        </div>
      )}
    </div>
  );
}

export default History;
