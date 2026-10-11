.. _technical_visual_themes:

Design System & Visual Themes
=============================

Nomo's visual language bridges traditional editorial food magazines and modern digital products. This document outlines the core tokens, typography, and responsive grid layout.

Design Tokens Reference
-----------------------

.. list-table::
   :widths: 25 35 40
   :header-rows: 1

   * - Token Name
     - Default Value
     - Purpose
   * - ``--font-title``
     - ``'Fraunces', Georgia, serif``
     - Primary editorial headings and kicker text.
   * - ``--font-body``
     - ``'Nunito', system-ui, sans-serif``
     - Clean, highly legible interface controls, body copy, and forms.
   * - ``--bg``
     - ``#f7f3ed``
     - App background canvas in light mode.
   * - ``--surface``
     - ``#ffffff``
     - Container cards and floating modals.
   * - ``--ink``
     - ``#2b2420``
     - Primary text contrast color.
   * - ``--ink-muted``
     - ``#786c63``
     - Subtitles, metadata, and timestamps.
   * - ``--primary``
     - ``#9c5b3f``
     - Primary brand action color (warm terracotta).
   * - ``--gold``
     - ``#c98a2c``
     - Rating stars and special badges.

Responsive Breakpoint System
----------------------------

Media queries in ``apps/web/css/style.css`` establish responsive adaptations:

* **Desktop (Viewport > 1024px):**
  * 3-column restaurant discovery grid.
  * Side-by-side cart and order summary layout.
  * Full two-page passport book spread with 3D flip effects.
* **Tablet (Viewport 768px – 1024px):**
  * 2-column discovery grid.
  * Stacked cart view with sticky summary bar.
* **Mobile (Viewport < 768px):**
  * Single-column fluid cards.
  * Scrollable horizontal chips for cuisine selection.
  * Scaled-down passport view with touch-friendly controls.

Interactive Micro-Animations
----------------------------

* **Card Elevation:** Cards elevate on hover with a ``translateY(-3px)`` transform and subtle box-shadow expansion.
* **Toast Notification Slide:** ``.toast`` elements transition in from the bottom with a spring bezier over 250ms and automatically fade after 2.6 seconds.
* **3D Page Flip Matrix:** Passport flipbook utilizes ``perspective: 1600px`` and ``transform-style: preserve-3d`` to rotate book leaves smoothly across the Y-axis.
