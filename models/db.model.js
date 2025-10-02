const fs = require("fs");
const path = require("path");

const readFile = (filename = "data") => {
  const filePath = path.join(__dirname, `../${filename}.json`);
  return fs.readFileSync(filePath, "utf-8");
};

const writeFile = (filename = "data", data) => {
  const filePath = path.join(__dirname, `../${filename}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};

module.exports = { readFile, writeFile };
