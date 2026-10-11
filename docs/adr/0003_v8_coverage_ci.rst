.. _adr_0003:

ADR-003: Playwright CDP V8 Precise Coverage in CI
=================================================

**Status:** Accepted

**Date:** 2026-10-05

**Deciders:** Nomo Core Engineering Team

Context
-------

Because Nomo does not use a JavaScript compiler or bundler like Babel or Vite, standard instrumentation tools (such as Istanbul/nyc) would require introducing an artificial transformation pipeline solely to measure code coverage during automated testing.

Decision
--------

We chose to leverage the **Chrome DevTools Protocol (CDP)** built into Chromium via Playwright fixtures to capture native **V8 precise function coverage** directly from the browser runtime during test runs.

Alternatives Considered
-----------------------

.. list-table::
   :widths: 20 40 40
   :header-rows: 1

   * - Alternative
     - Pros
     - Cons
   * - **Istanbul / nyc Instrumentation**
     - Traditional JavaScript coverage standard.
     - Requires introducing Babel/bundler infrastructure solely for testing; alters runtime code.
   * - **No Coverage Metric in CI**
     - Zero test configuration.
     - Blind to regression gaps and untested branches.
   * - **Native V8 CDP Coverage (Selected)**
     - Zero source alterations; exact function call tracking; lightweight extraction script.
     - V8 specific (Chromium only).

Consequences
------------

* **Positive:**
  * Clean, uninstrumented source files running in testing identical to production.
  * Real-time function invocation counts captured at the browser engine level.
  * Standalone script (``scripts/summarize-tests.js``) converts raw V8 JSON into automated Shields.io badge metrics and GitHub step summaries.
* **Tradeoffs:**
  * Coverage collection requires Chromium as the target test browser.
