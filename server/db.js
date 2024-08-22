const mongoose = require('mongoose')

function connectDB() {
  const url = process.env.MONGO_URI

  try {
    mongoose.connect(url)
  } catch (err) {
    console.error(err.message)
    process.exit(1)
  }
  const dbConnection = mongoose.connection

  dbConnection.once('open', () => {
    console.log(`Database connected`)
  })

  dbConnection.on('error', (err) => {
    console.error(`connection error: ${err}`)
  })

  return dbConnection
}

const db = connectDB()

exports.db = db
