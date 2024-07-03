const mongoose = require('mongoose');

const TenantSchema = new mongoose.Schema({
    TenantID: { type: String, ref: 'User', required: true, unique: true },
    Occupation: { type: String },
    Company: { type: String },
    Income: { type: Number },
    Habit: { type: String },
    TenantPreferenceID: { type: String, required: true, unique: true },
    Gender: { type: String, required: true },
    Age: { type: Number },
});

module.exports = mongoose.model('Tenant', TenantSchema);
