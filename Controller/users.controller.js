const User = require("../Models/User");
const mongoose = require("mongoose");
const Validator = require("validatorjs");
const bcrypt = require("bcrypt");
const { getPagination } = require("../util/common");
require("dotenv/config");
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The User managing API
 */

/**
 * @openapi
 * definitions:
 *   BulkSource:
 *     type: object
 *     properties:
 *       language:
 *        type: string
 *       BE:
 *        type: integer
 *       FE:
 *        type: integer
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
 *         hobiie:
 *           type: array
 *           items:
 *             type: string
 *         Languages:
 *           type: array
 *           items:
 *             $ref: '#/definitions/BulkSource'
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

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Returns the list of all the user
 *     tags: [Users]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: query
 *         name:  page
 *         type: integer
 *       - in: query
 *         name: size
 *         type: integer
 *       - in: query
 *         name: sortKey
 *         type: string
 *       - in: query
 *         name: search
 *         type: string
 *       - in: query
 *         name: sortBy
 *         schema:
 *          type: string
 *          enum: [ASC, DESC]
 *       - in: query
 *         name: isVerified
 *         schema:
 *          type: string
 *          enum: [All, Yes, No]
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
  try {
    const { page, size, search, sortBy, sortKey } = req.query;
    const data = User.find();
    const totalItems = await User.find().count();
    const response = await getPagination(
      data,
      page,
      size,
      totalItems,
      "id",
      "DESC"
    );
    return res.status(200).json({ data: response, message: "Item List." });
  } catch (e) {
    return res.status(500).json({ status: "ERROR", message: e.message });
  }
};

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
  try {
    const data = req.params.id;
    if (!mongoose.isValidObjectId(data)) {
      return res
        .status(400)
        .json({ status: "ERROR", message: "Id is not valid." });
    }
    const user = await User.findById(data).populate("posts");
    if (!user) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "User not found." });
    }
    return res.status(200).json({ data: user, message: "Item Found." });
  } catch (e) {
    return res.status(500).json({ status: "ERROR", message: e.message });
  }
};

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

exports.updateItem = async (req, res) => {
  try {
    const id = req.params.id;
    if (!mongoose.isValidObjectId(data)) {
      return res
        .status(400)
        .json({ status: "ERROR", message: "Id is not valid." });
    }
    const data = req.body;
    const user = User.findByIdAndUpdate(id, data, { useFindAndModify: false });
    user
      .then((response) => {
        if (!response) {
          res.status(404).send({ message: "no data found" });
        }
        return res.status(200).send({ message: "Data updated" });
      })
      .catch((err) => {
        return res
          .status(500)
          .send({ message: "Internal server error", err: err });
      });
    return res.status(200).json({ data: data, message: "Item Updated." });
  } catch (e) {
    return res.status(500).json({ status: "ERROR", message: e.message });
  }
};

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
  try {
    const data = req.params.id;
    if (!mongoose.isValidObjectId(data)) {
      return res
        .status(400)
        .json({ status: "ERROR", message: "Object id is not valid." });
    }
    const user = await User.findByIdAndRemove(data, {
      useFindAndModify: false,
    });
    if (!user) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "Item not found." });
    }
    return res.status(200).json({ data: user, message: "Item deleted." });
  } catch (e) {
    return res.status(500).json({ status: "ERROR", message: e.message });
  }
};
