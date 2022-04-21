/* eslint-disable no-console */
const child_process = require("child_process");
const bcrypt = require("bcrypt");
const fs = require("fs");
const length = 50;
require("dotenv").config();
console.log(
  "========================Installing Dependencies========================"
);
child_process.execSync("npm install", { stdio: [0, 1, 2] });
console.log(
  "========================Generating APP KEY========================"
);
var salt = bcrypt.genSaltSync(10);
var result = "";
const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
const charactersLength = characters.length;
for (var i = 0; i < length; i++) {
  result += characters.charAt(Math.floor(Math.random() * charactersLength));
}
var hash = bcrypt.hashSync(result, salt);
fs.writeFileSync(".env", "");
fs.appendFileSync(
  ".env",
  "APP_KEY=" +
    hash +
    "\nsecret=secret\nDB_URL=\nPORT=8000\nAPP_NAME=nodejsApp\nhost_url=http://localhost:8000/\nAPI_DOCS=http://localhost:8000/api-docs/#/\nTest_DB_URL=\n"
);
console.log("Setting UP Env........................");
console.log(
  "========================Project Setup Success========================"
);
console.log("You can set another variables values \nThank you.");
