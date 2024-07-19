const mongoose = require('mongoose')

const PropertySchema = new mongoose.Schema({
  HouseID: { type: String, required: true, unique: true },
  LandlordID: { type: String, ref: 'User', required: true, unique: true },
  AllowPet: { type: Boolean },
  AllowSmoke: { type: Boolean },
  AllowParty: { type: Boolean },
  AllowWeed: { type: Boolean },
  isAC: { type: Boolean },
  isFurnished: { type: Boolean },
  isHeater: { type: Boolean },
  ExpectedPrice: { type: Number },
  Province: { type: String },
  City: { type: String },
  Street: { type: String },
  StartDate: { type: Date },
  EndDate: { type: Date },
  NumOfParking: { type: Number },
  NumOfResident: { type: Number },
  NumBedroom: { type: Number },
  NumBathroom: { type: Number },
  Title: { type: String },
  Description: { type: String },
  HouseImgs: [{ src: String, alt: String }],
})

module.exports = mongoose.model('Property', PropertySchema)
