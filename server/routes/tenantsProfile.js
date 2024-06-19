var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

const tenantsFilePath = path.join(__dirname, '../mockData/Tenant.json');

const loadTenantJson = (filepath) => {
    try {
        const parsedTenantsData = fs.readFileSync(filepath, 'utf8');
        return JSON.parse(parsedTenantsData);
    } catch (err) {
        console.error(`Error reading tenant data in ${filepath}`, err);
        return null;
    }
};

const saveTenantJson = (file, data) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
};

// Get tenant profile (NOT tenant preference !!)
router.get('/:tenantID', (req, res) => {
    const { tenantID } = req.params;
    const tenants = loadTenantJson(tenantsFilePath);
    if (!tenants) {
        return res.status(500).send("Error getting tenant data");
    }

    const tenant = tenants.find(t => t.TenantID === tenantID);
    if (tenant) {
        return res.json(tenant);
    } else {
        return res.status(404).send('Tenant not found');
    }
});

// Update tenant profile
router.patch('/:tenantID', (req, res) => {
    const { tenantID } = req.params;
    const tenantData = req.body;

    const tenants = loadTenantJson(tenantsFilePath);
    if (!tenants) {
        return res.status(500).send("Error getting tenant data");
    }

    const tenantIndex = tenants.findIndex(t => t.TenantID === tenantID);
    if (tenantIndex >= 0) {
        tenants[tenantIndex] = { ...tenants[tenantIndex], ...tenantData };
        saveTenantJson(tenantsFilePath, tenants);
        return res.status(200).send('Tenant profile data updated successfully');
    } else {
        return res.status(404).send('Tenant profile not found');
    }
});

module.exports = router;
