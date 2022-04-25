module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["eslint:recommended", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": "warning",
    "comma-dangle": 0,
    "no-unused-vars": 1,
    "max-len": 0,
  },
};
