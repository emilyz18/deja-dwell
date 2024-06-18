var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');



const usersFilePath = path.join(__dirname, '../mockData/Users.json');
let users = [];

// Load user data from the JSON file at startup
try {
  const data = fs.readFileSync(usersFilePath, 'utf8');
  users = JSON.parse(data);
} catch (err) {
  console.error('Error reading user data', err);
}

// console.log(users); 

router.get('/:userId', function (req, res, next) {
  const user = users.find(u => u.UserID === req.params.userId);
  if (user) {
    console.log(res.json(user));
    res.json(user);
  } else {
    res.status(404).send('User not found, ${u.UserID},${req.params.userId}');
  }
});

module.exports = router;