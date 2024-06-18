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
    }
}

const saveTenantJson = (file, data) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
};

// get tenant profile (NOT tenant preference !!)
router.get('/:tenantID', (req, res) => {
    const { userId } = req.params;
    const tenants = loadTenantJson(tenantsFilePath);
    if (!tenants) {
        res.status(500).send("Error getting tenant data");
    }

    const tenant = tenants.find(t => t.userId === userId);
    if (tenant) {
        res.json(tenant);
        console.log(res.json(tenant));
    } else {
        res.status(404).send('Tenant not found');
    }
});


// update
router.patch('/:tenantID'), (req, res) => { 
    const { tenantID } = req.params;
    const tenantData = req.body;


    const tenants = loadTenantJson(tenantsFilePath);
    if (!tenants) {
        res.status(500).send("Error getting tenant data");
    }

    const tenantIndex = tenants.findIndex(t => t.TenantID === tenantID);
    if (tenantIndex >= 0) {
        // creat a copy of object of tenants[tenantIndex],
        // then overide with identical names field in tenantData
        tenants[tenantIndex] = { ...tenants[tenantIndex], ...tenantData };
       
        saveData(tenantsFile, tenants);
        res.status(200).send('Tenant profile data updated successfully');
    } else {
        res.status(404).send('Tenant profile not found');
    }

}

module.exports = router;