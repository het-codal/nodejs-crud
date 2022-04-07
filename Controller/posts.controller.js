const Post = require("../Models/Post");
const User = require("../Models/User");
const mongoose = require("mongoose");
const Validator = require("validatorjs");
/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: The Post managing API
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The post title
 *         description:
 *           type: string
 *           description: The description
 */

/**
 * @openapi
 * /posts:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: The post was successfully created
 *       400:
 *         description: validation error
 *       401:
 *         description: unauthorized
 *       500:
 *         description: Some server error
 */
exports.createItem = async (req, res) => {
  try {
    let data = req.body;
    const validationRule = {
      title: "required",
      description: "required",
    };
    const customMessage = {
      "required.title": "Title is required",
      "required.description": "Email is required",
    };
    const validation = new Validator(data, validationRule, customMessage);
    if (validation.fails()) {
      return res.status(400).json({
        status: "ERROR",
        message: JSON.parse(JSON.stringify(validation.errors)).errors,
      });
    }
    const user = await User.findById("624d290ca064c14e12ccdb19");
    const postSave = await Post.create({ ...data, user: user._id });
    return res.status(200).json({ data: postSave, message: "Item created." });
  } catch (e) {
    return res.status(500).json({ status: "ERROR", message: e.message });
  }
};

/**
 * @openapi
 * /posts:
 *   get:
 *     summary: Returns the list of all the post
 *     tags: [Posts]
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: The post was successfully created
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
    const data = await Post.find().populate("users");
    return res.status(200).json({ data: data, message: "Item List." });
  } catch (e) {
    return res.status(500).json({ status: "ERROR", message: e.message });
  }
};

/**
 * @openapi
 * /posts/{id}:
 *   get:
 *     summary: Get the post by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: The post was successfully created
 *       400:
 *         description: validation error
 *       401:
 *         description: unauthorized
 *       404:
 *         description: No post found
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
    const post = await Post.findById(data).populate("users");
    if (!post) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "Post not found." });
    }
    return res.status(200).json({ data: post, message: "Item Found." });
  } catch (e) {
    return res.status(500).json({ status: "ERROR", message: e.message });
  }
};

/**
 * @swagger
 * /posts/{id}:
 *  put:
 *    summary: Update the post by the id
 *    tags: [Posts]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The post id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Post'
 *    security:
 *       - jwt: []
 *    responses:
 *      200:
 *        description: The post was updated
 *      401:
 *         description: unauthorized
 *      404:
 *        description: The post was not found
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
    const post = Post.findByIdAndUpdate(id, data, { useFindAndModify: false });
    post
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
 * /posts/{id}:
 *   delete:
 *     summary: Remove the post by id
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The post id
 *     security:
 *       - jwt: []
 *     responses:
 *       200:
 *         description: The post was deleted
 *       400:
 *         description: The given id is not valid
 *       401:
 *         description: unauthorized
 *       404:
 *         description: The post was not found
 */
exports.deleteItem = async (req, res) => {
  try {
    const data = req.params.id;
    if (!mongoose.isValidObjectId(data)) {
      return res
        .status(400)
        .json({ status: "ERROR", message: "Object id is not valid." });
    }
    const post = await Post.findByIdAndRemove(data, {
      useFindAndModify: false,
    });
    if (!post) {
      return res
        .status(404)
        .json({ status: "ERROR", message: "Item not found." });
    }
    return res.status(200).json({ data: post, message: "Item deleted." });
  } catch (e) {
    return res.status(500).json({ status: "ERROR", message: e.message });
  }
};
