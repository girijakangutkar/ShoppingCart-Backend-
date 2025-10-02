const express = require("express");
const app = express();
const productRouter = require("./routes/productRouter");
const cors = require("cors");

app.use(express.json());

app.use(cors());

app.use("/app", productRouter);

app.listen(3000, () => {
  console.log("Server is running on port 30000");
});
