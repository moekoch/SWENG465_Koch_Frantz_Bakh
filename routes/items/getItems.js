const { getDB } = require('../../services/database');

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Get all items
 *     description: Retrieves a list of all items from the database
 *     tags: [Item]
 *     responses:
 *       200:
 *         description: A list of items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       500:
 *         description: Internal server error, failed to retrieve items
 */
const getItems = async (req, res) => {
  try {
    //get database
    const db = getDB();

    //get items collection
    const items = db.collection('items');

    // retrieve all items from mongo
    const results = await items.find({}).toArray();

    // return ok status and array of items
    res.status(200).json(results);
  } catch (error) {
    console.error('Error retrieving items:', error);
    res.status(500).json({error: 'Failed to retrieve items.'});
  }
};

module.exports = getItems;