const mongoose = require("mongoose");
const PostSchema = mongoose.Schema({
  title: {
    type: String,
    require: "{PATH} is required",
  },
  description: {
    type: String,
    require: "{PATH} is required",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  isDeleted: {
    type: Boolean,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

PostSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  object.v = __v;
  return object;
});

module.exports = mongoose.model("Post", PostSchema);
