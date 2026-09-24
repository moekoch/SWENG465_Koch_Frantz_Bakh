//POST endpoint to create a new bot
const createBot = (req, res) => {
  // 1. Get data from the request body
  const { name, gameType } = req.body;

  //basic validation: check if required fields exist
  if (!name || !gameType) {
    return res.status(400).json({
      error: 'Missing required fields: name and gameType are required.'
    });
  }

  //check that gameType is a valid string
  if (typeof gameType !== 'string') {
    return res.status(400).json({
      error: 'Invalid data type: gameType must be a string.'
    });
  }

  //create a new bot object and push to the array
  const newBot = {
    id: bots.length + 1,
    name: name,
    gameType: gameType, //"Go-Fish" or "Blackjack"
    score: 0
  };
  bots.push(newBot);

  //respond with a created status and new bot object
  res.status(201).json(newBot);
};

module.exports = createBot;