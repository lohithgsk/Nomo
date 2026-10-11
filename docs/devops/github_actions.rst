.. _devops_github_actions:

Continuous Integration & GitHub Actions
=======================================

Nomo automates testing, code quality checks, metrics publishing, and security scanning through GitHub Actions.

Primary CI Workflow (``.github/workflows/ci.yml``)
--------------------------------------------------

* **Triggers:** Executes on every pull request targeting ``main`` and on pushes to ``main``.
* **Concurrency Protection:** Cancels in-progress superseded runs on the same branch or PR to conserve runner minutes.
* **Pipeline Stages:**
  1. **Checkout & Setup:** Checks out repository code and sets up Node.js 20 with npm caching.
  2. **Dependency Installation:** Runs ``npm ci`` for reproducible package installs.
  3. **Browser Installation:** Runs ``npx playwright install --with-deps chromium``.
  4. **Test Suite Execution:** Executes ``npm run test:ci``, capturing JUnit XML and V8 coverage.
  5. **Live Metrics Calculation:** Runs ``node scripts/summarize-tests.js`` to calculate test passes and function coverage.
  6. **Job Summary Output:** Formats a markdown table appended to ``$GITHUB_STEP_SUMMARY``.
  7. **Artifact Archival:** Uploads test reports and artifacts via ``actions/upload-artifact@v4``.
  8. **Automated Badge Publishing:** On pushes to ``main``, pushes updated badge JSON schemas to an orphan ``ci-metrics`` branch using the GitHub Actions token.

Monorepo Paths Filter CI (``.github/ci.yml``)
---------------------------------------------

Provides targeted validation for future multi-package apps using ``dorny/paths-filter@v3``:
* Changes to ``apps/api/**`` trigger API linting, typechecking, and tests.
* Changes to ``apps/mobile/**`` trigger mobile validation.
* Changes to ``apps/web/**`` trigger web checks.
* A required ``ci-summary`` status check unifies branch protection.

Security Scanning (``.github/workflows/codeql.yml``)
----------------------------------------------------

Executes GitHub CodeQL analysis on pushes, pull requests, and weekly scheduled cron jobs to detect Common Weakness Enumerations (CWEs) in JavaScript and TypeScript.

Automated Deployments
---------------------

* ``deploy-staging.yml``: Automated deployments triggered on staging branches.
* ``deploy-production.yml``: Production release deployment automation.
