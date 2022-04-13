/* eslint-disable no-console */
const child_process = require("child_process");
const bcrypt = require("bcrypt");
require("dotenv").config();
console.log(
  "========================Installing Dependencies========================"
);
child_process.execSync("npm install", { stdio: [0, 1, 2] });
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlzRGVsZXRlZCI6ZmFsc2UsIm5hbWUiOiJIZXQgUmFjaGgiLCJlbWFpbCI6ImhyYWNoaEBjb2RhbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCQ5aDdqWGVYUE9TSGYuSjMwckVkeTZlL3gzVzRlbU15UWwybU9ia05Oc0I2dGJwT2dxSk1GYSIsImNyZWF0ZWRBdCI6IjIwMjItMDQtMDZUMDU6NDU6NDguMjEwWiIsInVwZGF0ZWRBdCI6IjIwMjItMDQtMDZUMDU6NDU6NDguMjExWiIsImlkIjoiNjI0ZDI5MGNhMDY0YzE0ZTEyY2NkYjE5IiwidiI6MH0sImlhdCI6MTY0OTc0MzMxNywiZXhwIjoxNjQ5ODI5NzE3fQ.7ESwz2DIVMHtWjzCgQLcsX9q0XsQsbaK9UilLU0kcbM",
  salt
);
console.log("🚀 ~ file: test.js ~ line 7 ~ hash", hash);
const a = bcrypt.compareSync(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlzRGVsZXRlZCI6ZmFsc2UsIm5hbWUiOiJIZXQgUmFjaGgiLCJlbWFpbCI6ImhyYWNoaEBjb2RhbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCQ5aDdqWGVYUE9TSGYuSjMwckVkeTZlL3gzVzRlbU15UWwybU9ia05Oc0I2dGJwT2dxSk1GYSIsImNyZWF0ZWRBdCI6IjIwMjItMDQtMDZUMDU6NDU6NDguMjEwWiIsInVwZGF0ZWRBdCI6IjIwMjItMDQtMDZUMDU6NDU6NDguMjExWiIsImlkIjoiNjI0ZDI5MGNhMDY0YzE0ZTEyY2NkYjE5IiwidiI6MH0sImlhdCI6MTY0OTc0MzMxNywiZXhwIjoxNjQ5ODI5NzE3fQ.7ESwz2DIVMHtWjzCgQLcsX9q0XsQsbaK9UilLU0kcbM",
  hash
); // true
process.env["NODE_APP_KEY"] = hash;
console.log("🚀 ~ file: test.js ~ line 9 ~ a", a);
