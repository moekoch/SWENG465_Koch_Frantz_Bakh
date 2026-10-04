//GET - Get all sessions' info
const sessions = require('./sessionStore');

function getSessions(req, res) {
  const allSessions = Array.from(sessions.values());

  return res.status(200).json(allSessions);
}

module.exports = getSessions;