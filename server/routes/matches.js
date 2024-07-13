const express = require('express');
const router = express.Router();
const matchQueries = require('../dataBase/queries/matchQueries');

// Get all matches
router.get('/', async (req, res) => {
    try {
        const matches = await matchQueries.getAllMatches();
        res.json(matches);
    } catch (err) {
        res.status(500).send('Error loading matches data: ' + err.message);
    }
});

// Create a new match
router.post('/', async (req, res) => {
    const newMatch = req.body;

    try {
        const createdMatch = await matchQueries.createMatch(newMatch);
        res.status(201).json(createdMatch);
    } catch (err) {
        res.status(500).send('Error creating match: ' + err.message);
    }
});

// Update match status
router.patch('/:matchId', async (req, res) => {
    const { matchId } = req.params;
    const { MatchStatus } = req.body;

    if (!MatchStatus) {
        return res.status(400).send('Missing MatchStatus');
    }

    try {
        const updatedMatch = await matchQueries.updateMatchStatus(matchId, MatchStatus);
        if (!updatedMatch) {
            return res.status(404).send('Match not found');
        }
        res.json(updatedMatch);
    } catch (err) {
        res.status(500).send('Error updating match: ' + err.message);
    }
});

// Delete a match
router.delete('/:matchId', async (req, res) => {
    const { matchId } = req.params;

    try {
        const deletedMatch = await matchQueries.deleteMatch(matchId);
        if (!deletedMatch) {
            return res.status(404).send('Match not found');
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).send('Error deleting match: ' + err.message);
    }
});

module.exports = router;
