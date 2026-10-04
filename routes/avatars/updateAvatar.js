const { ObjectId } = require('mongodb');
const { getDB } = require('../../services/database');

/**
 * @swagger
 * /api/avatars/{id}:
 *   put:
 *     summary: Update an avatar
 *     description: Updates one or more fields of an existing avatar.
 *     tags: [Avatar]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The database ID of the avatar
 *         schema:
 *           type: string
 *           example: 68e2f123456789abcdef123
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the avatar
 *                 example: Koi
 *               color:
 *                 type: string
 *                 description: The color of the avatar
 *                 example: purple
 *               price:
 *                 type: number
 *                 description: The price of the avatar
 *                 example: 100
 *     responses:
 *       200:
 *         description: Avatar updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Avatar'
 *       400:
 *         description: No fields were provided or price has an invalid data type
 *       404:
 *         description: Avatar not found
 *       500:
 *         description: Internal server error, failed to update avatar
 */
const updateAvatar = async (req, res) => {
    try {
        // extract fields from request body
        const { name, color, price } = req.body;

        // check that at least one field was provided
        if (name === undefined && color === undefined && price === undefined) {
            return res.status(400).json({error: 'At least one field must be provided.'});
        }

        // validate price if provided
        if (price !== undefined && typeof price !== 'number') {
            return res.status(400).json({
                error: 'Invalid data type: price must be a number.'
            });
        }

        // get database
        const db = getDB();

        // get avatars collection
        const avatars = db.collection('avatars');

        // add fields to updates if they are provided
        const updates = {};
        if (name !== undefined) updates.name = name;
        if (color !== undefined) updates.color = color;
        if (price !== undefined) updates.price = price;

        // update the avatar in the database
        const result = await avatars.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: updates }
        );

        // check if any document was matched and updated
        if (result.matchedCount === 0) {
            return res.status(404).json({
                error: 'Avatar not found.'
            });
        }

        // retrieve the updated avatar
        const updatedAvatar = await avatars.findOne({
            _id: new ObjectId(req.params.id)
        });

        // return the updated avatar
        res.status(200).json(updatedAvatar);
    } catch (error) {
        console.error('Error updating avatar:', error);
        res.status(500).json({error: 'Failed to update avatar.'});
    }
};

module.exports = updateAvatar;