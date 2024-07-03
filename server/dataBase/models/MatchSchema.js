const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
    MatchID: { type: String, required: true, unique: true },
    TenantID: { type: String },
    LandlordID: { type: String },
    HouseID: { type: String },
    MatchStatus: { type: String, enum: ['Applied', 'Disliked', 'Accepted', 'Rejected'], required: true }
});

module.exports = mongoose.model('Match', MatchSchema);