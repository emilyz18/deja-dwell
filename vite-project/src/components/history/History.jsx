import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MatchItem from './MatchItem'
import { ExpandedPropertyCard } from '../expandedPropertyCard/ExpandedPropertyCard.jsx'

import './History.css'
import { getPropertiesAsync } from '../../redux/properties/thunks'
import { getTenantMatchesAsync } from '../../redux/matches/matchThunks'

function History({ tenantId }) {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
  const [popupVisible, setPopupVisible] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const getPropertiesStatus = useSelector((state) => state.properties.getProperties)
  const getTenantMatchesStatus = useSelector((state) => state.matches.getTenantMatches)
  const tenantID = user.TenantID;

  useEffect(() => {
    if (getPropertiesStatus === 'IDLE' || getTenantMatchesStatus === 'IDLE') {
      dispatch(getPropertiesAsync());
      dispatch(getTenantMatchesAsync(tenantID));
    }
  }, [getPropertiesStatus, getTenantMatchesStatus, dispatch])
  const allProperties = useSelector((state) => state.properties.list)
  const matches = useSelector((state) => state.matches.tenantMatches)

  const displayPopup = (match) => {
    const currentProperty = allProperties.find(
      (property) => property.HouseID == match.HouseID
    )

    setSelectedProperty(currentProperty)
    setPopupVisible(true)
  }

  const closePopup = () => {
    setPopupVisible(false)
    setSelectedProperty(null)
  }

  return (
    <div className="history-container">
      <div className="match-list">
        {matches.map((match) => (
          <MatchItem
            key={match.MatchID}
            match={match}
            displayPopup={() => displayPopup(match)}
          />
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
  )
}

export default History
