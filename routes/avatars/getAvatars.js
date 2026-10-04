const { getDB } = require('../../services/database');

// GET endpoint to retrieve all instances of the Avatar resource
const getAvatars = async (req, res) => {
  try {
    //get database
    const db = getDB();

    //get avatars collection
    const avatars = db.collection('avatars');

    // retrieve all avatars from mongo
    const results = await avatars.find({}).toArray();

    // return ok status and array of avatars
    res.status(200).json(results);
  } catch (error) {
    console.error('Error retrieving avatars:', error);
    res.status(500).json({error: 'Failed to retrieve avatars.'});
  }
};

module.exports = getAvatars;