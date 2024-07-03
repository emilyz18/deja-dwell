const mongoose = require('mongoose');

const LandlordSchema = new mongoose.Schema({
    LandlordID: { type: String, required: true, unique: true },
    HouseID: { type: String, unique: true }
});

module.exports = mongoose.model('Landlord', LandlordSchema);
