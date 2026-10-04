/**
 * @swagger
 * tags:
 *   - name: Friend
 *     description: API endpoints for managing users
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Friend:
 *       type: object
 *       required:
 *         - name
 *         - status
 *         - email
 *       properties:
 *         _id:
 *           type: string
 *           description: MongoDB generated ID
 *           example: 507f1f77bcf86cd799439011
 *         name:
 *           type: string
 *           description: Name of the friend
 *           example: John Doe
 *         status:
 *           type: boolean
 *           description: Online status of the friend
 *           example: true
 *         email:
 *           type: string
 *           description: Email of the friend
 *           example: john.doe@example.com
 */