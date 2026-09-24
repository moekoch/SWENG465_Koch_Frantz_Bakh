// POST endpoint to create a new instance of the Avatar resource
const createAvatar = (req, res) => {
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
  const newAvatar = {
    id: avatars.length + 1,
    name: name,
    color: color,
    price: price
  };

  //add new avatar to array
  avatars.push(newAvatar);

  //respond with created status and new avatar object
  res.status(201).json(newAvatar);
};

module.exports = createAvatar;