const mongoose = require('mongoose')

const LandlordSchema = new mongoose.Schema({
  LandlordID: { type: String, ref: 'User', unique: true },
  HouseID: { type: String, ref: 'Property', unique: true },
})

module.exports = mongoose.model('Landlord', LandlordSchema)
