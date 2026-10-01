/**
 * @swagger
 * tags:
 *   - name: Session
 *     description: API endpoints for managing sessions
 */

/**
 * @swagger
 * /api/sessions:
 *   post:
 *     summary: Create a new session
 *     tags: [Session]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The session's ID
 *                 example: 123
 *     responses:
 *       201:
 *         description: Session created successfully
 *       400:
 *         description: ID is required
 */
router.post('/api/sessions', createSession);

/**
 * @swagger
 * /api/sessions:
 *   get:
 *     summary: Get all sessions
 *     tags: [Session]
 *     responses:
 *       200:
 *         description: A list of sessions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The session ID
 *                     example: 123
 */
router.get('/api/sessions', (req, res) => {
  res.status(200).json([]);
});

/**
 * @swagger
 * /api/sessions/{id}:
 *   get:
 *     summary: Get session info by ID
 *     tags: [Session]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The session ID
 *     responses:
 *       200:
 *         description: Session found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The session ID
 *                   example: 123
 *       404:
 *         description: Session not found
 */
router.get('/api/sessions/:id', (req, res) => {
  const sessionId = parseInt(req.params.id, 10);
  if (sessionId === 123) {
    res.status(200).json({ id: 123 });
  } else {
    res.status(404).json({ message: 'Session not found' });
  }
});

/**
 * @swagger
 * /api/sessions/{id}:
 *   put:
 *     summary: Update session info by ID
 *     tags: [Session]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The session ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 description: The session ID
 *                 example: 123
 *     responses:
 *       200:
 *         description: Session updated successfully
 *       404:
 *         description: Session not found
 */
router.put('/api/sessions/:id', (req, res) => {
  const sessionId = parseInt(req.params.id, 10);
  if (sessionId === 123) {
    res.status(200).json({ id: 123 });
  } else {
    res.status(404).json({ message: 'Session not found' });
  }
});

/**
 * @swagger
 * /api/sessions/{id}:
 *   delete:
 *     summary: Delete a session by ID
 *     tags: [Session]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The session ID
 *     responses:
 *       200:
 *         description: Session deleted successfully
 *       404:
 *         description: Session not found
 */
router.delete('/api/sessions/:id', (req, res) => {
  const sessionId = parseInt(req.params.id, 10);
  if (sessionId === 123) {
    res.status(200).json({ message: 'Session deleted successfully' });
  } else {
    res.status(404).json({ message: 'Session not found' });
  }
});