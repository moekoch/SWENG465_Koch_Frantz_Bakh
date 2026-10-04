/**
 * @swagger
 * tags:
 *   - name: Avatar
 *     description: API endpoints for managing avatars
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Avatar:
 *       type: object
 *       required:
 *         - name
 *         - color
 *         - price
 *       properties:
 *         _id:
 *           type: string
 *           description: MongoDB generated ID
 *           example: 68e2f123456789abcdef123
 *         name:
 *           type: string
 *           description: Name of the avatar
 *           example: Koi
 *         color:
 *           type: string
 *           description: Color of the avatar
 *           example: blue
 *         price:
 *           type: number
 *           description: Price of the avatar
 *           example: 100
 */