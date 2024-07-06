const Landlord = require('../models/LandlordSchema');

const landlordQueries = {
    
    getAllLandlords: async function () {
        try {
            return await Landlord.find();
        } catch (err) {
            throw new Error('Failed to find all Landlord, ' + err.message);
        }
    },
    creatLandlord: async function (data) {
        try {
            const landlord = new Landlord(data);
            return await landlord.save();
        } catch (error) {
            throw new Error('Failed create landlord when sign up' + error.messages);
        }
    }

}

module.export = tenantPrefQueries;