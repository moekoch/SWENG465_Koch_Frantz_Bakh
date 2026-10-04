const { getDB } = require('../../services/database');

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Create a new item
 *     description: Creates a new item and stores it in the database
 *     tags: [Item]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: Item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: Bad request, missing required fields or invalid data types
 *       500:
 *         description: Internal server error, failed to create item
 */
const createItem = async (req, res) => {
  //get data from request body
  const { name, price } = req.body;

  // POST endpoint check to ensure the data sent from the client is valid
  if(!name|| !price){ //validate required fields
    return res.status(400).json({
      error: 'Missing required fields: name and price are required.'
    })
  }
  if(typeof price !== 'number'){ //validate price is a number
    return res.status(400).json({
      error: 'Invalid data type: price must be a number.'
    })
  }

  //create a new item object
  try{
    //get database
    const db = getDB();

    //get items collection
    const items = db.collection('items');

    //create item document
    const newItem = {
      name: name,
      price: price
    };

    //insert document into mongo
    const result = await items.insertOne(newItem);

    //add mongo generated id to response
    newItem._id = result.insertedId;

    //respond with created status and new item
    res.status(201).json(newItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({error: 'Failed to create item.'});
  }
};

module.exports = createItem;