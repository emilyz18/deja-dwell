var express = require('express');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var path = require('path');
var fs = require('fs');
const { v4: uuid } = require('uuid');

var router = express.Router();

const usersFilePath = path.join(__dirname, '../mockData/Users.json');
const tenantsFilePath = path.join(__dirname, '../mockData/Tenant.json');
const tenantsPrefFilePath = path.join(__dirname, '../mockData/TenantPreference.json');
const landlordFilePath = path.join(__dirname, '../mockData/Landlord.json');

const loadJsonFile = (filepath) => JSON.parse(fs.readFileSync(filepath, 'utf8'));
users = loadJsonFile(usersFilePath);
tenants = loadJsonFile(tenantsFilePath);
tenantsPrefs = loadJsonFile(tenantsPrefFilePath);
landlords = loadJsonFile(landlordFilePath);

const writeFile = (path, data) => {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
};

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
});

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
});

const newLandlord = (landlordId, houseID) => ({
  LandlordID: landlordId,
  HouseID: houseID,
});

router.post('/register', (req, res) => {
  const userdata = req.body.user;
  const email = userdata.Email;
  const password = userdata.Password;
  const userName = userdata.UserName;
  const accountType = userdata.accountType;

  if (!email) {
    res.status(402).json({ message: 'No email!!' });
  }

  const user = users.find((u) => u.UserEmail === email);
  if (user) {
    res.status(401).json({ message: 'Email Already have account!' });
  } else {
    const userId = uuid();
    const hashKey = crypto.randomBytes(16).toString('hex');
    const newUser = { UserID: userId, UserName: userName, Password: password, UserEmail: email, HashKey: hashKey };

    if (accountType == 'Landlord') {
      newUser.isLandlord = true;
      newUser.isTenant = false;
      const landlordId = uuid();
      newUser.LandlordID = landlordId;
      const houseID = uuid(); // this might need to change to be consistent with properties
      landlords.push(newLandlord(landlordId, houseID));
    } else {
      newUser.isLandlord = false;
      newUser.isTenant = true;
      const tenantId = uuid();
      newUser.TenantID = tenantId;
      const tenantPrefID = uuid();

      tenants.push(newTenantProfile(userId, tenantId, tenantPrefID));
      tenantsPrefs.push(newTenantPref(tenantId, tenantPrefID));
    }

    console.log(newUser);
    users.push(newUser);
    writeFile(usersFilePath, users);
    writeFile(tenantsFilePath, tenants);
    writeFile(tenantsPrefFilePath, tenantsPrefs);
    writeFile(landlordFilePath, landlords);
    res.status(201).json({ message: 'User registered', Auth: true, User: newUser });
  }
});

router.post('/login', (req, res) => {
  const userdata = req.body.user;
  const email = userdata.Email;
  const password = userdata.Password;
  const user = users.find((u) => u.UserEmail === email);

  if (user && password === user.Password) {
    const hashKey = crypto.randomBytes(16).toString('hex');
    user.HashKey = hashKey;
    users = users.map((curr_user) => {
      if (curr_user.UserID === user.UserID) {
        curr_user.HashKey = hashKey;
      }
      return curr_user;
    });
    writeFile(usersFilePath, users);
    res.status(200).json({ Auth: true, User: user });
  } else {
    res.status(401).json({ message: 'No such user or password not match' });
  }
});

router.get('/:userID', (req, res) => {
  const { userID } = req.params;
  const user = users.find((u) => u.UserID === userID);
  if (user) {
    return res.json(user);
  } else {
    return res.status(404).send(`User with id ${userID} not found`);
  }
});

router.patch('/edit', (req, res) => {
  const userdata = req.body.user;
  console.log(userdata, 'req, body in patch edit');

  const userID = userdata.UserID;
  console.log(userID, 'userId FROM req, body in patch edit');

  const userIndex = users.findIndex((u) => u.UserID === userID);

  if (userIndex >= 0) {
    users[userIndex] = { ...users[userIndex], ...userdata };
    writeFile(usersFilePath, users);
    return res.status(200).json(users[userIndex]);
  } else {
    return res.status(404).json({ message: `userIndex ${userIndex}, No such user for update` });
  }
});

module.exports = router;
