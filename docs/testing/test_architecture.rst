.. _testing_test_architecture:

Testing Architecture
====================

Nomo employs Microsoft Playwright for end-to-end browser automation, regression testing, and code coverage analysis.

Framework Configuration (``playwright.config.js``)
--------------------------------------------------

.. code-block:: javascript

   const { defineConfig } = require("@playwright/test");

   module.exports = defineConfig({
     testDir: "./tests",
     use: {
       baseURL: "http://127.0.0.1:4173",
       headless: true
     },
     reporter: process.env.CI
       ? [
           ["list"],
           ["junit", { outputFile: "test-results/results.xml" }],
           ["html", { outputFolder: "playwright-report", open: "never" }]
         ]
       : "list",
     webServer: {
       command: "npx http-server apps/web -p 4173 -s",
       url: "http://127.0.0.1:4173",
       reuseExistingServer: true
     }
   });

Key Architectural Highlights:
* **Built-in Web Server:** Automatically spawns a dedicated HTTP server on port ``4173`` serving ``apps/web`` prior to running tests, terminating it upon test completion.
* **Continuous Integration Reporters:** In CI mode, produces JUnit XML reports (``test-results/results.xml``) and interactive HTML reports (``playwright-report/``).
* **Headless Chromium Execution:** Runs quickly in headless mode while preserving full browser APIs (including Chrome DevTools Protocol).

Custom Test Fixtures (``tests/fixtures.js``)
--------------------------------------------

Playwright tests use an extended test fixture that attaches directly to the Chromium DevTools Protocol (CDP) session:

.. code-block:: javascript

   const base = require("@playwright/test");
   const fs = require("fs");

   const test = base.test.extend({
     page: async ({ page }, use, testInfo) => {
       const session = await page.context().newCDPSession(page);
       await session.send("Profiler.enable");
       await session.send("Profiler.startPreciseCoverage", {
         callCount: true,
         detailed: true
       });

       await use(page);

       const coverage = await session.send("Profiler.takePreciseCoverage");
       fs.mkdirSync(testInfo.outputDir, { recursive: true });
       fs.writeFileSync(
         testInfo.outputPath("v8-coverage.json"),
         JSON.stringify(coverage.result)
       );
       await session.send("Profiler.stopPreciseCoverage");
       await session.detach();
     }
   });

This fixture captures precise, call-count function coverage for every line executed during tests without requiring intrusive source-code instrumentation.

Test Helpers (``tests/helpers.js``)
-----------------------------------

Standard utilities ensure deterministic test isolation:

* ``cleanPage(page, path = "/")``:
  Navigates to the specified URL, wipes both ``localStorage`` and ``sessionStorage``, and reloads the page to guarantee a clean slate.
* ``createCustomer(page, suffix)``:
  Automates the customer signup workflow through the UI, validating proper form submission and returning the registered email address.
* ``expectLocation(page, suffix)``:
  Awaits DOM load state and verifies that the current browser URL ends with the expected pathname.
