//GET - get one session's info
const getSession = (req, res) =>{
  const sessionId = Number(req.params.id);

  const session = sessions.get(sessionId);

  if (!session) {
    return res.status(404).json({
      message: 'Session not found'
    });
  }

  return res.status(200).json(session);
}

module.exports = getSession;