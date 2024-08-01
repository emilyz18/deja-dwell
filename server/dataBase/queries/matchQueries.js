const Match = require('../models/MatchSchema')

const matchQueries = {
  getAllMatches: async () => {
    try {
      return await Match.find()
    } catch (err) {
      throw new Error('Failed to find all Matches, ' + err.message)
    }
  },
  createMatch: async (matchData) => {
    try {
      const newMatch = new Match(matchData)
      return await newMatch.save()
    } catch (err) {
      throw new Error('Failed to create match, ' + err.message)
    }
  },
  updateMatchStatus: async (MatchID, MatchStatus) => {
    try {
      return await Match.findOneAndUpdate(
        { MatchID },
        { $set: { MatchStatus } },
        { new: true }
      )
    } catch (err) {
      throw new Error('Failed to update match status, ' + err.message)
    }
  },
  deleteMatch: async (MatchID) => {
    try {
      return await Match.findOneAndDelete({ MatchID })
    } catch (err) {
      throw new Error('Failed to delete match, ' + err.message)
    }
  },
}

module.exports = matchQueries
