const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const User = require('../Models/User')
require('dotenv/config');

/**
  * @swagger
  * tags:
  *   name: Authentication
  *   description: The Authentication managing API
  */

/**
 * @openapi
 * components:
 *   schemas:
 *     Authentication:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password
 */

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Authentication'
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
exports.login = async (req, res) => {
    let user = await User.findOne({
        email: req.body.email,
        isDeleted: false
    })
    if (!user) {
        return res.status(404).json({'message': 'no user'});
    }
    const secret = process.env.secret
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign(
            { 
                id: user.id ,
                email: user.email
            }, 
            secret, 
            { expiresIn: '1d' }
        );
        delete user.password
        const data = {
            token: token,
            user: user
        }
        return res.status(200).json({'data': data, 'message': 'Logged in successfully.'})
    }
    return res.status(400).json({'status': 'ERROR', 'message': 'email/password is wrong.'})
    
}

