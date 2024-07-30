const express = require('express')
const router = express.Router()
const matchQueries = require('../dataBase/queries/matchQueries')
const tenantPrefQueries = require('../dataBase/queries/tenantPrefQueries')
const tenantProfileQueries = require('../dataBase/queries/tenantProfileQueries')
const userQueries = require('../dataBase/queries/userQueries')
const { v4: uuid } = require('uuid')


// Create a new match
router.post('/', async (req, res) => {
  let newMatch = req.body

  try {
    const existingMatch = await matchQueries.findMatchWithIds(newMatch.HouseID, newMatch.TenantID);
    if (existingMatch) {
      return res.status(409).json({ message: 'Duplicate match exists' });
    }
    const matchID = uuid()
    newMatch.MatchID = matchID;

    const createdMatch = await matchQueries.createMatch(newMatch)
    res.status(201).json(createdMatch)
  } catch (err) {
    res.status(500).send('Error creating match: ' + err.message)
  }
})

// Update match status
router.patch('/:matchId', async (req, res) => {
  const { matchId } = req.params
  const { MatchStatus } = req.body

  if (!MatchStatus) {
    return res.status(400).send('Missing MatchStatus')
  }

  try {
    if (MatchStatus == 'Accepted') {
      const allMatch = await matchQueries.getAllMatches();
      const acceptedMatch = allMatch.find(match => (match.MatchID === matchId));
      const rejectedMatches = allMatch.filter(match => (match.MatchID !== matchId && match.HouseID === acceptedMatch.HouseID));
      await Promise.all(
        rejectedMatches.map((rejectedMatch) => {
          matchQueries.updateMatchStatus(rejectedMatch.MatchID, 'Rejected')
        })
      )
    }
    const updatedMatch = await matchQueries.updateMatchStatus(
      matchId,
      MatchStatus
    )
    if (!updatedMatch) {
      return res.status(404).send('Match not found')
    }
    res.json(updatedMatch)
  } catch (err) {
    res.status(500).send('Error updating match: ' + err.message)
  }
})

// Delete a match
router.delete('/:matchId', async (req, res) => {
  const { matchId } = req.params

  try {
    const deletedMatch = await matchQueries.deleteMatch(matchId)
    if (!deletedMatch) {
      return res.status(404).send('Match not found')
    }
    res.status(204).send()
  } catch (err) {
    res.status(500).send('Error deleting match: ' + err.message)
  }
})

// Get all match-detail-info under the given landlord
router.get('/landlord/:landlordId', async (req, res) => {
  const { landlordId } = req.params
  try {
    const matches = await matchQueries.getAllMatches(landlordId)
    const activedMatches = matches.filter(
      (match) =>
        match.MatchStatus !== 'Rejected' &&
        match.MatchStatus !== 'Disliked' &&
        match.LandlordID === landlordId
    )
    const tenantPrefs = await tenantPrefQueries.getAllTenantPrefs()
    const tenantProfiles = await tenantProfileQueries.getAllTenantProfile()
    const users = await userQueries.getUsers()

    const combinedResults = activedMatches.map((match) => {
      const tenantID = match.TenantID

      const tenantProfile = tenantProfiles.find(
        (profile) => profile.TenantID === tenantID
      )
      const userProfile = users.find((user) => user.TenantID === tenantID)

      const tenantPreference = tenantProfile
        ? tenantPrefs.find(
            (pref) =>
              pref.TenantPreferenceID === tenantProfile.TenantPreferenceID
          )
        : null

      return {
        name: userProfile ? userProfile.UserName : null,
        image: userProfile ? userProfile.ProfileImg : null,
        phoneNumber: userProfile ? userProfile.PhoneNumber : null,
        email: userProfile ? userProfile.UserEmail : null,
        gender: tenantProfile ? tenantProfile.Gender : null,
        age: tenantProfile ? tenantProfile.Age : null,
        familySize: tenantPreference ? tenantPreference.NumOfResident : null,
        occupation: tenantProfile ? tenantProfile.Occupation : null,
        startDate: tenantPreference ? tenantPreference.StartDate : null,
        endDate: tenantPreference ? tenantPreference.EndDate : null,
        earlyBirdNightOut: tenantProfile ? tenantProfile.Habit : null,
        financialSituation: `Income: ${tenantProfile ? tenantProfile.Income : null}, Company: ${tenantProfile ? tenantProfile.Company : null}`,
        matchID: match.MatchID,
        landlordID: match.LandlordID,
        houseID: match.HouseID,
        tenantID: match.TenantID,
        matchStatus: match.MatchStatus,
      }
    })
    return res.json(combinedResults)
  } catch (err) {
    res.status(500).send('Error loading matches data: ' + err.message)
  }
})

router.get('/tenant/:tenantId', async (req, res) => {
  const { tenantId } = req.params
  try {
    const matches = await matchQueries.getAllMatches()
    const tenantMatches = matches.filter((match) => match.TenantID === tenantId)
    return res.json(tenantMatches)
  } catch (err) {
    res.status(500).send('Error loading matches data: ' + err.message)
  }
})

router.post('/reopen/:houseID', async (req, res) => {
  const { houseID } = req.params
  try {
    const matches = await matchQueries.getAllMatches()
    const houseMatches = matches.filter(match => (match.HouseID === houseID));
    await Promise.all(
      houseMatches.map(houseMatch => {
        matchQueries.updateMatchStatus(houseMatch.MatchID, 'Applied')
      }
      )
    );
    return res.status(201).send('Matches Reopened!');
  } catch (err) {
    res.status(500).send('Error reopen matches data: ' + err.message);
  }
})
module.exports = router
