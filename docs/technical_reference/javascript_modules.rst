.. _technical_javascript_modules:

JavaScript Architecture & API Reference
=======================================

The entire frontend client logic is contained within ``apps/web/js/app.js``. This document provides an exhaustive technical reference for all core functions, data constants, event bindings, and controllers.

Global Constants & Data Stores
------------------------------

.. list-table::
   :widths: 25 30 45
   :header-rows: 1

   * - Constant
     - Data Type
     - Description
   * - ``R``
     - Array of Objects
     - Master registry of 50 restaurants. Contains ``id``, name ``n``, cuisine ``c``, neighborhood ``a``, price ``p``, rating ``s``, emoji ``e``, city, and dishes array ``m``.
   * - ``AD``
     - Array of Strings
     - Curated street addresses assigned across venue locations.
   * - ``T``
     - Array of 10 Theme Objects
     - Visual palette tokens (``bg``, ``ink``, ``soft``, ``acc``, ``bt``, ``font``) for each restaurant index.
   * - ``DS``
     - 2D Array of Strings
     - Sensory culinary descriptions for hallmark dishes.
   * - ``VEG``
     - ``Set<string>``
     - Hash set of inherently vegetarian dish titles for fast lookup.
   * - ``LV``
     - Array of Tuples
     - Level rank titles and stamp thresholds: ``[["Beginner", 1], ["Novice", 5], ..., ["Legend", 25]]``.
   * - ``SCENES``
     - Array of Objects
     - Atmospheric headline and story snippets paired with photo URLs for restaurant hero headers.
   * - ``FOOD_PHOTOS``
     - Object map
     - Unsplash photo IDs categorized by food style (``pizza``, ``pasta``, ``curry``, ``taco``, ``noodle``, etc.).

Utility Functions
-----------------

``$(id)``
~~~~~~~~~
Shorthand selector equivalent to ``document.getElementById(id)``.

``esc(s)``
~~~~~~~~~~
Sanitizes a string to prevent XSS by replacing ``&``, ``<``, ``>``, and ``"`` with their respective HTML entities.

``ld(k, d)``
~~~~~~~~~~~~
Loads a key from ``localStorage``, parsing JSON. Returns fallback default ``d`` if missing or parsing errors.

``sv(k, v)``
~~~~~~~~~~~~
Serializes value ``v`` to JSON and writes it safely to ``localStorage`` under key ``k``.

``money(n)``
~~~~~~~~~~~~
Formats a numeric currency value to a fixed two-decimal string prefixed with ``$`` (e.g., ``"$14.50"``).

``hash(s)``
~~~~~~~~~~~
Computes an asynchronous SHA-256 digest using ``crypto.subtle.digest()`` and returns a 64-character lowercase hexadecimal string.

``lvl(n)``
~~~~~~~~~~
Computes the diner's active rank level index in ``LV`` given a stamp count ``n``. Returns ``-1`` for Newcomer.

``imageUrl(id, width)``
~~~~~~~~~~~~~~~~~~~~~~~
Constructs an optimized Unsplash asset URL with WebP formatting, center crop, and custom pixel width.

``dishPhoto(r, dish, index)``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Resolves the most appropriate photograph for a specific dish based on regex keyword grouping and restaurant index hashing.

Controllers & Page Renderers
----------------------------

``explore()``
~~~~~~~~~~~~~
Renders the 50-restaurant grid, sets up city dropdown picker, binds cuisine chips, and filters cards based on search input and active filters.

``menuPage()``
~~~~~~~~~~~~~~
Reads the ``id`` query parameter from ``window.location.search``, applies the restaurant's visual theme variables, renders the interactive hero, reservations widget, dietary toggle, and dish items.

``initScenePan(hero)``
~~~~~~~~~~~~~~~~~~~~~~
Attaches pointermove, pointerleave, and keyboard event handlers (``ArrowLeft``, ``ArrowRight``, ``Home``) to enable horizontal scene panning on the restaurant hero image.

``cartPage()``
~~~~~~~~~~~~~~
Renders the shopping cart view. Displays empty cart CTA if empty, order success card if recently completed, or itemized cart with subtotal, tax, fees, tip chips, and checkout action.

``order()``
~~~~~~~~~~~
Validates diner authentication, computes totals, appends a new stamp to the diner's passport, triggers rank-up toasts, clears the cart, and displays the order confirmation screen.

``passport()``
~~~~~~~~~~~~~~
Renders the digital passport document: photo ID block, Machine Readable Zone (MRZ), procedural stamps grid, 3D animated flipbook booklet, rank roadmap, and reservation list.

``flipBook(direction)``
~~~~~~~~~~~~~~~~~~~~~~~
Performs an animated 3D page turn (left or right) across the passport book spread, executing over 980ms or instantaneously if reduced-motion is requested.

``community()``
~~~~~~~~~~~~~~~
Renders the Field Notes recommendation feed and note composition form. Binds like buttons and threaded reply prompts.

``dash()``
~~~~~~~~~~
Renders the Restaurant Partner dashboard. Displays restaurant code, contact details editor, and incoming reservation schedule.

``theme(mode)``
~~~~~~~~~~~~~~~
Applies theme mode (``"dark"`` or ``"light"``) to ``document.documentElement.dataset.theme``, updates toggle button icon, and persists the setting to storage.
