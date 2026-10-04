const { ObjectId } = require('mongodb');
const { getDB } = require('../../services/database');

const getAvatarName = async (req, res) => {
    try {
        //get database
        const db = getDB();

        //get avatars collection
        const avatars = db.collection('avatars');

        // retrieve the avatar by ID and project only the name field
        const avatar = await avatars.findOne(
            { _id: new ObjectId(req.params.id) },
            { projection: { name: 1 } }
        );

        // check if avatar exists
        if (!avatar) {
            return res.status(404).json({
                error: 'Avatar not found.'
            });
        }

        //return ok status and name of avatar
        res.status(200).json({
            name: avatar.name
        });
    } catch (error) {
        console.error('Error retrieving avatar name:', error);
        res.status(500).json({error: 'Failed to retrieve avatar name.'});
    }
};

module.exports = getAvatarName;