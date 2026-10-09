/**
 * @swagger
 * tags:
 *   - name: User
 *     description: API endpoints for managing users
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *         - id
 *       properties:
 *         _id:
 *           type: string
 *           readOnly: true
 *           description: MongoDB generated ID
 *           example: 507f1f77bcf86cd799439011
 *         username:
 *           type: string
 *           description: Unique username used to log in
 *           example: testuser
 *         email:
 *           type: string
 *           description: Email of the user, stored lowercase and must be unique
 *           example: jane.doe@example.com
 *         password:
 *           type: string
 *           writeOnly: true
 *           minLength: 8
 *           description: Plain-text password of at least 8 characters, it is hashed before storage and never returned
 *           example: password123
 *         id:
 *           type: integer
 *           description: Unique identifier for the user
 *           example: 1
 */