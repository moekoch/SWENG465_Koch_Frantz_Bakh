const { ObjectId } = require('mongodb');
const { getDB } = require('../../services/database');

const deleteAvatar = async (req, res) => {
    try {
        // get database
        const db = getDB();

        // get avatars collection
        const avatars = db.collection('avatars');

        // delete the avatar by ID
        const result = await avatars.deleteOne({
            _id: new ObjectId(req.params.id)
        });

        // check if any document was deleted
        if (result.deletedCount === 0) {
            return res.status(404).json({
                error: 'Avatar not found.'
            });
        }

        // send ok status and message of success
        res.status(200).json({message: 'Avatar deleted successfully.'});
    } catch (error) {
        console.error('Error deleting avatar:', error);
        res.status(500).json({error: 'Failed to delete avatar.'});
    }
};

module.exports = deleteAvatar;