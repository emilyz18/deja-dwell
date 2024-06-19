var express = require('express');
var bodyParser = require('body-parser');
//var bcrypt = require('bcryptjs');
var crypto = require('crypto');
var path = require('path');
var fs = require('fs');
const { v4: uuid } = require('uuid');

var router = express.Router();


const usersFilePath = path.join(__dirname, '../mockData/Users.json');
const data = fs.readFileSync(usersFilePath, 'utf8');
users = JSON.parse(data);


const writeUsersFile = () => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};


router.post('/register', (req, res) => {
  const userdata = req.body.user;
  const email = userdata.UserEmail;
  const password = userdata.Password;
  const userName = userdata.UserName;
  const user = users.find(u => u.UserEmail === email);
  if (user) {
    res.status(401).json({ message: 'Email Already have account!' });
  } else {
    const userId = uuid();
    const hashKey = crypto.randomBytes(16).toString('hex');
    const newUser = { UserID: userId, UserName: userName, Password: password, UserEmail: email, HashKey: hashKey }
    users.push(newUser);
    writeUsersFile();
    res.status(201).json({ message: 'User registered', Auth: true, User: newUser});
  }
});


router.post('/login', (req, res) => {
  const userdata = req.body.user;
  const email = userdata.Email;
  const password = userdata.Password;
  const user = users.find(u => u.UserEmail === email);
  if (user && password === user.Password) {
    const hashKey = crypto.randomBytes(16).toString('hex');
    user.HashKey = hashKey;
    users.map(curr_user => {
      if(curr_user.UserID === email) {
        curr_user.HashKey = hashKey;
      }
    });
    res.status(200).json({ Auth: true, User: user});
  } else {
    res.status(401).json({ message: 'No such user or password not match' });
  }
});

router.get('/:userID', (req, res) => {
  const { userID } = req.params;
  const user = users.find(u => u.UserID === userID);
  if (user) {
    return res.json(user);
  } else {
    return res.status(404).send(`User with id ${userID} not found in server/user.js `);
  }
});


router.patch('/edit', (req, res) => {
  const userdata = req.body.user;
  console.log(userdata, "req, body in path edit");

  const userID = userdata.UserID;
  console.log(userID, "userId FROM req, body in path edit");

  const userIndex = users.findIndex(u => u.UserID === userID);

  if (userIndex >= 0) {
    users[userIndex] = { ...users[userIndex], ...userdata };
    writeUsersFile();
    return res.status(200).json(users[userIndex]);
  } else {
    // console.log("userIndex:", userIndex);
    return res.status(404).json({ message: `userIndex ${userIndex}, No such user for update` });
  }
});


module.exports = router;