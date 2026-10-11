.. _adr_0001:

ADR-001: Selection of Vanilla Web Platform Architecture
=======================================================

**Status:** Accepted

**Date:** 2026-09-15

**Deciders:** Nomo Core Engineering Team

Context
-------

When establishing the architecture for Nomo's web client, we required a solution that prioritized:
* Instant initial page load performance with near-zero runtime overhead.
* Rich, custom visual aesthetics including 3D transforms, SVG vector manipulation, and responsive CSS tokens.
* Minimal dependency friction and rapid local execution without continuous transpilation build steps.
* Long-term stability without framework version obsolescence or bundler churn.

Decision
--------

We chose to construct the initial web application using standard **HTML5, modern CSS3 (Custom Properties, Flexbox, Grid), and vanilla ES6+ JavaScript**.

Alternatives Considered
-----------------------

.. list-table::
   :widths: 20 40 40
   :header-rows: 1

   * - Alternative
     - Pros
     - Cons
   * - **React / Next.js**
     - Established component ecosystem; robust SSR.
     - Large initial JS bundle; node dependency bloat; build pipeline overhead for prototype.
   * - **Vue.js / Vite**
     - Clean template syntax; fast HMR.
     - Framework runtime overhead; external vendor lock-in.
   * - **Vanilla Web (Selected)**
     - Zero bundle time; native browser performance; maximum control over DOM & SVG animations.
     - Manual DOM updates and state synchronization required.

Consequences
------------

* **Positive:**
  * Zero build step required to run the web client; static files serve instantly via Nginx or any HTTP server.
  * Extremely fast performance and instant Time to Interactive (TTI).
  * Direct, unencumbered manipulation of complex procedural SVGs and 3D transforms.
* **Tradeoffs:**
  * Complex views require explicit DOM rendering helpers (``menuPage()``, ``cartPage()``).
  * State persistence must be handled deliberately via structured localStorage wrappers.
