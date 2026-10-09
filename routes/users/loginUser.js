// routes/users/loginUser.js
const bcrypt = require('bcrypt');
const { getDB } = require('../../services/database');

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Log in
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [username, email, password]
 *             properties:
 *               username: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Missing fields
 *       401:
 *         description: Invalid username, email, or password
 *       404:
 *         description: No account uses that username or email (code ACCOUNT_NOT_FOUND)
 */
async function loginUser(req, res) {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const user = await getDB().collection('users').findOne({ username });

        const ok = user?.passwordHash && (await bcrypt.compare(password, user.passwordHash));
        if (!ok) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // never send the hash back
        res.json({ id: user._id, username: user.username, email: user.email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = loginUser;