var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

const tenantsPrefFilePath = path.join(__dirname, '../mockData/TenantPreference.json');

const loadTenantJson = (filepath) => {
    try {
        const parsedTenantsData = fs.readFileSync(filepath, 'utf8');
        return JSON.parse(parsedTenantsData);
    } catch (err) {
        console.error(`Error reading tenant data in ${filepath}`, err);
        return null;
    }
}

const saveTenantJson = (file, data) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
};

// Get all tenant preferences
router.get('/', (req, res) => {
    const tenantPrefs = loadTenantJson(tenantsPrefFilePath);
    if (!tenantPrefs) {
        return res.status(500).send("Error loading tenant preference data from JSON file");
    }
    return res.status(200).json(tenantPrefs);
});

// Get tenant preference by ID
router.get('/:tenantPreferenceID', (req, res) => {
    const { tenantPreferenceID } = req.params;
    console.log('Received request for tenantPreferenceID:', tenantPreferenceID);
    const tenantPrefs = loadTenantJson(tenantsPrefFilePath);
    if (!tenantPrefs) {
        return res.status(500).send("Error loading tenant preference data from JSON file");
    }

    const tenantPref = tenantPrefs.find(t => t.TenantPreferenceID === tenantPreferenceID);
    if (tenantPref) {
        return res.status(200).json(tenantPref);
    } else {
        return res.status(404).send('Tenant preference data not found');
    }
});

// Update tenant preference
router.patch('/:tenantPreferenceID', (req, res) => {
    const { tenantPreferenceID } = req.params;
    const tenantPrefData = req.body;

    const tenantPrefs = loadTenantJson(tenantsPrefFilePath);
    if (!tenantPrefs) {
        return res.status(500).send("Error loading tenant preference data from JSON file");
    }

    const tenantPrefIndex = tenantPrefs.findIndex(t => t.TenantPreferenceID === tenantPreferenceID);
    if (tenantPrefIndex >= 0) {
        tenantPrefs[tenantPrefIndex] = { ...tenantPrefs[tenantPrefIndex], ...tenantPrefData };

        saveTenantJson(tenantsPrefFilePath, tenantPrefs);
        return res.status(200).json(tenantPrefs[tenantPrefIndex]);
    } else {
        return res.status(404).send('Tenant preference data not found');
    }
});

module.exports = router;
