.. _features_restaurant_menu:

Themed Restaurant Menus & Hero Panning
======================================

When navigating to an individual restaurant via ``menu.html?id=X``, the application transforms into a bespoke, restaurant-specific dining page.

Interactive Hero Panning Engine
===============================

The hero banner (``#restaurant-hero``) incorporates an interactive pointer and keyboard panning mechanism that provides a tactile sense of place:

* **Pointer Tracking:**
  Moving the mouse horizontally across the hero container computes the cursor's relative offset from the center (``-1`` to ``+1``) and shifts the underlying photo using a custom CSS variable ``--scene-pan-x`` (bounded between ``-8%`` and ``+8%``).
* **Smooth Reset:**
  When the cursor leaves the hero (``pointerleave``), the pan position smoothly returns to ``0%``.
* **Keyboard Navigation:**
  The hero container is focusable (``tabindex="0"``) and responds to:
  * ``ArrowRight``: Shifts the viewport 4% to the right.
  * ``ArrowLeft``: Shifts the viewport 4% to the left.
  * ``Home``: Re-centers the viewport to 0%.

Atmospheric Palettes & Visual Themes
------------------------------------

Each restaurant index is paired with a curated color theme (defined in array ``T`` in ``app.js``):

.. list-table::
   :widths: 20 20 20 20 20
   :header-rows: 1

   * - Theme Index
     - Background (``bg``)
     - Ink (``ink``)
     - Accent (``acc``)
     - Heading Font
   * - 0 (Italian)
     - ``#f4ede1``
     - ``#3a2e26``
     - ``#9c5b3f``
     - Cormorant Garamond
   * - 1 (Indian)
     - ``#f4e3dc``
     - ``#43272a``
     - ``#a34a4f``
     - DM Serif Display
   * - 2 (Mexican)
     - ``#f1efe0``
     - ``#2f3b2c``
     - ``#c0673a``
     - Lora
   * - 3 (Japanese)
     - ``#f1f1ee``
     - ``#222222``
     - ``#b23a3a``
     - Jost
   * - 4 (Ethiopian)
     - ``#efe3d0``
     - ``#3b2a1a``
     - ``#7d6224``
     - Lora
   * - 5 (Thai)
     - ``#e9f0eb``
     - ``#1f3a33``
     - ``#3f7a68``
     - DM Serif Display
   * - 6 (Korean)
     - ``#f5f1ee``
     - ``#2b2a2a``
     - ``#c2564b``
     - Jost
   * - 7 (Mediterranean)
     - ``#eaf1f4``
     - ``#1f3444``
     - ``#3f7c9b``
     - Cormorant Garamond
   * - 8 (Southern BBQ)
     - ``#24201d``
     - ``#efe3d3``
     - ``#d68a4c``
     - DM Serif Display
   * - 9 (Chinese)
     - ``#2a2229``
     - ``#f0e4dd``
     - ``#d9a77c``
     - Cormorant Garamond

In dark mode, these values automatically transform to high-contrast, deep-carbon variants (e.g., ``#171514``).

Dietary Badging & Vegetarian Toggle
-----------------------------------

* **Dietary Tagging:**
  Every menu dish has an explicit boolean flag denoting whether it is vegetarian. Dishes display visual green/red dietary markers with accessible ``aria-label`` text (e.g., ``Vegetarian`` or ``Non-vegetarian``).
* **Vegetarian Toggle:**
  Diners can toggle the **Vegetarian dishes only** checkbox (``#veg-menu``).
* **URL State Synchronization:**
  Toggling vegetarian mode updates the URL query parameters (``?id=0&veg=1``) via ``history.replaceState()``, making filtered views shareable and bookmarkable.

Dish Imagery Matching Heuristic
-------------------------------

Nomo dynamically selects photographic assets from an Unsplash high-resolution food collection using semantic regex matching on the dish name:

.. code-block:: javascript

   function dishPhoto(r, dish, index) {
     const n = dish.toLowerCase();
     const group = /cake|tiramisu|churro|baklava|pudding|mochi|dessert/i.test(n)
       ? "dessert"
       : /lassi|lemonade|drink/i.test(n)
       ? "drink"
       : /pizza|margherita/i.test(n)
       ? "pizza"
       : /pasta|cacio/i.test(n)
       ? "pasta"
       : /taco|arepa/i.test(n)
       ? "taco"
       : /noodle|pho|ramen/i.test(n)
       ? "noodle"
       : /curry|thali|dosa|masala/i.test(n)
       ? "curry"
       : /dumpling|gyoza/i.test(n)
       ? "dumpling"
       : /salad|greens|mezze|hummus/i.test(n)
       ? "greens"
       : "bbq";
     // Selects curated image using deterministic hash modulo
   }

This guarantees that dishes match their photographic presentation accurately.
