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
 *         - name
 *         - email
 *         - id
 *       properties:
 *         _id:
 *           type: string
 *           description: MongoDB generated ID
 *           example: 507f1f77bcf86cd799439011
 *         name:
 *           type: string
 *           description: Name of the user
 *           example: John Doe
 *         email:
 *           type: string
 *           description: Email of the user
 *           example: john.doe@example.com
 *         id:
 *           type: integer
 *           description: Unique identifier for the user
 *           example: 1
 */