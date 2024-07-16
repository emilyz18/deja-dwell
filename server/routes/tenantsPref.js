var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

const tenantPrefQueries = require('../dataBase/queries/tenantPrefQueries')

// Get all tenant preferences
router.get('/', async (req, res) => {
    try {
        const tenantPrefs = await tenantPrefQueries.getAllTenantPrefs();
        return res.status(200).json(tenantPrefs);
    }
    catch (err) {
        return res.status(500).send("Error loading all tenant preference data from DB");
    }
});

// Get tenant preference by ID
router.get('/:tenantPreferenceID', async (req, res) => {
    const { tenantPreferenceID } = req.params;
    
    try {
        const tenantPrefs = await tenantPrefQueries.getOneTenantPref(tenantPreferenceID);
        if (tenantPrefs) {
            return res.json(tenantPrefs);
        } else {
            return res.status(404).send('Tenant pref not found');
        }
    } catch (err) {
        return res.status(500).send(`Error loading tenant preference data with ID: ${tenantPreferenceID} from DB:  ${err.message}, `);
    }
});

// Update tenant preference
router.patch('/:tenantPreferenceID', async (req, res) => {
    const { tenantPreferenceID } = req.params;
    const tenantPrefData = req.body;

    try {
        const updatedTenantPref = await tenantPrefQueries.editTenantPref(tenantPreferenceID, tenantPrefData)
        if (updatedTenantPref) {
            return res.status(200).json(updatedTenantPref);
        } else {
            return res.status(404).send('Tenant pref not found when editing');
        }
    } catch (err) {
        return res.status(500).send(`Error editing tenant pref data: ${err.message}`);
    } 
});

module.exports = router;
