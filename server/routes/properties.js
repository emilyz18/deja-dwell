var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

const propertiesFilePath = path.join(__dirname, '../mockData/Properties.json');

const tenantProfileQueries = require('../dataBase/queries/tenantProfileQueries')
const tenantPrefQueries = require('../dataBase/queries/tenantPrefQueries')
const { randomInt } = require('crypto');

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

router.get('/unmatchedProperties/:tenantID', (req, res) => {
    let properties;
    const { tenantID } = req.params;
    //TODO: After using DB, these steps should be changed to use query to fetch from DB directly
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

router.get('/preferProperties/:tenantID', async (req, res) => {
    try {
        //This part is just reused from unmatchedProperties, also need to use query to fetch later
        let properties;
        const { tenantID } = req.params;
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

        const tenantInfo = await tenantProfileQueries.getOneTenantProfile(tenantID);
        if (!tenantInfo) {
            return res.status(500).send(`Error loading tenantInfo data for user: ${tenantID} from DB`);
        }

        const tenantPrefID = tenantInfo.TenantPreferenceID;
        if (!tenantPrefID) {
            //TODO: Discuss about this case
            return res.status(200).json(unmatchedProperties);
        }

        const tenantPrefs = await tenantPrefQueries.getOneTenantPref(tenantPrefID);
        if (!tenantPrefs) {
            return res.status(200).json(unmatchedProperties);
        }

        //TODO: add Algorithm for preference matching
        // This is just a place holder: Add prefScore to each property and sort by prefScore in descending order
        unmatchedProperties.forEach(property => {
            property.prefScore = randomInt(1, 101); // Generate a random integer between 1 and 100
        });

        unmatchedProperties.sort((a, b) => b.prefScore - a.prefScore);

        return res.json(unmatchedProperties);
    } catch (err) {
        return res.status(500).send(`Error loading prefer property for user: ${tenantID} from DB:  ${err.message}, `);
    }
});

module.exports = router;