require('dotenv').config()
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var cors = require('cors')
const bodyParser = require('body-parser')

var indexRouter = require('./routes/index')
var propertiesRouter = require('./routes/properties')
var userRouter = require('./routes/user')
var tenantProfileRouter = require('./routes/tenantsProfile')
var tenantPrefRouter = require('./routes/tenantsPref')
var matchesRouter = require('./routes/matches')
var landlordRouter = require('./routes/landlord')

var app = express()

// for payload to large
app.use(bodyParser.json({ limit: '50mb' })) // Increase payload limit
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

console.log(`Serving static files from: ${path.join(__dirname, 'dist')}`)
app.use(express.static(path.join(__dirname, 'dist')))

app.use(cors())
app.use('/', indexRouter)
app.use('/api/properties', propertiesRouter)
app.use('/api/user', userRouter)
app.use('/api/tenantsprofile', tenantProfileRouter)
app.use('/api/tenantspref', tenantPrefRouter)
app.use('/api/matches', matchesRouter)
app.use('/api/landlord', landlordRouter)

// Wild care routing to serve login page on refresh
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

module.exports = app
