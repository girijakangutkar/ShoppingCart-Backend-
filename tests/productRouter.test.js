const request = require("supertest");
const app = require("../app");

jest.mock("../models/db.model", () => ({
  readFile: jest.fn((file) => {
    if (file === "data")
      return JSON.stringify([
        { id: 1, name: "Test Product", price: 100, quantity: 2 },
      ]);
    if (file === "orders") return JSON.stringify([]);
    return "[]";
  }),
  writeFile: jest.fn(),
}));

describe("Product Routes", () => {
  test("GET /api/products should return product list", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toBe(200);
    expect(res.body.list.length).toBeGreaterThan(0);
  });

  test("POST /api/addProducts should add a product", async () => {
    const newProduct = { name: "New Item", price: 50, quantity: 1 };
    const res = await request(app).post("/api/addProducts").send(newProduct);
    expect(res.statusCode).toBe(201);
    expect(res.body.msg).toBe("Products added successfully");
  });

  test("PATCH /api/editProducts/:id should edit a product", async () => {
    const updates = { price: 150 };
    const res = await request(app).patch("/api/editProducts/1").send(updates);
    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe("Edited successfully");
  });

  test("DELETE /api/deleteProduct/:id should delete a product", async () => {
    const res = await request(app).delete("/api/deleteProduct/1");
    expect(res.statusCode).toBe(200);
    expect(res.body.msg).toBe("Deleted product successfully");
  });

  test("POST /api/checkout should place an order", async () => {
    const cart = {
      items: [{ name: "Test Product", price: "100", quantity: 2 }],
      totalPrice: "200",
    };
    const res = await request(app).post("/api/checkout").send(cart);
    expect(res.statusCode).toBe(201);
    expect(res.body.msg).toBe("Order placed successfully");
  });
});
