const mongoose = require('mongoose');

const TenantSchema = new mongoose.Schema({
    TenantID: { type: String, required: true, unique: true },
    TenantPreferenceID: { type: String, unique: true },
    Gender: { type: String, required: true },
    Age: { type: Number },
    Occupation: { type: String },
    Company: { type: String },
    Income: { type: Number },
    Habit: { type: String }
});

module.exports = mongoose.model('Tenant', TenantSchema);
