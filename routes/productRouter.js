const express = require("express");
const { readFile, writeFile } = require("../models/db.model");
const productRouter = express.Router();

productRouter.get("/products", (req, res) => {
  try {
    let list = JSON.parse(readFile("data"));
    if (list.length == 0) {
      return res.status(204).json({ msg: "List is empty" });
    }
    res.status(200).json({ msg: "fetched successfully", list: list });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Something went wrong while fetching the data" });
  }
});

productRouter.post("/addProducts", (req, res) => {
  try {
    let list = JSON.parse(readFile("data"));
    let newData = req.body;
    if (newData.length == 0) {
      return res.status(204).json({ err: "No content" });
    }
    let index = list.length > 0 ? list[list.length - 1].id + 1 : 1;
    newData = { id: index, ...newData };
    list.push(newData);
    writeFile("data", list);
    res.status(201).json({ msg: "Products added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Something went wrong while fetching the data" });
  }
});

productRouter.patch("/editProducts/:id", (req, res) => {
  try {
    let id = req.params.id;
    let list = JSON.parse(readFile("data"));
    let index = list.findIndex((item) => item.id == id);
    if (index == -1) {
      return res.status(404).json({ msg: "Product does not exists" });
    }
    let updatedList = req.body;
    list[index] = { ...list[index], ...updatedList };
    writeFile("data", list);
    res.status(200).json({ msg: "Edited successfully", list: list });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Something went wrong while fetching the data" });
  }
});

productRouter.delete("/deleteProduct/:id", (req, res) => {
  try {
    let id = req.params.id;
    let list = JSON.parse(readFile("data"));
    let index = list.findIndex((item) => item.id == id);
    if (index == -1) {
      return res.status(404).json({ msg: "Product does not exists" });
    }
    list.splice(index, 1);
    writeFile("data", list);
    res.status(200).json({ msg: "Deleted product successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Something went wrong while fetching the data" });
  }
});

productRouter.post("/checkout", (req, res) => {
  try {
    const cart = req.body;

    if (!Array.isArray(cart.items) || cart.items.length === 0) {
      return res.status(400).json({ msg: "Cart is empty or invalid format" });
    }

    const orderDetails = {
      items: cart.items.map((item, index) => ({
        id: index + 1,
        name: item.name,
        quantity: item.quantity,
        price: parseFloat(item.price),
        total: parseFloat(item.price) * item.quantity,
      })),
      totalPrice: parseFloat(cart.totalPrice),
      timestamp: new Date().toISOString(),
    };

    const orders = JSON.parse(readFile("orders"));
    orders.push(orderDetails);
    writeFile("orders", orders);

    res
      .status(201)
      .json({ msg: "Order placed successfully", order: orderDetails });
  } catch (error) {
    console.error("Checkout error:", error);
    res
      .status(500)
      .json({ msg: "Something went wrong while processing the order" });
  }
});

module.exports = productRouter;
