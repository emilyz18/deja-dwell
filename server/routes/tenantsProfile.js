const express = require('express')
const router = express.Router()

const tenantProfileQueries = require('../dataBase/queries/tenantProfileQueries')

// Get all tenant profiles
router.get('/', async (req, res) => {
  try {
    const tenants = await tenantProfileQueries.getAllTenantProfile()
    return res.status(200).json(tenants)
  } catch (err) {
    return res.status(500).send('Error getting all tenants data from DB')
  }
})

// Get tenant profile by ID
router.get('/:tenantID', async (req, res) => {
  const { tenantID } = req.params
  try {
    const tenant = await tenantProfileQueries.getOneTenantProfile(tenantID)
    if (tenant) {
      return res.json(tenant)
    } else {
      return res.status(404).send('Tenant not found')
    }
  } catch (err) {
    return res.status(500).send(`Error getting tenant data with ID: ${tenantID} from DB:  ${err.message}, `)
  }
})

// Update tenant profile
router.patch('/:tenantID', async (req, res) => {
  const { tenantID } = req.params
  const tenantData = req.body

  try {
    const updatedTenant = await tenantProfileQueries.editTenantProfile(tenantID, tenantData)
    if (updatedTenant) {
      return res.status(200).json(updatedTenant)
    } else {
      return res.status(404).send('Tenant profile not found when editing')
    }
  } catch (err) {
    return res.status(500).send(`Error editing tenant profile data: ${err.message}`)
  }
})

module.exports = router
