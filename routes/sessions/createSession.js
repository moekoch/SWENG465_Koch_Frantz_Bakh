//POST - create a new session
const createSession = (req, res) => {
  const { id } = req.body;

  if (id === undefined || id === null || id === '') {
    return res.status(400).json({
      message: 'ID is required'
    });
  }

  const sessionId = Number(id);

  if (!Number.isInteger(sessionId)) {
    return res.status(400).json({
      message: 'ID must be an integer'
    });
  }

  if (sessions.has(sessionId)) {
    return res.status(409).json({
      message: 'A session with this ID already exists'
    });
  }

  const session = { id: sessionId };
  sessions.set(sessionId, session);
  return res.status(201).json(session);
}

module.exports = createSession;