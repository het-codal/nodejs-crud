const AuthController = require("../Controller/auth.controller");
const path = require("path");

module.exports = (app) => {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/login", AuthController.login);
  app.post("/api/signup", AuthController.login);

  app.get("/api/*/:id", async (req, res, next) => {
    const url = req.url.split("/");
    const rootPath = path.join(__dirname, "../");
    const controllerName = url[2] + ".controller.js";
    const controllerObject = require(rootPath + "Controller/" + controllerName);
    return await controllerObject.readItem(req, res, next);
  });

  app.get("/api/*", async (req, res, next) => {
    const url = req.url.split("/");
    const rootPath = path.join(__dirname, "../");
    const controllerName = url[2] + ".controller.js";
    const controllerObject = require(rootPath + "Controller/" + controllerName);
    return await controllerObject.listItem(req, res, next);
  });

  app.post("/api/*", async (req, res, next) => {
    const url = req.url.split("/");
    const rootPath = path.join(__dirname, "../");
    const controllerName = url[2] + ".controller.js";
    const controllerObject = require(rootPath + "Controller/" + controllerName);
    return await controllerObject.createItem(req, res, next);
  });

  app.put("/api/*/:id", async (req, res, next) => {
    const url = req.url.split("/");
    const rootPath = path.join(__dirname, "../");
    const controllerName = url[2] + ".controller.js";
    const controllerObject = require(rootPath + "Controller/" + controllerName);
    return await controllerObject.updateItem(req, res, next);
  });

  app.delete("/api/*/:id", async (req, res, next) => {
    const url = req.url.split("/");
    const rootPath = path.join(__dirname, "../");
    const controllerName = url[2] + ".controller.js";
    const controllerObject = require(rootPath + "Controller/" + controllerName);
    return await controllerObject.deleteItem(req, res, next);
  });
};
