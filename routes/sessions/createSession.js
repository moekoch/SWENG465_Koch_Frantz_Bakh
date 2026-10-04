const { getDB } = require('../../services/database');

/**
 * @swagger
 * /api/sessions:
 *   post:
 *     summary: Create a new session
 *     description: Creates a new session and stores it in the database
 *     tags: [Session]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Session'
 *     responses:
 *       201:
 *         description: Session created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Session'
 *       400:
 *         description: Bad request, missing required fields or invalid data types
 *       500:
 *         description: Internal server error, failed to create session
 */
const createSession = async (req, res) => {
  //get data from request body
  const { id } = req.body;

  // POST endpoint check to ensure the data sent from the client is valid
  if(!id){ //validate required fields
    return res.status(400).json({
      error: 'Missing required field: id is required.'
    })
  }
  if(typeof id !== 'number'){ //validate id is a number
    return res.status(400).json({
      error: 'Invalid data type: id must be a number.'
    })
  }

  //create a new session object
  try{
    //get database
    const db = getDB();

    //get sessions collection
    const sessions = db.collection('sessions');

    //create session document
    const newSession = {
      id: id
    };

    //insert document into mongo
    const result = await sessions.insertOne(newSession);

    //add mongo generated id to response
    newSession._id = result.insertedId;

    //respond with created status and new session
    res.status(201).json(newSession);
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({error: 'Failed to create session.'});
  }
};

module.exports = createSession;