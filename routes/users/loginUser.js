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
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Username, email, and password are required' });
        }

        // emails are stored trimmed and lowercase (see createUser)
        const normalizedEmail = String(email).trim().toLowerCase();

        const users = getDB().collection('users');
        const user = await users.findOne({ username, email: normalizedEmail });

        if (!user) {
            // does the username or the email belong to someone?
            const partial = await users.findOne({
                $or: [{ username }, { email: normalizedEmail }]
            });

            if (partial) {
                // an account exists but the details don't match: a normal login failure
                return res.status(401).json({ error: 'Invalid username, email, or password' });
            }

            // nothing matches at all: the frontend can offer to create an account
            return res.status(404).json({
                error: 'No account found.',
                code: 'ACCOUNT_NOT_FOUND'
            });
        }

        const ok = user.passwordHash && (await bcrypt.compare(password, user.passwordHash));
        if (!ok) {
            return res.status(401).json({ error: 'Invalid username, email, or password' });
        }

        // never send the hash back
        res.json({ id: user._id, username: user.username, email: user.email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = loginUser;