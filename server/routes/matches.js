const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const matchesFilePath = path.join(__dirname, '../mockData/Match.json');

const loadMatchesJson = () => {
    try {
        const data = fs.readFileSync(matchesFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading matches data:', err);
        return null;
    }
};

const saveMatchesJson = (data) => {
    fs.writeFileSync(matchesFilePath, JSON.stringify(data, null, 2), 'utf8');
};

router.get('/', (req, res) => {
    const matches = loadMatchesJson();
    if (!matches) {
        return res.status(500).send('Error loading matches data');
    }
    res.json(matches);
});

router.post('/', (req, res) => {
    const newMatch = req.body;
    const matches = loadMatchesJson();
    if (!matches) {
        return res.status(500).send('Error loading matches data');
    }
    matches.push(newMatch);
    saveMatchesJson(matches);
    res.status(201).json(newMatch);
});

router.patch('/:matchId', (req, res) => {
    const { matchId } = req.params;
    const matchUpdates = req.body;

    const matches = loadMatchesJson();
    if (!matches) {
        return res.status(500).send('Error loading matches data');
    }

    const matchIndex = matches.findIndex((match) => match.MatchID === matchId);
    if (matchIndex === -1) {
        return res.status(404).send('Match not found');
    }

    matches[matchIndex] = { ...matches[matchIndex], ...matchUpdates };
    saveMatchesJson(matches);
    res.json(matches[matchIndex]);
});

router.delete('/:matchId', (req, res) => {
    const { matchId } = req.params;

    const matches = loadMatchesJson();
    if (!matches) {
        return res.status(500).send('Error loading matches data');
    }

    const updatedMatches = matches.filter((match) => match.MatchID !== matchId);
    saveMatchesJson(updatedMatches);
    res.status(204).send();
});

module.exports = router;
