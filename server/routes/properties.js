var express = require('express');
var router = express.Router();

const tenantProfileQueries = require('../dataBase/queries/tenantProfileQueries');
const tenantPrefQueries = require('../dataBase/queries/tenantPrefQueries');
const propertyQueries = require('../dataBase/queries/propertyQueries');
const matchQueries = require('../dataBase/queries/matchQueries');
const { randomInt } = require('crypto');

const loadPropertiesJson = async () => {
    try {
        return await propertyQueries.getAllProperties();
    } catch (err) {
        console.error('Error reading properties data:', err);
        return null;
    }
};

const loadMatchesJson = async () => {
    try {
        return await matchQueries.getAllMatches();
    } catch (err) {
        console.error('Error reading matches data:', err);
        return null;
    }
};

router.get('/getProperties', async (req, res) => {
    try {
        const properties = await loadPropertiesJson();
        res.status(200).json(properties);
    } catch (err) {
        res.status(500).send({ error: 'Error loading properties data' });
    }
});

router.get('/unmatchedProperties/:tenantID', async (req, res) => {
    const { tenantID } = req.params;
    try {
        const matches = await loadMatchesJson();
        const properties = await loadPropertiesJson();
        const unmatchedProperties = properties.filter(property => {
            return !matches.some(match => match.TenantID === tenantID && match.HouseID === property.HouseID);
        });
        res.status(200).json(unmatchedProperties);
    } catch (err) {
        res.status(500).send('Error loading data');
    }
});

router.get('/preferProperties/:tenantID', async (req, res) => {
    const { tenantID } = req.params;
    try {
        const matches = await loadMatchesJson();
        const properties = await loadPropertiesJson();
        const unmatchedProperties = properties.filter(property => {
            return !matches.some(match => match.TenantID === tenantID && match.HouseID === property.HouseID);
        });

        const tenantInfo = await tenantProfileQueries.getOneTenantProfile(tenantID);
        if (!tenantInfo) {
            return res.status(500).send(`Error loading tenantInfo data for user: ${tenantID} from DB`);
        }

        const tenantPrefID = tenantInfo.TenantPreferenceID;
        if (!tenantPrefID) {
            return res.status(200).json(unmatchedProperties);
        }

        const tenantPrefs = await tenantPrefQueries.getOneTenantPref(tenantPrefID);
        if (!tenantPrefs) {
            return res.status(200).json(unmatchedProperties);
        }

        unmatchedProperties.forEach(property => {
            property.prefScore = randomInt(1, 101);
        });

        unmatchedProperties.sort((a, b) => b.prefScore - a.prefScore);

        res.json(unmatchedProperties);
    } catch (err) {
        res.status(500).send(`Error loading prefer property for user: ${tenantID} from DB: ${err.message}`);
    }
});

module.exports = router;
