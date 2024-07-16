var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var propertiesRouter = require('./routes/properties');
var userRouter = require('./routes/user');
var tenantProfileRouter = require('./routes/tenantsprofile');
var tenantPrefRouter = require('./routes/tenantspref');
var matchesRouter = require('./routes/matches');
var landlordRouter = require('./routes/landlord')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

console.log(`Serving static files from: ${path.join(__dirname, 'public')}`);
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use('/', indexRouter);
app.use('/properties', propertiesRouter);
app.use('/user', userRouter);
app.use('/tenantsprofile', tenantProfileRouter);
app.use('/tenantspref', tenantPrefRouter);
app.use('/matches', matchesRouter);
app.use('/landlord', landlordRouter);


// for payload to large
app.use(bodyParser.json({ limit: '50mb' })); // Increase payload limit
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));



module.exports = app;
