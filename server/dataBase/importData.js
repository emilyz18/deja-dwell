// guided by chagpt 4o model with prompted
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const User = require('./models/UserSchema')
const Landlord = require('./models/LandlordSchema')
const Tenant = require('./models/TenantSchema')
const TenantPreference = require('./models/TenantPreferenceSchema')
const Property = require('./models/PropertySchema')
const Match = require('./models/MatchSchema')

const { db } = require('../db') // Ensure this path is correct

const importData = async () => {
  db.once('open', async () => {
    await User.deleteMany({})
    await Landlord.deleteMany({})
    await Tenant.deleteMany({})
    await TenantPreference.deleteMany({})
    await Property.deleteMany({})
    await Match.deleteMany({})
    try {
      await User.deleteMany({})
      await Landlord.deleteMany({})
      await Tenant.deleteMany({})
      await TenantPreference.deleteMany({})
      await Property.deleteMany({})
      await Match.deleteMany({})

      await mongoose.connection.collection('users').dropIndexes()
      // Read JSON files
      const users = JSON.parse(
        fs.readFileSync(path.join(__dirname, '../mockData/Users.json'), 'utf-8')
      )
      const landlords = JSON.parse(
        fs.readFileSync(
          path.join(__dirname, '../mockData/Landlord.json'),
          'utf-8'
        )
      )
      const tenants = JSON.parse(
        fs.readFileSync(
          path.join(__dirname, '../mockData/Tenant.json'),
          'utf-8'
        )
      )
      const tenantPreferences = JSON.parse(
        fs.readFileSync(
          path.join(__dirname, '../mockData/TenantPreference.json'),
          'utf-8'
        )
      )
      const properties = JSON.parse(
        fs.readFileSync(
          path.join(__dirname, '../mockData/Properties.json'),
          'utf-8'
        )
      )
      const matches = JSON.parse(
        fs.readFileSync(path.join(__dirname, '../mockData/Match.json'), 'utf-8')
      )

      // Import data to MongoDB
      await User.insertMany(users)
      await Landlord.insertMany(landlords)
      await Tenant.insertMany(tenants)
      await TenantPreference.insertMany(tenantPreferences)
      await Property.insertMany(properties)
      await Match.insertMany(matches)

      console.log('Data imported successfully')
      process.exit()
    } catch (err) {
      console.error(err)
      process.exit(1)
    }
  })
  db.on('error', (err) => {
    console.error(`connection error when importing data: ${err}`)
  })
}

importData()
