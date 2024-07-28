import React from 'react';
import './TenantForm.css';

function TenantAttribute({ label, value }) {
  return (
    <div className="tenant-attribute">
      <span className="label">{label}:</span>
      <span className="value">{value || 'N/A'}</span>
    </div>
  );
}

export function TenantInputDisplay({ tenant, tenantPref, handleEdit }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-CA');
  };

  return (
    <div className="tenant-display-container">
      <h2 className="header">Landlords need to know your...</h2>
      <div className="info-grid">
        <TenantAttribute label="Age" value={tenant.Age} />
        <TenantAttribute label="Gender" value={tenant.Gender} />
        <TenantAttribute label="Occupation" value={tenant.Occupation} />
        <TenantAttribute label="Income" value={tenant.Income} />
        <TenantAttribute label="Company" value={tenant.Company} />
        <TenantAttribute label="Habit" value={tenant.Habit} />
      </div>

      <h2 className="header">You are looking for rent that...</h2>
      <div className="info-grid">
        <TenantAttribute label="Province" value={tenantPref.Province} />
        <TenantAttribute label="City" value={tenantPref.City} />
        <TenantAttribute label="Street" value={tenantPref.Street} />
        <TenantAttribute label="Max Price" value={tenantPref.MaxPrice} />
        <TenantAttribute label="Start Date" value={tenantPref.StartDate ? formatDate(tenantPref.StartDate) : 'N/A'} />
        <TenantAttribute label="End Date" value={tenantPref.EndDate ? formatDate(tenantPref.EndDate) : 'N/A'} />
        <TenantAttribute label="Number of Bedrooms" value={tenantPref.NumBedroom} />
        <TenantAttribute label="Number of Bathrooms" value={tenantPref.NumBathroom} />
        <TenantAttribute label="Allow Pet" value={tenantPref.isOwnPet ? 'Yes' : 'No'} />
        <TenantAttribute label="Allow Smoke" value={tenantPref.isSmoke ? 'Yes' : 'No'} />
        <TenantAttribute label="Allow Party" value={tenantPref.isParty ? 'Yes' : 'No'} />
        <TenantAttribute label="Allow Weed" value={tenantPref.isWeed ? 'Yes' : 'No'} />
        <TenantAttribute label="AC included" value={tenantPref.isAC ? 'Yes' : 'No'} />
        <TenantAttribute label="Heater included" value={tenantPref.isHeater ? 'Yes' : 'No'} />
        <TenantAttribute label="Furnished" value={tenantPref.isFurnished ? 'Yes' : 'No'} />
        <TenantAttribute label="Number of Parking" value={tenantPref.NumOfParking} />
        <TenantAttribute label="Number of Residents" value={tenantPref.NumOfResident} />
      </div>

      <button className="edit-button" onClick={handleEdit}>Edit Preference</button>
    </div>
  );
}
