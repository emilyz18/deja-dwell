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

const savePropertiesJson = (data) => {
    fs.writeFileSync(propertiesFilePath, JSON.stringify(data, null, 2), 'utf8');
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

// patch existing proper
router.patch('/patchProperty/:HouseID', async (req, res) => {
    try {
        const properties = loadPropertiesJson();
        const propertyIndex = properties.findIndex(p => p.HouseID === req.params.HouseID);

        if (propertyIndex === -1) {
            return res.status(404).json({ message: 'Property not found' });
        }

        const updatedProperty = { ...properties[propertyIndex], ...req.body };
        properties[propertyIndex] = updatedProperty;

        savePropertiesJson(properties);

        res.json(updatedProperty);
    } catch (error) {
        console.error('Error updating property:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// using the landlordID and houseID in landlord colloection 
router.post('/createProperty', async (req, res) => {
    try {
        const properties = loadPropertiesJson();
        const { LandlordID, HouseID, ...propertyData } = req.body;

        const newProperty = { HouseID, LandlordID, ...propertyData };
        properties.push(newProperty);
        savePropertiesJson(properties);

        res.json(newProperty);
    } catch (error) {
        console.error('Error creating property:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});


module.exports = router;
