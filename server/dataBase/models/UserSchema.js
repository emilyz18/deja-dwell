const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  UserID: { type: String, required: true, unique: true },
  LandlordID: { type: String, unique: true, sparse: true },
  TenantID: { type: String, unique: true, sparse: true },
  HashKey: { type: String },
  isLandlord: { type: Boolean, default: false },
  isTenant: { type: Boolean, default: false },
  UserName: { type: String, required: true, unique: true },
  UserEmail: { type: String, required: true, unique: true },
  PhoneNumber: { type: String },
  ProfileImg: {
    type: String,
    default: '/images/default_profile_pic.jpg',
  },
  Password: { type: String, required: true },
})

module.exports = mongoose.model('User', UserSchema)
