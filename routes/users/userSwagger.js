/**
 * @swagger
 * tags:
 *   - name: User
 *     description: API endpoints for managing users
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: The user's email address
 *                 example: john.doe@example.com
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Name and email are required
 */
router.post('/api/users', createUser);

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: The user ID
 *                     example: 1
 *                   name:
 *                     type: string
 *                     description: The user's name
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     description: The user's email address
 *                     example: john.doe@example.com
 */
router.get('/api/users', (req, res) => {
  res.status(200).json([]);
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The user ID
 *                   example: 1
 *                 name:
 *                   type: string
 *                   description: The user's name
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   description: The user's email address
 *                   example: john.doe@example.com
 *       404:
 *         description: User not found
 */
router.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  if (userId === 1) {
    res.status(200).json({ id: 1, name: 'John Doe', email: 'john.doe@example.com' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name
 *                 example: John Doe Updated
 *               email:
 *                 type: string
 *                 description: The user's email address
 *                 example: john.doe.updated@example.com
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  if (userId === 1) {
    res.status(200).json({ id: 1, name: req.body.name, email: req.body.email });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  if (userId === 1) {
    res.status(200).json({ message: 'User deleted successfully' });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});