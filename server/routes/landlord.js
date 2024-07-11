var express = require('express');
var router = express.Router();

const landlordQueries = require('../dataBase/queries/landlordQueries');

// Get tenant profile by ID
router.get('/:landlordID', async (req, res) => {
    const { landlordID } = req.params;
    try {
        const landlord = await landlordQueries.getOneLandlord(landlordID);
        if (landlord) {
            return res.json(landlord);
        } else {
            return res.status(404).send('landlord not found');
        }
    } catch (err) {
        return res.status(500).send(`Error getting tenant data with ID: ${landlordID} from DB:  ${err.message}, `);
    }
});


module.exports = router;
