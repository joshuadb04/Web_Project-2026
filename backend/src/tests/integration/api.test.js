import request from "supertest";
import { afterAll, describe, expect, test } from "@jest/globals";
import app from "../../app.js";
import { closePool } from "../../utils/database.js";

describe("API integration tests", () => {
  test("GET /api/v1/menu returns menu items", async () => {
    const response = await request(app).get("/api/v1/menu");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("GET /api/v1/menu/:id returns a menu item", async () => {
    const menuResponse = await request(app).get("/api/v1/menu");

    expect(menuResponse.statusCode).toBe(200);
    expect(menuResponse.body.length).toBeGreaterThan(0);

    const itemId = menuResponse.body[0].item_id;

    const response = await request(app).get("/api/v1/menu/" + itemId);

    expect(response.statusCode).toBe(200);
    expect(response.body.item_id).toBe(itemId);
  });

  test("GET /api/v1/orders returns orders", async () => {
    const response = await request(app).get("/api/v1/orders");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /api/v1/order-items returns order items", async () => {
    const response = await request(app).get("/api/v1/order-items");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("GET /api/v1/menu/:id returns 404 for an invalid item", async () => {
    const response = await request(app).get("/api/v1/menu/999999");

    expect(response.statusCode).toBe(404);
  });
});

afterAll(async () => {
  await closePool();
});
