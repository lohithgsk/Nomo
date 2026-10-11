.. _testing_coverage_and_profiling:

Code Coverage & V8 Profiling
============================

Nomo features an automated code coverage extraction pipeline that measures JavaScript function execution in ``app.js`` via native V8 Profiler capabilities.

Extraction Mechanism (``scripts/summarize-tests.js``)
-----------------------------------------------------

After Playwright completes tests, ``summarize-tests.js`` processes the output:

1. **Test Results Parsing:**
   Reads ``test-results/results.xml`` (JUnit format), extracting total tests, failures, skips, and passes.
2. **V8 Coverage Analysis:**
   Scans all ``v8-coverage.json`` files produced by the custom CDP fixture in ``tests/fixtures.js``.
   * Filters specifically for entries corresponding to ``/js/app.js``.
   * Counts total functions declared versus functions executed with positive invocation counts (``count > 0``).
3. **Badge & Metric Artifacts:**
   Generates structured Shields.io endpoint JSON schemas:
   * ``test-results/ci-summary.json``: Full metrics summary.
   * ``test-results/ci-tests.json``: Shields badge payload for test pass rates (e.g., ``24/24 passed``).
   * ``test-results/ci-coverage.json``: Shields badge payload for JS coverage percentage (e.g., ``88%``).

Workflow Integration
--------------------

In GitHub Actions (``.github/workflows/ci.yml``):
* The script runs after browser test execution.
* The test metrics table is published directly to GitHub Step Summary:

.. list-table::
   :widths: 50 50
   :header-rows: 1

   * - Metric
     - Result
   * - Tests passed
     - 24 / 24
   * - Failed
     - 0
   * - Skipped
     - 0
   * - JavaScript function coverage
     - 88%

* When merging to ``main``, the JSON files are committed to an orphan ``ci-metrics`` branch, enabling dynamic status badges in the README without third-party services.
