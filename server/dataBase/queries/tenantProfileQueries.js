const Tenant = require('../models/TenantSchema');
const Tenant = require('../models/TenantSchema');

const tenantProfileQueries = {
    editTenantProfile: async function (tenantID, data) {
        try {

            const newTenantProfile = await Tenant.findOneAndUpdate({ tenantID }, data, { new: true });
            return newTenantProfile;
        } catch (error) {
            throw new Error('Failed updating tenant profile to mongoDB' + error.messages);
        }
    },
    getOneTenantProfile: async function (tenantID) {
        try {
            return await Tenant.findOne({ tenantID });
        } catch (err) {
            throw new Error('Failed to find tenant profile using ID, ' + err.message);
        }
    },
    getAllTenantProfile: async function () {
        try {
            return await Tenant.find();
        } catch (err) {
            throw new Error('Failed to find all tenant profile, ' + err.message);
        }
    },
    creatTenantProfile: async function (data) {
        try {
            const tenant = new Tenant(data);
            return await tenant.save();
        } catch (error) {
            throw new Error('Failed create tenant profile when sign up' + error.messages);
        }
    }
}

module.export = tenantProfileQueries;

