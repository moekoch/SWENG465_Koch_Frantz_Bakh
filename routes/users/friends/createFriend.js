const { getDB } = require('../../services/database');

/**
 * @swagger
 * /api/friends:
 *   post:
 *     summary: Create a new friend
 *     description: Creates a new friend and stores it in the database
 *     tags: [Friend]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Friend'
 *     responses:
 *       201:
 *         description: Friend created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Friend'
 *       400:
 *         description: Bad request, missing required fields or invalid data types
 *       500:
 *         description: Internal server error, failed to create friend
 */
const createFriend = async (req, res) => {
  //get data from request body
  const { name, status, email } = req.body;

  // POST endpoint check to ensure the data sent from the client is valid
  if(!name || !status || !email){ //validate required fields
    return res.status(400).json({
      error: 'Missing required fields: name, status, and email are required.'
    })
  }
  if(typeof id !== 'number'){ //validate id is a number
    return res.status(400).json({
      error: 'Invalid data type: id must be a number.'
    })
  }

  //create a new user object
  try{
    //get database
    const db = getDB();

    //get users collection
    const users = db.collection('users');

    //create friend document
    const newFriend = {
      name: name,
      status: status,
      email: email
    };

    //insert document into mongo
    const result = await users.insertOne(newFriend);

    //add mongo generated id to response
    newFriend._id = result.insertedId;

    //respond with created status and new friend
    res.status(201).json(newFriend);
  } catch (error) {
    console.error('Error creating friend:', error);
    res.status(500).json({error: 'Failed to create friend.'});
  }
};

module.exports = createFriend;