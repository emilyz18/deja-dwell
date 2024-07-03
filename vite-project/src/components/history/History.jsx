// History.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMatchesAsync } from '../../redux/matches/matchThunks';
import MatchItem from './MatchItem';
import './History.css';

function History({ tenantId }) {
  const dispatch = useDispatch();
  const matches = useSelector((state) => state.matches.list);

  useEffect(() => {
    dispatch(getMatchesAsync());
  }, [dispatch]);

  // Filter matches based on tenantId
  const filteredMatches = matches.filter((match) => match.TenantID === tenantId);

  return (
    <div className="history-container">
      <div className="match-list">
        {filteredMatches.map((match) => (
          <MatchItem key={match.MatchID} match={match} />
        ))}
      </div>
    </div>
  );
}

export default History;
