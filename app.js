const express = require("express");
const productRouter = require("./routes/productRouter");

const app = express();
app.use(express.json());
app.use("/api", productRouter);

module.exports = app;
