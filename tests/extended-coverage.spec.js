const { test, expect } = require("./fixtures");
const { cleanPage, createCustomer } = require("./helpers");

test.describe("extended coverage checks", () => {
  test("homepage shows the passport call to action", async ({ page }) => {
    await cleanPage(page);
    await expect(page.getByRole("button", { name: /get your passport/i })).toBeVisible();
  });

  test("invalid login email shows a validation message", async ({ page }) => {
    await cleanPage(page);
    await page.getByRole("button", { name: /account menu/i }).click();
    await page.getByRole("button", { name: "Log in" }).click();
    await page.getByLabel("Email").fill("invalid");
    await page.getByLabel("Password").fill("secret1");
    await page.getByRole("button", { name: "Log in", exact: true }).click();
    await expect(page.getByRole("alert")).toHaveText("Enter a valid email address.");
  });

  test("short signup password is rejected", async ({ page }) => {
    await cleanPage(page);
    await page.getByRole("button", { name: /get your passport/i }).click();
    await page.getByLabel("Email").fill("short2@example.com");
    await page.getByLabel("Password").fill("123");
    await page.locator("#as").click();
    await expect(page.getByRole("alert")).toHaveText("Password needs at least 6 characters.");
  });

  test("search by cuisine keyword narrows the restaurant list", async ({ page }) => {
    await cleanPage(page, "/explore.html");
    await page.getByRole("searchbox", { name: /search restaurants/i }).fill("Thai");
    await expect(page.locator("#rg")).toContainText("Bangkok Alley");
  });

  test("search by dish name finds the matching restaurant", async ({ page }) => {
    await cleanPage(page, "/explore.html");
    await page.getByRole("searchbox", { name: /search restaurants/i }).fill("ramen");
    await expect(page.locator("#rg")).toContainText("Ramen Kaze");
  });

  test("empty search state is shown when no results match", async ({ page }) => {
    await cleanPage(page, "/explore.html");
    await page.getByRole("searchbox", { name: /search restaurants/i }).fill("not-a-restaurant");
    await expect(page.locator("#rg")).toContainText("Nothing matches yet");
  });

  test("city filter updates the selected city label and result count", async ({ page }) => {
    await cleanPage(page, "/explore.html");
    await page.getByRole("button", { name: /explore by city/i }).click();
    await page.getByRole("option", { name: /Raleigh/i }).click();
    await expect(page.locator("#city-label")).toHaveText("Raleigh, NC");
    await expect(page.locator("#rg .rest")).toHaveCount(10);
  });

  test("direct menu URL loads a specific restaurant", async ({ page }) => {
    await cleanPage(page, "/menu.html?id=1");
    await expect(page.getByRole("heading", { name: "Tiffin Trails" })).toBeVisible();
  });

  test("restaurant card opens the menu from the explore page", async ({ page }) => {
    await cleanPage(page, "/explore.html");
    await page.getByRole("button", { name: /Nonna Fornace/i }).click();
    await expect(page).toHaveURL(/menu\.html\?id=0/);
    await expect(page.getByRole("heading", { name: "Nonna Fornace" })).toBeVisible();
  });

  test("vegetarian-only menu filter hides meat dishes", async ({ page }) => {
    await cleanPage(page, "/menu.html?id=0");
    await page.getByRole("checkbox", { name: /vegetarian dishes only/i }).check();
    await expect(page.locator(".mi")).toHaveCount(7);
    await expect(page.locator(".mi").filter({ hasText: "Sausage" })).toHaveCount(0);
  });

  test("restaurant hero pans on arrow keys and resets with Home", async ({ page }) => {
    await cleanPage(page, "/menu.html?id=0");
    const hero = page.locator("#restaurant-hero");
    await hero.focus();
    await page.keyboard.press("ArrowRight");
    await expect(hero.locator("img")).toHaveCSS("--scene-pan-x", "4%");
    await page.keyboard.press("Home");
    await expect(hero.locator("img")).toHaveCSS("--scene-pan-x", "0%");
  });

  test("cart page starts empty before an item is added", async ({ page }) => {
    await cleanPage(page, "/cart.html");
    await expect(page.locator(".cart-empty")).toContainText("NOTHING ON THE TABLE YET");
  });

  test("adding multiple dishes increases the cart badge and item count", async ({ page }) => {
    await cleanPage(page, "/menu.html?id=0");
    await page.getByRole("button", { name: "Add to cart" }).first().click();
    await page.getByRole("button", { name: "Add to cart" }).nth(1).click();
    await expect(page.locator("#cn")).toHaveText("2");
    await page.goto("/cart.html");
    await expect(page.locator(".cart-section-heading")).toContainText("2 items");
  });

  test("changing the tip changes the total shown in the cart summary", async ({ page }) => {
    await cleanPage(page, "/menu.html?id=0");
    await page.getByRole("button", { name: "Add to cart" }).first().click();
    await page.goto("/cart.html");
    const before = await page.locator(".sum .sl.t span").last().textContent();
    await page.getByRole("button", { name: "No tip" }).click();
    const after = await page.locator(".sum .sl.t span").last().textContent();
    expect(after).not.toBe(before);
  });

  test("community page requires login before a post can be liked", async ({ page }) => {
    await cleanPage(page, "/community.html");
    await page.getByRole("button", { name: /like masala dosa recommendation/i }).click();
    await expect(page.locator("#ad")).toBeVisible();
    await expect(page.locator("#af")).toContainText("Email");
  });
});
