/**
 * @swagger
 * tags:
 *   - name: Friend
 *     description: API endpoints for managing friends
 */

/**
 * @swagger
 * /api/friends:
 *   post:
 *     summary: Create a new friend
 *     tags: [Friend]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The friend's name
 *                 example: John Doe
 *               status:
 *                 type: boolean
 *                 description: The friend's online status
 *                 example: true
 *               email:
 *                 type: string
 *                 description: The friend's email address
 *                 example: john.doe@example.com
 *     responses:
 *       201:
 *         description: Friend created successfully
 *       400:
 *         description: Name and email are required
 */
router.post('/api/friends', createFriend);

/**
 * @swagger
 * /api/friends:
 *   get:
 *     summary: Get all friends
 *     tags: [Friend]
 *     responses:
 *       200:
 *         description: A list of friends
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The friend ID
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The friend's name
 *                     example: John Doe
 *                   statis:
 *                     type: boolean
 *                     description: The friend's online status
 *                     example: true
 */
router.get('/api/friends', (req, res) => {
  res.status(200).json([]);
});

/**
 * @swagger
 * /api/friends/{id}:
 *   get:
 *     summary: Get a friend's details by ID
 *     tags: [Friend]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The friend ID
 *     responses:
 *       200:
 *         description: Friend found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The friend ID
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The friend's name
 *                   example: John Doe
 *                 status:
 *                   type: boolean
 *                   description: The friend's online status
 *                   example: true
 *       404:
 *         description: Friend not found
 */
router.get('/api/friends/:id', (req, res) => {
  const friendId = parseInt(req.params.id, 10);
  if (friendId === 1) {
    res.status(200).json({ id: 1, name: 'John Doe', status: true });
  } else {
    res.status(404).json({ message: 'Friend not found' });
  }
});

/**
 * @swagger
 * /api/friends/{id}:
 *   put:
 *     summary: Update a friend's details by ID
 *     tags: [Friend]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The friend ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The friend's name
 *                 example: John Doe Updated
 *               status:
 *                 type: boolean
 *                 description: The friend's online status
 *                 example: true
 *     responses:
 *       200:
 *         description: Friend updated successfully
 *       404:
 *         description: Friend not found
 */
router.put('/api/friends/:id', (req, res) => {
  const friendId = parseInt(req.params.id, 10);
  if (friendId === 1) {
    res.status(200).json({ id: 1, name: req.body.name, status: req.body.status });
  } else {
    res.status(404).json({ message: 'Friend not found' });
  }
});

/**
 * @swagger
 * /api/friends/{id}:
 *   delete:
 *     summary: Delete a friend by ID
 *     tags: [Friend]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The friend ID
 *     responses:
 *       200:
 *         description: Friend deleted successfully
 *       404:
 *         description: Friend not found
 */
router.delete('/api/friends/:id', (req, res) => {
  const friendId = parseInt(req.params.id, 10);
  if (friendId === 1) {
    res.status(200).json({ message: 'Friend deleted successfully' });
  } else {
    res.status(404).json({ message: 'Friend not found' });
  }
});