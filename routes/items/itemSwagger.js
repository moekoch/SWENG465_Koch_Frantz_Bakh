/**
 * @swagger
 * tags:
 *   - name: Item
 *     description: API endpoints for managing items
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - name
 *         - price
 *       properties:
 *         _id:
 *           type: string
 *           description: MongoDB generated ID
 *           example: 68e2f123456789abcdef123
 *         name:
 *           type: string
 *           description: Name of the item
 *           example: Koi
 *         price:
 *           type: number
 *           description: Price of the item
 *           example: 100
 */