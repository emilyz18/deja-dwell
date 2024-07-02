// MatchItem.jsx
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPropertiesAsync } from '../../redux/properties/thunks'

import './MatchItem.css' // Ensure you have this file for styling

function MatchItem({ match }) {
  const dispatch = useDispatch()
  const getPropertiesStatus = useSelector(
    (state) => state.properties.getProperties
  )

  const allProperties = useSelector((state) => state.properties.list)

  console.log(allProperties)
  useEffect(() => {
    if (getPropertiesStatus === 'IDLE') {
      dispatch(getPropertiesAsync())
    }
  }, [getPropertiesStatus])

  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied':
        return 'applied'
      case 'Disliked':
        return 'disliked'
      case 'Rejected':
        return 'disliked'
      case 'Accepted':
        return 'accepted'
      default:
        return ''
    }
  }

  console.log(match)

  return (
    <div className={`match-item ${getStatusColor(match.MatchStatus)}`}>
      <p>House ID: {match.HouseID}</p>
      <p>Status: {match.MatchStatus}</p>
    </div>
  )
}

export default MatchItem
