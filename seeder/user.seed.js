const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../Models/User");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

mongoose
  .connect(process.env.Test_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to server.");
  })
  .catch((err) => console.log(err.message));

const userSeed = [
  {
    name: "Codal Demo",
    email: "codal@codaldemo.com",
    password: bcrypt.hashSync("admin123", 10),
  },
  {
    name: "Codal User",
    email: "superadmin@codal.com",
    password: bcrypt.hashSync("admin123", 10),
  },
];
User.insertMany(userSeed);
