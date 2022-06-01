const express = require("express");
const app = express();
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const jwt = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");
const cors = require("cors");
let morgan = require("morgan");
app.use(express.json());
app.use(cors());
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(null, {
    explorer: true,
    swaggerUrl: "/api/swagger",
    customSiteTitle: "API",
  })
);

app.use(jwt());
app.use(morgan("combined"));
require("./Route")(app);
app.get("*", (req, res) => {
  res.status(200).json({ message: "Hello" });
});

app.use(errorHandler);
const PORT = process.env.PORT;

app.listen(PORT, console.log("Port is running:" + `${PORT}`));

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to server.");
  })
  .catch((err) => console.log(err.message));

module.exports = app;
