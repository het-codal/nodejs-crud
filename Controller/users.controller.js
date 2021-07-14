const User = require('../Models/User')
const mongoose = require('mongoose')
/**
  * @swagger
  * tags:
  *   name: Users
  *   description: The User managing API
  */

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The user name
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password
 */

/**
 * @openapi
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: The user was successfully created
 *       400:
 *         description: validation error
 *       401:
 *         description: unauthorized
 *       500:
 *         description: Some server error
 */
exports.createItem = async (req, res) => {
    const data = req.body;
    const userSave =  await User.create(data);
    if (userSave) {
        console.log('User saved')
    }
    return res.status(200).json({'data': data, 'message': 'Item created.'})
}

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Returns the list of all the user
 *     tags: [Users]
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: The user was successfully created
 *       400:
 *         description: validation error
 *       401:
 *         description: unauthorized
 *       500:
 *         description: Some server error
 *
 */
exports.listItem = async (req, res) => {
    const data = await User.find()
    return res.status(200).json({'data': data, 'message': 'Item List.'})
}

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: The user was successfully created
 *       400:
 *         description: validation error
 *       401:
 *         description: unauthorized
 *       404:
 *         description: No user found
 *       500:
 *         description: Some server error
 */
exports.readItem = async (req, res) => {
    const data = req.params.id;
    if (!mongoose.isValidObjectId(data)) {
        return res.status(400).json({'status': 'ERROR', 'message': 'Id is not valid.'})    
    }
    const user = await User.findById(data);
    if (!user) {
        return res.status(404).json({'status': 'ERROR', 'message': 'User not found.'})    
    }
    return res.status(200).json({'data': user, 'message': 'Item Found.'})
}

/**
 * @swagger
 * /users/{id}:
 *  put:
 *    summary: Update the user by the id
 *    tags: [Users]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The user id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    security:
 *       - jwt: []
 *    responses:
 *      200:
 *        description: The user was updated
 *      401:
 *         description: unauthorized
 *      404:
 *        description: The user was not found
 *      500:
 *        description: Some error happened
 */

exports.updateItem = (req, res) => {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(data)) {
        return res.status(400).json({'status': 'ERROR', 'message': 'Id is not valid.'})    
    }
    const data = req.body;
    const user = User.findByIdAndUpdate(id, data, {useFindAndModify: false})
    user.then(response => {
        if (!response) {
            res.status(404).send({message:'no data found'})
        }
        return res.status(200).send({message: "Data updated"})
    }).catch( err => {
        return res.status(500).send({message: 'Internal server error'})
    })
    return res.status(200).json({'data': data, 'message': 'Item Updated.'})
}

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Remove the user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: The user was deleted
 *       400:
 *         description: The given id is not valid
 *       401:
 *         description: unauthorized    
 *       404:
 *         description: The user was not found
 */
exports.deleteItem = async (req, res) => {
    const data = req.params.id;
    if (!mongoose.isValidObjectId(data)) {
        return res.status(400).json({'status': 'ERROR', 'message': 'Object id is not valid.'})    
    }
    const user = await User.findByIdAndRemove(data, {useFindAndModify: false})
    if (!user) {
        return res.status(404).json({'status': 'ERROR', 'message': 'Item not found.'})    
    }
    return res.status(200).json({'data': user, 'message': 'Item deleted.'})
}
