.. _adr_0002:

ADR-002: Client-Side Procedural SVG Stamp & Gamification Engine
===============================================================

**Status:** Accepted

**Date:** 2026-09-22

**Deciders:** Nomo Core Engineering Team

Context
-------

The core gamification loop requires awarding unique visual stamps to diners upon completing food orders. Static PNG or JPEG badge assets lacked the tactile authenticity of genuine passport stamps, could not embed dynamic timestamps, and scaled poorly across high-density displays.

Decision
--------

We decided to implement a **client-side procedural SVG vector generation engine** that combines:
* Dynamic geometric frames (circles, arches, tickets, polygons).
* Stylized vector emblems reflecting restaurant cuisine symbols.
* Curated physical ink pigments (navy, crimson, emerald, sienna).
* Curvilinear text paths using ``<textPath>``.
* Dynamic monospace date plates stamped at visit time.
* Organic angular offsets (``-15°`` to ``+15°``) simulating real-world stamp applications.

Alternatives Considered
-----------------------

.. list-table::
   :widths: 20 40 40
   :header-rows: 1

   * - Alternative
     - Pros
     - Cons
   * - **Static Raster Assets (PNG/WebP)**
     - Easy to export from design tools.
     - Large total asset size; cannot embed dynamic visit dates; pixelation on zoom.
   * - **Server-Side Image Generation**
     - Dynamic text rendered on backend.
     - Requires server roundtrip, caching layer, and graphics library dependencies (Pillow / Cairo).
   * - **Client Procedural SVG (Selected)**
     - Resolution-independent; zero asset network payload; dynamic dates and curves; organic tilt.
     - Mathematical path assembly required in code.

Consequences
------------

* **Positive:**
  * Ultra-crisp vector rendering at any magnification level.
  * Instant generation with zero network latency.
  * Unique, dynamic stamps with real dates and venue names.
* **Tradeoffs:**
  * Requires careful SVG syntax escaping and geometry math.
