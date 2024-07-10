
const User = require('../models/UserSchema');
const userQueries = {
    signIn: async function (email,password) {
        try {
            const user = await User.findOne({ UserEmail: email, Password: password });
            return user;
        } catch (err) {
            throw new Error('Error signing in user: ' + err.message);
        }
    }, 
    
    signUp: async function (data) {
        try {
            const user = new User(data);
            return await user.save();

        } catch (error) {
            throw new Error('Failed sign up user ' + error.message);
            
        }
    },
    editProfile: async function (userID, data) {
        try {

            const newUserProfile = await User.findOneAndUpdate({ UserID: userID }, data, { new: true });
            return newUserProfile;

        } catch (error) {
            throw new Error('Failed updating user profile to mongoDB' + error.message);
        }
    },
    getUserByID: async function (userID) {
        try {
            return await User.findOne({ UserID: userID });
        } catch (err) {
            throw new Error('Failed to find user using ID, ' + err.message);
        }
    },
    getUsers: async function () {
        try {
            return await User.find();
        } catch (err) {
            throw new Error('Failed to find all users, ' + err.message);
        }
    },
    findUserByEmail: async function (email) {
        try {
            return await User.findOne({ UserEmail: email });
        } catch (err) {
            throw new Error('Failed to find user by email: ' + err.message);
        }
    }

}

module.exports = userQueries;

