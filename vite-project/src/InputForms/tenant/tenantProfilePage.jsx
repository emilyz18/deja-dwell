// t
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateTenant,
  updateTenantPref,
} from '../../redux/tenant/tenantReducer.js'
import './TenantInputForm.css'
import {
  getTenantPrefAsync,
  getTenantProfileAsync,
  patchTenantPrefAsync,
  patchTenantProfileAsync,
} from '../../redux/tenant/thunks.js'
import { TenantForm } from './tenantForm.jsx'
import { TenantInputDisplay } from './tenantInputDisplay.jsx'

export function TenantProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  const dispatch = useDispatch()

  // for user reducer
  const tenantID = useSelector((state) => state.user.user.TenantID)
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated)
  const { tenant, tenantPref } = useSelector((state) => state.tenant)

  useEffect(() => {
    if (isAuthenticated && tenantID) {
      dispatch(getTenantProfileAsync(tenantID))
    }
  }, [dispatch, isAuthenticated, tenantID])

  useEffect(() => {
    if (isAuthenticated && tenant.TenantPreferenceID) {
      dispatch(getTenantPrefAsync(tenant.TenantPreferenceID))
    }
  }, [dispatch, isAuthenticated, tenant.TenantPreferenceID])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (name in tenant) {
      dispatch(updateTenant({ [name]: type === 'checkbox' ? checked : value }))
    } else {
      dispatch(
        updateTenantPref({ [name]: type === 'checkbox' ? checked : value })
      )
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(patchTenantProfileAsync({ tenantID, tenant }))
    if (tenant.TenantPreferenceID) {
      dispatch(
        patchTenantPrefAsync({
          tenantPreferenceID: tenant.TenantPreferenceID,
          tenantPref,
        })
      )
    } else {
      console.error(
        'In input form component. TenantPreferenceID undefined. Cannot patch'
      )
    }
    setIsEditing(false)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }
  return (
    <>
      {isEditing ? (
        <TenantForm
          handleSubmit={handleSubmit}
          tenant={tenant}
          tenantPref={tenantPref}
          handleChange={handleChange}
          handleCancel={handleCancel}
        />
      ) : (
        <TenantInputDisplay
          tenant={tenant}
          tenantPref={tenantPref}
          handleEdit={handleEdit}
        />
      )}
    </>
  )
}
