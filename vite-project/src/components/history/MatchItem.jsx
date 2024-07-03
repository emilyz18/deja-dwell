import { useSelector } from 'react-redux';
import Carousel from '../carousel/Carousel';
import './MatchItem.css'; // Ensure you have this file for styling

function MatchItem({ match, displayPopup }) {
  const allProperties = useSelector((state) => state.properties.list);
  const currentProperty = allProperties.find((property) => property.HouseID == match.HouseID);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied':
        return 'applied';
      case 'Disliked':
      case 'Rejected':
        return 'disliked';
      case 'Accepted':
        return 'accepted';
      default:
        return '';
    }
  };

  return (
    <div className="match-item" onClick={displayPopup}>
      <div className="carousel-container-mi">
        {currentProperty && (
          <Carousel data={currentProperty.HouseImgs} size={{ width: 240, height: 150 }} />
        )}
      </div>
      {currentProperty && (
        <div className="house-details">
          <h2>{currentProperty.Title}</h2>
          <p>Price: {currentProperty.ExpectedPrice}</p>
          <p>Room Type: {currentProperty.RoomType}</p>
        </div>
      )}
      <div className={`match-status ${getStatusColor(match.MatchStatus)}`}>
        <p>Status: {match.MatchStatus}</p>
      </div>
    </div>
  );
}

export default MatchItem;
