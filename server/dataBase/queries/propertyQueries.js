const Property = require("../models/PropertySchema");

const propertyQueries = {
    getAllProperties: async () => {
        try {
            return await Property.find();
        } catch (err) {
            throw new Error('Failed to find all Properties, ' + err.message);
        }
    },
    createProperty: async (propertyData) => {
        try {
            const newProperty = new Property(propertyData);
            return await newProperty.save();
        } catch (err) {
            throw new Error('Failed to create property, ' + err.message);
        }
    },
    editProperty: async (HouseID, data) => {
        try {
            return await Property.findOneAndUpdate({HouseID}, data, {new: true});
        } catch (err) {
            throw new Error('Failed to update property, ' + err.message);
        }
    }
}

module.exports = propertyQueries;
