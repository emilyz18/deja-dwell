import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MatchItem from './MatchItem'
import { ExpandedPropertyCard } from '../expandedPropertyCard/ExpandedPropertyCard.jsx'

import './History.css'
import { getPropertiesAsync } from '../../redux/properties/thunks'
import { getTenantMatchesAsync } from '../../redux/matches/matchThunks'
import { Typography } from '@mui/material'
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import  ReplayRoundedIcon from '@mui/icons-material/ReplayRounded'

function History() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.user)
  const [popupVisible, setPopupVisible] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState(null)
  const getPropertiesStatus = useSelector(
    (state) => state.properties.getProperties
  )
  const getTenantMatchesStatus = useSelector(
    (state) => state.matches.getTenantMatches
  )
  const tenantID = user.TenantID

  useEffect(() => {
    if (getPropertiesStatus === 'IDLE' || getTenantMatchesStatus === 'IDLE') {
      dispatch(getPropertiesAsync())
      dispatch(getTenantMatchesAsync(tenantID))
    }
  }, [getPropertiesStatus, getTenantMatchesStatus, dispatch])
  const allProperties = useSelector((state) => state.properties.list)
  const matches = useSelector((state) => state.matches.tenantMatches)

  const displayPopup = (match) => {
    const currentProperty = allProperties.find(
      (property) => property.HouseID === match.HouseID
    )

    setSelectedProperty(currentProperty)
    setPopupVisible(true)
  }

  const closePopup = () => {
    setPopupVisible(false)
    setSelectedProperty(null)
  }

  const reloadHistory = () => {
    dispatch(getPropertiesAsync())
    dispatch(getTenantMatchesAsync(tenantID))
  }

  return (
    <div className="history-container">
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          paddingLeft: 2,
          pt: 2,
          pb: 2,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            flexGrow: 1,
            fontWeight: 'bold',
            fontFamily: 'Mulish, sans-serif',
          }}
        >
          History
        </Typography>
      </Box>
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

      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 1000,
        }}
      >
        <Fab
          variant="extended"
          size="medium"
          onClick={reloadHistory}
          sx={{
            backgroundColor: 'black',
            color: 'white',
            '&:hover': {
              backgroundColor: '#333',
            },
          }}
        >
          <ReplayRoundedIcon sx={{ mr: 1 }} />
          Reload History Status
        </Fab>
      </Box>
    </div>
  )
}

export default History
