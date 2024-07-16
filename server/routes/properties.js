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

getUnmatchedProperties = async (tenantID) => {
    const matches = await loadMatchesJson();
    const properties = await loadPropertiesJson();

    const acceptedMatches = matches.filter(match => match.MatchStatus === 'Accepted');
    const acceptedHouseIDs = new Set(acceptedMatches.map(match => match.HouseID));
    unAcceptedProperties =  properties.filter(property => !acceptedHouseIDs.has(property.HouseID));

    const unmatchedProperties = unAcceptedProperties.filter(property => {
        return !matches.some(match => match.TenantID === tenantID && match.HouseID === property.HouseID);
    });

    return unmatchedProperties;
}

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
        unmatchedProperties = await getUnmatchedProperties(tenantID);
        res.status(200).json(unmatchedProperties);
    } catch (err) {
        res.status(500).send('Error loading data');
    }
});


//Pre-requirement: property and preference are checked non-empty
const getScore = (property, preference) => {
    const weights = {
        provinceW: 20,
        cityW: 10,
        streetW: 50,
        underMaxPriceW: 10,
        startDateMatchW: 5,
        endDateMatchW: 5,
        bedroomW: 5,
        bathroomW: 5,
        petW: 1,    //TODO: Consider changing all these boolean weight to a single Boolean weight? (but in the future if we add weight it means all boolean match will have higher weigth)
        smokeW: 1,
        partyW: 1,
        weedW: 1,
        acW: 3,
        heatW: 3,
        furnishW: 3,
        parkingMatchW: 3,

        // Add more properties and their weights as needed
    };

    let score = 0;

    if (property.Province && preference.Province) {
        //We assume user always provide at least Province Pref 
        if (property.Province.toLowerCase() == preference.Province.toLowerCase()) {
            score += weights.provinceW;
            //This part is nested because it only make sense to check city if province match
            if (property.City) {
                if (!preference.City // this case assume user is okay with any city in the province
                    || property.City.toLowerCase() == preference.City.toLowerCase()
                ) {
                    score += weights.cityW;
                    if (property.Street && preference.Street && property.Street.toLowerCase() == preference.Street.toLowerCase()) {
                        score += weights.streetW; // no negative score if missed on street because it is likely going to miss
                    }
                } else {
                    score -= weights.cityW;
                }
            }
        } else {
            score -= weights.provinceW;
            score -= weights.cityW;
        }
    } else {
        score -= weights.provinceW;
        score -= weights.cityW;
    }

    if(property.ExpectedPrice) {
        if(!preference.MaxPrice) {
            //Assume tenant okay with any price
            score += weights.underMaxPriceW;
        } else {
            if(property.ExpectedPrice <= preference.MaxPrice) {
                score += weights.underMaxPriceW;
                //Each 1% decrease in price will increase 1 point
                let diffPercent = 100 * (preference.MaxPrice - property.ExpectedPrice) / preference.MaxPrice;
                score += diffPercent;
            } else {
                score -= weights.underMaxPriceW;
                let diffPercent = (property.ExpectedPrice - preference.MaxPrice) / preference.MaxPrice;
                score -= diffPercent;
            }
        }
    } //No penalty if property does not provide price

    if(property.StartDate) {
        if(!preference.StartDate) {
            //Assume tenant okay with any start date
            score += weights.startDateMatchW;
        } else {
            if(property.StartDate.getTime() <= preference.StartDate.getTime()) {
                // Property is available when tenant want to start renting
                score += weights.startDateMatchW;
            } else {
                // Property is not yet available when tenant want to start renting
                score -= weights.startDateMatchW;
            }
        }
    } else {
        //If no start date provide then consider not a good match, apply penalty
        score -= weights.startDateMatchW;
    }

    if(property.EndDate) {
        if(!preference.EndDate) {
            // if not set up end date in preference assume it is okay for any length
            score += weights.endDateMatchW;
        } else {
            //Same logic as start date
            if(property.EndDate.getTime() >= preference.EndDate.getTime()) {
                score += weights.endDateMatchW;
            } else {
                score -= weights.endDateMatchW;
            }
        }
    } else {
        //If no end date provide then consider is a long term, always a good match
        score += weights.endDateMatchW;
    }

    if(property.NumBedroom && preference.NumBedroom) {
        if(property.NumBedroom >= preference.NumBedroom) {
            score += weights.bedroomW;
        } else {
            score -= weights.bedroomW;
        }
    }

    if(property.NumBathroom && preference.NumBathroom) {
        if(property.NumBathroom >= preference.NumBathroom) {
            score += weights.bathroomW;
        } else {
            score -= weights.bathroomW;
        }
    }

    if(property.NumOfParking && preference.NumOfParking) {
        if(property.NumOfParking >= preference.NumOfParking) {
            score += weights.parkingMatchW;
        } else {
            score -= weights.parkingMatchW;
        }
    }

    if(preference.isOwnPet) {
        // Only need to care about this if tenant wants Pet option, otherwise it won't affect preference score
        if(property.AllowPet) {
            score += weights.petW;
        } else {
            score -= weights.petW;
        }
    }

    if(preference.isSmoke) {
        if(property.AllowSmoke) {
            score += weights.smokeW;
        } else {
            score -= weights.smokeW;
        }
    }

    if(preference.isParty) {
        if(property.AllowParty) {
            score += weights.partyW;
        } else {
            score -= weights.partyW;
        }
    }

    if(preference.isWeed) {
        if(property.AllowWeed) {
            score += weights.weedW;
        } else {
            score -= weights.weedW;
        }
    }

    if(preference.isAC) {
        if(property.isAC) {
            score += weights.acW;
        } else {
            score -= weights.acW;
        }
    }

    if(preference.isFurnished) {
        if(property.isFurnished) {
            score += weights.furnishW;
        } else {
            score -= weights.furnishW;
        }
    }

    if(preference.isHeater) {
        if(property.isHeater) {
            score += weights.heatW;
        } else {
            score -= weights.heatW;
        }
    }
    return score;
}

router.get('/preferProperties/:tenantID', async (req, res) => {
    const { tenantID } = req.params;
    try {
        unmatchedProperties = await getUnmatchedProperties(tenantID);

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
