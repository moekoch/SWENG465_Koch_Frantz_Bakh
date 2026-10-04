//PUT - Update one session's info
const updateSession = (req, res) => {
  const sessionId = Number(req.params.id);

  if (!Number.isInteger(sessionId)) {
    return res.status(400).json({
      message: 'Session ID must be an integer'
    });
  }

  const existingSession = sessions.get(sessionId);

  if (!existingSession) {
    return res.status(404).json({
      message: 'Session not found'
    });
  }

  const updatedSession = {
    ...existingSession,
    ...req.body,
    id: sessionId
  };

  sessions.set(sessionId, updatedSession);

  return res.status(200).json(updatedSession);
}

module.exports = updateSession;