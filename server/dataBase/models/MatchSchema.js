const mongoose = require('mongoose')

const MatchSchema = new mongoose.Schema({
  MatchID: { type: String, required: true, unique: true },
  TenantID: { type: String, ref: 'User', required: true },
  LandlordID: { type: String, ref: 'User', required: true },
  HouseID: { type: String, ref: 'Property', required: true },
  MatchStatus: {
    type: String,
    enum: ['Applied', 'Disliked', 'Accepted', 'Rejected'],
    required: true,
  },
})

MatchSchema.index({ HouseID: 1, TenantID: 1 }, { unique: true });

module.exports = mongoose.model('Match', MatchSchema)
