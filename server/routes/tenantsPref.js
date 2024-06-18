var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

const tenantsPrefFilePath = path.join(__dirname, '../mockData/TenantPreferenceID.json');


const loadTenantJson = (filepath) => {
    try {
        const parsedTenantsData = fs.readFileSync(filepath, 'utf8');
        return JSON.parse(parsedTenantsData);
    } catch (err) {
        console.error(`Error reading tenant data in ${filepath}`, err);
    }
}

const saveTenantJson = (file, data) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
};

// get tenant profile (NOT tenant preference !!)
router.get('/:tenantPreferenceID', (req, res) => {
    const { tenantPreferenceID } = req.params;
    const tenantPrefs = loadTenantJson(tenantsPrefFilePath);
    if (!tenantPrefs) {
        res.status(500).send("Error loading tenant preferene data from JSON file");
    }

    const tenanPref = tenantPrefs.find(t => t.TenantPreferenceID === tenantPreferenceID);
    if (tenanPref) {
        res.json(tenanPref);
        console.log(res.json(tenanPref));
    } else {
        res.status(404).send('Tenant preference data not found');
    }
});


// update
router.patch('/:tenantPreferenceID'), (req, res) => {
    const { tenantPreferenceID } = req.params;
    const tenantPrefData = req.body;


    const tenantPrefs = loadTenantJson(tenantsFilePath);
    if (!tenantPrefs) {
        res.status(500).send("Error loading tenant preference data from JSON file");
    }

    const tenantPrefIndex = tenantPrefs.findIndex(t => t.TenantPreferenceID === tenantPreferenceID);
    if (tenantPrefIndex >= 0) {
        // creat a copy of object of tenants[tenantIndex],
        // then overide with identical names field in tenantData
        tenantPrefs[tenantPrefIndex] = { ...tenantPrefs[tenantPrefIndex], ...tenantPrefData };

        saveData(tenantsPrefFilePath, tenantPrefs);
        res.status(200).send('Tenant preference data updated successfully');
    } else {
        res.status(404).send('Tenant preferene data not found');
    }

}

module.exports = router;