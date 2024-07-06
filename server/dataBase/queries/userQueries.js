const User = require('../models/UserSchema');

const userQueries = {
    signIn: async function (email) {
        try {
            return await User.findOne({ email });
        } catch (err) {
            throw new Error('Failed to find user using email and password, Error sign in user: ' + err.message);
        }
    }, 
    
    signUp: async function (data) {
        try {
            const user = new User(data);
            return await user.save();

        } catch (error) {
            throw new Error('Failed sign up user' + error.messages);
        }
    },
    editProfile: async function (id, data) {
        try {

            const newUserProfile = await User.findOneAndUpdate({ id }, data, { new: true });
            // console.log(newUserProfile);
            return newUserProfile;

        } catch (error) {
            throw new Error('Failed updating user profile to mongoDB' + error.messages);
        }
    },
    getUser: async function (userID) {
        try {
            return await User.findOne({ userID });
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
    }

}

module.export = userQueries;

