var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

const propertiesFilePath = path.join(__dirname, '../mockData/Properties.json');

router.get('/getProperties', (req, res) => {
    let readError = null;
    let properties = null;
    try {
        const data = fs.readFileSync(propertiesFilePath, 'utf8');
        properties = JSON.parse(data);
    } catch (err) {
        readError = err.message;
    }
    if (!properties) {
        res.status(500).send({ error: readError });
    } else {
        res.status(200).json(properties);
    }
});

module.exports = router;