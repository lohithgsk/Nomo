.. _features_theme_engine:

Theme Engine & Dark Mode
========================

Nomo features an integrated dark and light theme engine designed for visual comfort, legibility, and high contrast across diverse ambient lighting conditions.

Theme Initialization & Auto-Detection
-------------------------------------

On page load, the theme engine evaluates the following precedence:

1. **User Preference in Local Storage:**
   Checks ``nomo_theme`` for an explicitly selected value (``"dark"`` or ``"light"``).
2. **Operating System Preference:**
   Falls back to CSS media query detection via ``window.matchMedia("(prefers-color-scheme: dark)")``.

.. code-block:: javascript

   theme(ld("nomo_theme", matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));

Toggle Mechanism
----------------

The header features an interactive theme toggle button (``#th``):
* Shows ``☀️`` (sun) when dark mode is active to indicate switching to light mode.
* Shows ``🌙`` (moon) when light mode is active to indicate switching to dark mode.
* Clicking ``#th`` flips the current theme, updates ``document.documentElement.dataset.theme``, persists the preference to ``nomo_theme``, and immediately triggers rerendering of active views (e.g., ``menuPage()`` or ``explore()``) to update theme-dependent palette calculations.

CSS Custom Properties Cascade
-----------------------------

Colors are defined semantically so that switches update the visual interface across all components:

.. list-table::
   :widths: 30 35 35
   :header-rows: 1

   * - Semantic Token
     - Light Mode Value
     - Dark Mode Value
   * - ``--bg``
     - ``#f7f3ed`` (Soft parchment)
     - ``#151312`` (Deep charcoal)
   * - ``--surface``
     - ``#ffffff`` (Clean white card)
     - ``#201c1a`` (Muted dark slate)
   * - ``--ink``
     - ``#2b2420`` (Espresso dark brown)
     - ``#f4ede6`` (Warm cream white)
   * - ``--ink-muted``
     - ``#786c63``
     - ``#a3958a``
   * - ``--border``
     - ``#e8ded2``
     - ``#352e2a``
   * - ``--primary``
     - ``#9c5b3f`` (Terracotta)
     - ``#d28d70`` (Soft clay)
   * - ``--accent``
     - ``#d28d70``
     - ``#e6a88e``
