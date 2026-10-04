/**
 * @swagger
 * tags:
 *   - name: Message
 *     description: API endpoints for managing messages
 */

/**
 * @swagger
 * tags:
 *   - name: Message
 *     description: API endpoints for managing messages
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - chatID
 *         - userID
 *         - body
 *         - sentAt
 *       properties:
 *         _id:
 *           type: string
 *           description: MongoDB generated ID
 *           example: 68e2f987654321abcdef456
 *         chatID:
 *           type: string
 *           description: ID of the chat containing the message
 *           example: 68e2f123456789abcdef123
 *         userID:
 *           type: string
 *           description: ID of the user who sent the message
 *           example: 68e2f555555555abcdef789
 *         body:
 *           type: string
 *           description: Text content of the message
 *           example: Hey, are you ready to start?
 *         sentAt:
 *           type: string
 *           format: date-time
 *           description: Date and time the message was sent
 *           example: 2026-10-04T18:35:00.000Z
 */