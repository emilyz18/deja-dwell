var express = require('express')
var crypto = require('crypto')
const jwt = require('jsonwebtoken')

// const { db } = require('../db')
const { v4: uuid } = require('uuid')

const userQueries = require('../dataBase/queries/userQueries')
const tenantProfileQueries = require('../dataBase/queries/tenantProfileQueries')
const tenantPrefQueries = require('../dataBase/queries/tenantPrefQueries')
const landlordQueries = require('../dataBase/queries/landlordQueries')

var router = express.Router()

const newTenantProfile = (userId, tenantID, tenantPreferenceID) => ({
  TenantID: tenantID,
  UserID: userId,
  TenantPreferenceID: tenantPreferenceID,
  Age: null,
  Gender: null,
  Occupation: null,
  Income: null,
  Company: null,
  Habit: null,
})

const newTenantPref = (tenantID, tenantPreferenceID) => ({
  TenantPreferenceID: tenantPreferenceID,
  TenantID: tenantID,
  Province: null,
  City: null,
  Street: null,
  ExpectedPrice: null,
  MaxPrice: null,
  StartDate: null,
  EndDate: null,
  Duration: null,
  RoomType: null,
  isOwnPet: false,
  isSmoke: false,
  isParty: false,
  isWeed: false,
  NumOfParking: null,
  NumOfResident: null,
})

const newLandlord = (landlordId, houseID) => ({
  LandlordID: landlordId,
  HouseID: houseID,
})

router.post('/register', async (req, res) => {
  const userdata = req.body.user
  const email = userdata.Email
  const password = userdata.Password
  const userName = userdata.UserName
  const accountType = userdata.accountType

  if (!email) {
    res.status(402).json({ message: 'No email!!' })
  }

  const user = await userQueries.findUserByEmail(email)
  if (user) {
    return res.status(401).json({ message: 'Email Already have account!' })
  } else {
    const userId = uuid()
    const hashKey = crypto.randomBytes(16).toString('hex')
    const newUser = {
      UserID: userId,
      UserName: userName,
      Password: password,
      UserEmail: email,
      HashKey: hashKey,
      ProfileImg: '/images/default_profile_pic.jpg',
    }

    if (accountType === 'Landlord') {
      newUser.isLandlord = true
      newUser.isTenant = false
      const landlordId = uuid()
      newUser.LandlordID = landlordId
      const houseID = uuid()

      try {
        await userQueries.signUp(newUser)
        await landlordQueries.creatLandlord(newLandlord(landlordId, houseID))
      } catch (error) {
        return res.status(401).json({ message: error.message })
      }
    } else {
      newUser.isLandlord = false
      newUser.isTenant = true
      const tenantId = uuid()
      newUser.TenantID = tenantId
      const tenantPrefID = uuid()

      try {
        await userQueries.signUp(newUser)
        await tenantProfileQueries.creatTenantProfile(
          newTenantProfile(userId, tenantId, tenantPrefID)
        )
        await tenantPrefQueries.creatTenantPref(
          newTenantPref(tenantId, tenantPrefID)
        )
      } catch (error) {
        return res.status(401).json({ message: error.message })
      }
    }

    res
      .status(201)
      .json({ message: 'User registered', Auth: true, User: newUser })
  }
})

router.post('/login', async (req, res) => {
  const userdata = req.body.user
  const email = userdata.Email
  const password = userdata.Password

  try {
    const user = await userQueries.signIn(email, password)

    user.HashKey = crypto.randomBytes(16).toString('hex')
    await user.save()

    const userForToken = {
      UserEmail: user.UserEmail,
      UserID: user.UserID,
    }

    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: '1h',
    })

    res.status(200).json({ Auth: true, User: user, token })
  } catch (err) {
    res.status(401).json({ message: err.message })
  }
})

router.get('/:userID', async (req, res) => {
  const { userID } = req.params
  try {
    const user = await userQueries.getUserByID(userID)
    if (user) {
      return res.json(user)
    } else {
      return res.status(404).send(`User with id: ${userID} not found`)
    }
  } catch (err) {
    return res.status(500).send(`Error getting user: ${err.message}`)
  }
})

router.get('/', async (req, res) => {
  try {
    const users = await userQueries.getUsers()
    return res.json(users)
  } catch (err) {
    return res.status(500).send(`Error getting all users: ${err.message}`)
  }
})

router.patch('/edit', async (req, res) => {
  const userdata = req.body.user
  const userID = userdata.UserID

  try {
    const updatedUser = await userQueries.editProfile(userID, userdata) // Using Mongoose query
    if (updatedUser) {
      return res.status(200).json(updatedUser)
    } else {
      return res.status(404).json({ message: `No such user for update` })
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: `Error updating user profile: ${err.message}` })
  }
})

module.exports = router
