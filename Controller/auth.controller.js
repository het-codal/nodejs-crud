const jwt = require("jsonwebtoken");
const Validator = require("validatorjs");
const bcrypt = require("bcrypt");
const User = require("../Models/User");
require("dotenv/config");

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
  try {
    let user = await User.findOne({
      email: req.body.email,
      isDeleted: false,
    });
    if (!user) {
      return res.status(404).json({ message: "No user" });
    }
    const secret = process.env.secret;
    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      //TODO: remove password key from user object
      const token = jwt.sign(
        {
          user,
        },
        secret,
        { expiresIn: "1d" }
      );
      const data = {
        token: token,
        user: user,
      };
      return res
        .status(200)
        .json({ data: data, message: "Logged in successfully." });
    }
    return res
      .status(400)
      .json({ status: "ERROR", message: "email/password is wrong." });
  } catch (e) {
    return res.status(500).json({ status: "ERROR", message: e.message });
  }
};

/**
 * @openapi
 * /signup:
 *   post:
 *     summary: Signup new user
 *     tags: [Authentication]
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
exports.signup = async (req, res) => {
  try {
    const data = req.body;
    const validationRule = {
      email: "required|email",
      name: "required",
      password: "required",
    };
    const customMessage = {
      "required.name": "Name is required",
      "required.email": "Email is required",
      "require.password": "Password is required",
    };
    data.password = bcrypt.hashSync(data.password, 10);
    const validation = new Validator(data, validationRule, customMessage);
    if (validation.fails()) {
      return res.status(400).json({
        status: "ERROR",
        message: JSON.parse(JSON.stringify(validation.errors)).errors,
      });
    }
    const userSave = await User.create(data);
    return res.status(200).json({ data: userSave, message: "Item created." });
  } catch (e) {
    return res.status(500).json({ status: "ERROR", message: e.message });
  }
};
