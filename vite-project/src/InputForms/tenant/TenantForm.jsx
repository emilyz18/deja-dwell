import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import './TenantForm.css'
import { updateTenant } from '../../redux/tenant/tenantReducer'

export function TenantForm({
  handleSubmit,
  tenant,
  tenantPref,
  handleChange,
  handleCancel,
}) {

  const [errors, setErrors] = useState({})

  const formatDate = (date) => {
    if (!date) return ''
    const d = new Date(date)
    return d.toISOString().split('T')[0]
  }

  const validate = () => {
    let tempErrors = {}
    if (tenant.Age > 120) tempErrors.Age = 'Age too big'
    // Date validation
    if (tenantPref.StartDate && tenantPref.EndDate) {
      const startDate = new Date(tenantPref.StartDate)
      const endDate = new Date(tenantPref.EndDate)
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

  const renderInputField = (
    label,
    name,
    type = 'text',
    required = false,
    value = tenant[name] || ''
  ) => (
    <div className="tenant-form-group">
      <label>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        required={required}
        min={type === 'number' ? '0' : undefined}
      />
      {name === 'Age' && errors.Age && <p className="error">{errors.Age}</p>}
      {name === 'EndDate' && errors.EndDate && <p className="error">{errors.EndDate}</p>}

    </div>
  )

  const renderCheckboxField = (
    label,
    name,
    checked = tenantPref[name] || false
  ) => (
    <div className="tenant-form-group-inline">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={handleChange}
      />
      <label>{label}</label>
    </div>
  )

  return (
    <div className="tenant-form-container">
      <h2 className="header">Landlords need to know your...</h2>
      <form onSubmit={onSubmit}>
        <div className="tenant-form-grid">
          {renderInputField('Age', 'Age', 'number')}
          {renderInputField('Occupation', 'Occupation')}
          {renderInputField('Gender', 'Gender', true)}
          {renderInputField('Income in $', 'Income', 'number')}
          {renderInputField('Company', 'Company')}
          {renderInputField('Habit', 'Habit', 'text', true)}

        </div>

        <hr className="separator" />

        <h2 className="header">You are looking for rent that...</h2>
        <div className="tenant-form-grid">
          {renderInputField(
            'Province',
            'Province',
            'text',
            true,
            tenantPref.Province || ''
          )}
          {renderInputField(
            'City',
            'City',
            'text',
            true,
            tenantPref.City || ''
          )}
          {renderInputField(
            'Street',
            'Street',
            'text',
            false,
            tenantPref.Street || ''
          )}
          {renderInputField(
            'Maximum Price',
            'MaxPrice',
            'number',
            false,
            tenantPref.MaxPrice || ''
          )}
          {renderInputField(
            'Start Date',
            'StartDate',
            'date',
            false,
            formatDate(tenantPref.StartDate) || ''
          )}
          {renderInputField(
            'End Date',
            'EndDate',
            'date',
            false,
            formatDate(tenantPref.EndDate) || ''
          )}
          {renderInputField(
            'Number of Bedrooms',
            'NumBedroom',
            'number',
            false,
            tenantPref.NumBedroom || ''
          )}
          {renderInputField(
            'Number of Bathrooms',
            'NumBathroom',
            'number',
            false,
            tenantPref.NumBathroom || ''
          )}
        </div>

        <hr className="separator" />

        <div className="tenant-form-grid">
          {renderCheckboxField('Allow Pet', 'isOwnPet')}
          {renderCheckboxField('Allow Smoke', 'isSmoke')}
          {renderCheckboxField('Allow Party', 'isParty')}
          {renderCheckboxField('Allow Weed', 'isWeed')}
          {renderCheckboxField('AC included', 'isAC')}
          {renderCheckboxField('Heater included', 'isHeater')}
          {renderCheckboxField('Furnished', 'isFurnished')}
        </div>

        <hr className="separator" />

        <div className="tenant-form-grid">
          {renderInputField(
            'Number of Parking',
            'NumOfParking',
            'number',
            false,
            tenantPref.NumOfParking || ''
          )}
          {renderInputField(
            'Number of Residents',
            'NumOfResident',
            'number',
            false,
            tenantPref.NumOfResident || ''
          )}
        </div>

        <div className="form-buttons">
          <button type="submit" className="submit-button">
            Save
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="cancel-button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
