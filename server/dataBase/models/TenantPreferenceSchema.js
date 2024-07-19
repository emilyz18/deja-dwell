const mongoose = require('mongoose')

const TenantPreferenceSchema = new mongoose.Schema({
  TenantPreferenceID: {
    type: String,
    ref: 'Tenant',
    unique: true,
    required: true,
  },
  Province: { type: String },
  City: { type: String },
  Street: { type: String },
  MaxPrice: { type: Number },
  StartDate: { type: Date },
  EndDate: { type: Date },
  NumBedroom: { type: Number },
  NumBathroom: { type: Number },
  isOwnPet: { type: Boolean },
  isSmoke: { type: Boolean },
  isParty: { type: Boolean },
  isWeed: { type: Boolean },
  isAC: { type: Boolean },
  isFurnished: { type: Boolean },
  isHeater: { type: Boolean },
  NumOfParking: { type: Number },
  NumOfResident: { type: Number },
})

module.exports = mongoose.model('TenantPreference', TenantPreferenceSchema)
