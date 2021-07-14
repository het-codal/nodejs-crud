const jwt = require('jsonwebtoken');
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
exports.login = (req, res) => {
    const username = process.env.username
    const password = process.env.password
    const defaultUser = [
        {
            id: 1,
            email: username,
            password: password
        }
    ]
    const user = defaultUser.find(
        u => u.email === req.body.email && u.password === req.body.password
    )

    if (!user) {
        return res.status(404).json({'message': 'no user'});
    }

    const token = jwt.sign({ sub: user.id }, 'secret', { expiresIn: '7d' });
    const data = {
        token: token,
        user: defaultUser
    }

    res.status(200).json({'data': data, 'message': 'Logged in successfully.'})
}

