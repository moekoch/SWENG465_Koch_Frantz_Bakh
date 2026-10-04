//DELETE - delete one session
const deleteSession = (req, res) =>{
  const sessionId = Number(req.params.id);

  if (!Number.isInteger(sessionId)) {
    return res.status(400).json({
      message: 'Session ID must be an integer'
    });
  }
  if (!sessions.has(sessionId)) {
    return res.status(404).json({
      message: 'Session not found'
    });
  }
  sessions.delete(sessionId);
  return res.status(200).json({
    message: 'Session deleted successfully'
  });
}

module.exports = deleteSession;