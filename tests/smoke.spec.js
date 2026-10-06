const { test, expect } = require("@playwright/test");

test("main pages respond successfully", async ({ request }) => {
  for (const path of ["/", "/explore.html", "/menu.html", "/cart.html"]) {
    const response = await request.get(path);
    expect(response.ok(), path).toBeTruthy();
  }
});
