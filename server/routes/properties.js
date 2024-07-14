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

// routes/properties.js
router.get('/getPropertyById/:HouseID', async (req, res) => {
    try {
        const { HouseID } = req.params;
        const property = await propertyQueries.getOneProperty(HouseID);
        // console.log('Property fetched in server:', property); 

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        return res.status(200).json(property);
    } catch (error) {
        console.error('Error fetching property:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
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

const getScore = (property, preference) => {
    return randomInt(1, 101);
}

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

        const prefProperties = unmatchedProperties.map(property => {
            return {
                ...property._doc,
                prefScore: getScore(property, tenantPrefs)
            };
        });
        prefProperties.sort((a, b) => b.prefScore - a.prefScore);
        
        return res.status(200).send(prefProperties);
    } catch (err) {
        console.log(err);
        res.status(500).send(`Error loading prefer property for user: ${tenantID} from DB: ${err.message}`);
    }
});



// patch existing proper
router.patch('/patchProperty/:HouseID', async (req, res) => {
    try {

        const { HouseID } = req.params;
        const updatedData = req.body;

        const updatedProperty = await propertyQueries.editProperty(HouseID, updatedData);

        if (!updatedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }

        return res.json(updatedProperty);
    } catch (error) {
        console.error('Error updating property:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});

// using the landlordID and houseID in landlord colloection 
router.post('/createProperty', async (req, res) => {
    try {
        //console.log('Request Body in server route createProp:', req.body);
        const { LandlordID, HouseID, ...propertyData } = req.body;
        if (!LandlordID) {
            return res.status(400).json({ message: 'LandlordID is undefined' });
        }

        const newProperty = { LandlordID, HouseID, ...propertyData };
        const createdProperty = await propertyQueries.createProperty(newProperty);
        return res.json(createdProperty);
    } catch (error) {
        console.error('Error creating property:', error.message);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
});


module.exports = router;
