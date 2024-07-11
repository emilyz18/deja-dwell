var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

const propertiesFilePath = path.join(__dirname, '../mockData/Properties.json');

const loadPropertiesJson = () => {
    try {
        const data = fs.readFileSync(propertiesFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading properties data:', err);
        return null;
    }
};

//TODO: in future this need to be moved to another class? so that it can be used in other place
const matchesFilePath = path.join(__dirname, '../mockData/Match.json');

const loadMatchesJson = () => {
    try {
        const data = fs.readFileSync(matchesFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading matches data:', err);
        return null;
    }
};

router.get('/getProperties', (req, res) => {
    let readError;
    let properties;

    properties = loadPropertiesJson();
    if (!properties) {
        res.status(500).send({ error: readError });
    } else {
        res.status(200).json(properties);
    }
});

router.get('/getPropertyById/:HouseID', async (req, res) => {

    try {
        const properties = loadPropertiesJson(); 
        // console.log(req.params);
        const property = properties.find(p => p.HouseID === req.params.HouseID); 

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.json(property);
    } catch (error) {
        console.error('Error fetching property:', error.message); 
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

router.get('/unmatchedProperties/:tenantID', (req, res) => {
    let readError;
    let properties;
    const { tenantID } = req.params;
    //TODO: After using DB, these steps should be changed to use querey to fetch from DB directly
    const matches = loadMatchesJson();
    properties = loadPropertiesJson();
    if (!matches) {
        return res.status(500).send('Error loading matches data');
    }
    if (!properties) {
        return res.status(500).send('Error loading properties data');
    }
    const unmatchedProperties = properties.filter(property => {
        return !matches.some(match => match.TenantID === tenantID && match.HouseID === property.HouseID);
    });
    res.status(200).json(unmatchedProperties);
});

// TODO patch and post

module.exports = router;