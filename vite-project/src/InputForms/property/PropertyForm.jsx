import React, { useState } from 'react';
import './PropertyForm.css';

export function PropertyForm({ property, handleSubmit, handleChange, handleCancel, handleImageChange }) {
  const [errors, setErrors] = useState({});

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  const validate = () => {
    let tempErrors = {};
    if (!property.Title) tempErrors.Title = "Title is required";
    if (!property.Province) tempErrors.Province = "Province is required";
    if (!property.City) tempErrors.City = "City is required";
    if (!property.ExpectedPrice) tempErrors.ExpectedPrice = "Rent Per Month is required";

    const validImages = (property.HouseImgs || []).filter(image => image.src !== '');
    if (validImages.length < 3) tempErrors.HouseImgs = "At least 3 images are required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      handleSubmit(event);
    }
  };

  const renderDateField = (label, name, type = 'text', required = false) => (
    <div className="property-form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={formatDate(property[name]) || ''}
        onChange={handleChange}
      />
      {errors[name] && <p className="error">{errors[name]}</p>}
    </div>
  );

  const renderInputField = (label, name, type = 'text', required = false) => (
    <div className="property-form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={property[name] || ''}
        onChange={handleChange}
      />
      {errors[name] && <p className="error">{errors[name]}</p>}
    </div>
  );

  const renderCheckboxField = (label, name) => (
    <div>
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={property[name] || false}
        onChange={handleChange}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );

  const renderImageFields = () => (
    <div className="property-form-group">
      <label>Images</label>
      {(property.HouseImgs || []).map((image, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder={`Image URL ${index + 1}`}
            value={image.src}
            onChange={(e) => handleImageChange(index, 'src', e)}
          />
          <input
            type="text"
            placeholder={`Image Alt Text ${index + 1}`}
            value={image.alt}
            onChange={(e) => handleImageChange(index, 'alt', e)}
          />
          {image.src && (
            <img src={image.src} alt={image.alt} width={300} />
          )}
        </div>
      ))}
      {errors.HouseImgs && <p className="error">{errors.HouseImgs}</p>}
    </div>
  );

  return (
    <div className="property-form-container">
      <h2 className="header">Input Your Property Information</h2>
      <form onSubmit={onSubmit}>
        <div className="property-form-grid">
          {renderInputField('Title', 'Title', 'text', true)}
          {renderInputField('Province', 'Province', 'text', true)}
          {renderInputField('City', 'City', 'text', true)}
          {renderInputField('Street', 'Street')}
          {renderInputField('Rent Per Month', 'ExpectedPrice', 'number', true)}
          {renderDateField('Start Date', 'StartDate', 'date', false)}
          {renderDateField('End Date', 'EndDate', 'date', false)}
        </div>
        {renderInputField('Description', 'Description', 'textarea')}
        <div className="property-form-grid">
          {renderInputField('Number of Bedrooms', 'NumBedroom', 'number')}
          {renderInputField('Number of Bathrooms', 'NumBathroom', 'number')}
          {renderInputField('Number of Parking', 'NumOfParking', 'number')}
          {renderInputField('Number of Resident', 'NumOfResident', 'number')}
        </div>
        {renderImageFields()}
        <div className="property-form-group">
          <label>Preferences</label>
          <div className="preferences-grid">
            {renderCheckboxField('Allow Pet', 'AllowPet')}
            {renderCheckboxField('Allow Smoke', 'AllowSmoke')}
            {renderCheckboxField('Allow Party', 'AllowParty')}
            {renderCheckboxField('Allow Weed', 'AllowWeed')}
            {renderCheckboxField('AC included', 'isAC')}
            {renderCheckboxField('Heater included', 'isHeater')}
            {renderCheckboxField('Furnished', 'isFurnished')}
          </div>
        </div>
        <div className="property-form-group">
          <button type="submit">Publish</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
