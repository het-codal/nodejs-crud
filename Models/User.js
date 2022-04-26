const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email is already in use"],
    match: [/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/, "Invalid email"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: [6, "password should contain at least 6 characters"],
  },
  isAdmin: {
    type: Boolean,
    default: 0,
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
  posts: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Post", require: false },
  ],
});

UserSchema.path("email").validate(async (email) => {
  const count = await mongoose.model("User").count({ email });
  return !count;
}, "email has already used");

UserSchema.virtual("postsPublished", {
  ref: "Post",
  localField: "_id",
  foreignField: "user",
});

UserSchema.set("toObject", { virtuals: true });
UserSchema.set("toJSON", { virtuals: true });

UserSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  object.v = __v;
  return object;
});

module.exports = mongoose.model("User", UserSchema);
