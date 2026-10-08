import { test, expect } from "@playwright/test";

test("home page loads", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "Mochi & Milk", exact: true }),
  ).toBeVisible();
});

test("menu page loads", async ({ page }) => {
  await page.goto("/menu");

  await expect(
    page.getByRole("heading", { name: "Our Menu ♡", exact: true }),
  ).toBeVisible();
});

test("menu shows beverages", async ({ page }) => {
  await page.goto("/menu");

  await expect(
    page.getByRole("heading", { name: "Beverages", exact: true }),
  ).toBeVisible();
});

test("menu shows pastries", async ({ page }) => {
  await page.goto("/menu");

  await expect(
    page.getByRole("heading", { name: "Pastries", exact: true }),
  ).toBeVisible();
});

test("menu shows sweet treats", async ({ page }) => {
  await page.goto("/menu");

  await expect(
    page.getByRole("heading", { name: "Sweet Treats", exact: true }),
  ).toBeVisible();
});
