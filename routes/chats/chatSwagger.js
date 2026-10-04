/**
 * @swagger
 * tags:
 *   - name: Chat
 *     description: API endpoints for managing chats
 */

/**
 * @swagger
 * tags:
 *   - name: Chat
 *     description: API endpoints for managing chats
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Chat:
 *       type: object
 *       required:
 *         - name
 *         - createdAt
 *         - participants
 *       properties:
 *         _id:
 *           type: string
 *           description: MongoDB generated ID
 *           example: 68e2f123456789abcdef123
 *         name:
 *           type: string
 *           description: Name of the chat or co-work session
 *           example: Study Session
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time the chat was created
 *           example: 2026-10-04T18:30:00.000Z
 *         participants:
 *           type: array
 *           description: Users participating in the chat
 *           items:
 *             type: string
 *           example:
 *             - 68e2f555555555abcdef789
 *             - 68e2f666666666abcdef890
 */