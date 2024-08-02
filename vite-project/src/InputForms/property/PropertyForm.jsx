// image preview method guided by chaptgpt 4o with prompt: how to create image preview for each URL input textfield, generated code applied to handleImageChange()
import React, { useState } from 'react'
import './PropertyForm.css'

export function PropertyForm({
  property,
  handleSubmit,
  handleChange,
  handleCancel,
  handleImageChange,
}) {
  const [errors, setErrors] = useState({})

  const formatDate = (date) => {
    if (!date) return ''
    const d = new Date(date)
    return d.toISOString().split('T')[0]
  }

  const validate = () => {
    let tempErrors = {}
    const validImages = (property.HouseImgs || []).filter(
      (image) => image.src !== ''
    )
    if (validImages.length < 3)
      tempErrors.HouseImgs = 'At least 3 images are required'

    // Date validation
    if (property.StartDate && property.EndDate) {
      const startDate = new Date(property.StartDate)
      const endDate = new Date(property.EndDate)
      if (startDate > endDate) {
        tempErrors.EndDate = 'End date must be greater than start date'
      }

    }


    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const onSubmit = (event) => {
    event.preventDefault()
    if (validate()) {
      handleSubmit(event)
    }
  }

  const renderDateField = (label, name) => (
    <div className="property-form-group">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type="date"
        value={formatDate(property[name]) || ''}
        onChange={handleChange}
      />

      {name === 'EndDate' && errors.EndDate && <p className="error">{errors.EndDate}</p>}
    </div>
  )

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
        min={type === 'number' ? '0' : undefined}
      />
    </div>
  )

  const renderTextArea = (label, name, type = 'text', required = false) => (
    <div className="property-form-group">
      <label htmlFor={name}>{label}</label>
      <textarea
        id={name}
        name={name}
        value={property[name] || ''}
        onChange={handleChange}
        rows="4"
        maxLength="250"
        placeholder="Max 250 characters"
      />
      <p>{(property[name] || '').length}/250 characters</p>
    </div>
  )

  const renderCheckboxField = (label, name) => (
    <div className="property-form-group-inline">
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={property[name] || false}
        onChange={handleChange}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  )

  const renderImageFields = () => (
    <div className="property-form-group property-image-group">
      <label>Images</label>
      <div className="image-inputs">
        {(property.HouseImgs || []).map((image, index) => (
          <div key={index} className="image-input-container">
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
              <img src={image.src} alt={image.alt} className="property-image" />
            )}
          </div>
        ))}
      </div>
      {errors.HouseImgs && <p className="error">{errors.HouseImgs}</p>}
    </div>
  )

  return (
    <div className="property-form-container">
      <h2 className="header">Input Your Property Information</h2>
      <form onSubmit={onSubmit}>
        <div className="property-form-section">
          <div className="property-form-grid">
            {renderInputField('Title', 'Title', 'text', true)}
            {renderTextArea('Description', 'Description', 'textarea')}
            {renderInputField('Province', 'Province', 'text', true)}
            {renderInputField('City', 'City', 'text', true)}
            {renderInputField('Street', 'Street')}
            {renderDateField('Start Date', 'StartDate')}
            {renderDateField('End Date', 'EndDate')}
            {renderInputField(
              'Rent Per Month',
              'ExpectedPrice',
              'number',
              true
            )}
          </div>
          <hr className="separator" />
        </div>
        <div className="property-form-section">
          <div className="property-form-grid">
            {renderInputField('Number of Bedrooms', 'NumBedroom', 'number')}
            {renderInputField('Number of Bathrooms', 'NumBathroom', 'number')}
            {renderInputField('Number of Parking', 'NumOfParking', 'number')}
            {renderInputField('Number of Resident', 'NumOfResident', 'number')}
          </div>
          <hr className="separator" />
        </div>
        <div className="property-form-section">
          {renderImageFields()}
          <hr className="separator" />
        </div>
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
          <hr className="separator" />
        </div>
        <div className="property-form-group">
          <button type="submit">Publish</button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
