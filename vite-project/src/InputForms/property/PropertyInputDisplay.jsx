import React from 'react';
import './PropertyForm.css';

function PropertyAttribute({ label, value }) {
  return (
    <div className="property-attribute">
      <span className="label">{label}:</span>
      <span className="value">{value || 'N/A'}</span>
    </div>
  );
}

export function PropertyInputDisplay({ property, handleEdit }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA');
  };

  return (
    <div className="property-display-container">
      <h2 className="header">Your Property Information</h2>
      <div className="info-grid">
        <PropertyAttribute label="Description" value={property.Description} />
        <div className="property-images">
          <span className="label">Images:</span>
          {property.HouseImgs && property.HouseImgs.map((image, index) => (
            <img key={index} src={image.src} alt={image.alt} className="property-image" />
          ))}
        </div>
        <PropertyAttribute label="Title" value={property.Title} />
        <PropertyAttribute label="Province" value={property.Province} />
        <PropertyAttribute label="City" value={property.City} />
        <PropertyAttribute label="Street" value={property.Street} />
        <PropertyAttribute label="Rent Per Month" value={property.ExpectedPrice} />
        <PropertyAttribute label="Start Date" value={property.StartDate ? formatDate(property.StartDate) : 'N/A'} />
        <PropertyAttribute label="End Date" value={property.EndDate ? formatDate(property.EndDate) : 'N/A'} />
        <PropertyAttribute label="Number of Bedroom" value={property.NumBedroom} />
        <PropertyAttribute label="Number of Bathroom" value={property.NumBathroom} />
        <PropertyAttribute label="Own Pet" value={property.AllowPet ? 'Yes' : 'No'} />
        <PropertyAttribute label="Smoke" value={property.AllowSmoke ? 'Yes' : 'No'} />
        <PropertyAttribute label="Party" value={property.AllowParty ? 'Yes' : 'No'} />
        <PropertyAttribute label="Weed" value={property.AllowWeed ? 'Yes' : 'No'} />
        <PropertyAttribute label="AC included" value={property.isAC ? 'Yes' : 'No'} />
        <PropertyAttribute label="Heater included" value={property.isHeater ? 'Yes' : 'No'} />
        <PropertyAttribute label="Furnished" value={property.isFurnished ? 'Yes' : 'No'} />
        <PropertyAttribute label="Number of Parking" value={property.NumOfParking} />
        <PropertyAttribute label="Number of Resident" value={property.NumOfResident} />
      </div>

      <button className="edit-button" onClick={handleEdit}>
        Edit Property
      </button>
    </div>
  );
}
