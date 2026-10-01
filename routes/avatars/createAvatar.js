const { getDB } = require('../../services/database');

// POST endpoint to create a new instance of the Avatar resource
const createAvatar = async (req, res) => {
  //get data from request body
  const { name, color, price } = req.body;

  // POST endpoint check to ensure the data sent from the client is valid
  if(!name || !color || !price){ //validate required fields
    return res.status(400).json({
      error: 'Missing required fields: name, color, and price are required.'
    })
  }
  if(typeof price !== 'number'){ //validate price is a number
    return res.status(400).json({
      error: 'Invalid data type: price must be a number.'
    })
  }

  //create a new avatar object
  try{
    //get database
    const db = getDB();

    //get avatars collection
    const avatars = db.collection('avatars');

    //create avatar document
    const newAvatar = {
      name: name,
      color: color,
      price: price
    };

    //insert document into mongo
    const result = await avatars.insertOne(newAvatar);

    //add mongo generated id to response
    newAvatar._id = result.insertedId;

    //respond with created status and new avatar
    res.status(201).json(newAvatar);
  } catch (error) {
    console.error('Error creating avatar:', error);
    res.status(500).json({error: 'Failed to create avatar.'});
  }
};

module.exports = createAvatar;