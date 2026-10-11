.. _architecture_frontend:

Frontend Architecture & Styling
================================

Nomo's frontend is constructed with high-performance vanilla web standards: semantic HTML5 markup, modern CSS3 custom properties, and modular JavaScript (ES6+).

Page Composition Model
----------------------

Rather than an opaque single-page app bundle, Nomo leverages a **multi-page document architecture** where distinct URLs map to dedicated HTML endpoints:

.. list-table::
   :widths: 25 35 40
   :header-rows: 1

   * - Page Document
     - Route
     - Purpose & View Mounted
   * - ``index.html``
     - ``/``
     - Landing page, hero, world discovery experience, scroll-driven food ring, customer CTA.
   * - ``explore.html``
     - ``/explore.html``
     - 50-restaurant grid (``#rg``), city picker dropdown, cuisine filter chips (``#chips``), real-time query input.
   * - ``menu.html``
     - ``/menu.html?id=X``
     - Bespoke themed restaurant view, interactive image pan, table booking widget, vegetarian filter, dish list.
   * - ``cart.html``
     - ``/cart.html``
     - Interactive cart view, dish stepper, itemized summary with tax, fees, tip selector, order checkout.
   * - ``passport.html``
     - ``/passport.html``
     - Digital ID page, procedural stamp collection, 3D animated flipbook, rank milestones, active reservations.
   * - ``community.html``
     - ``/community.html``
     - Recommendation feed (Field Notes), dish review composer, like toggles, threaded replies.
   * - ``profile.html``
     - ``/profile.html``
     - Diner profile management, personal information edit, synchronized with passport.
   * - ``dash.html``
     - ``/dash.html``
     - Restaurant partner dashboard, code verification, profile updates, incoming guest reservations schedule.

Typography System
-----------------

Nomo avoids generic system sans-serif fonts in favor of curated Google Fonts pairs that communicate warmth and craft:

* **Fraunces & Nunito:** The primary brand voice. *Fraunces* delivers soft, serif warmth for hero titles and kicked headings, while *Nunito* offers clarity for interface controls.
* **Cormorant Garamond:** High-contrast classical serif used for Italian and Mediterranean restaurants (e.g., Nonna Fornace, Olive & Ember).
* **DM Serif Display:** Expressive editorial display serif for Indian, Thai, and BBQ menus.
* **Lora:** Refined contemporary serif used for Mexican and Ethiopian dining chapters.
* **Jost:** Clean geometric sans-serif for modern Japanese and Korean dining pages.

Theme & CSS Token Architecture
------------------------------

The global stylesheet ``apps/web/css/style.css`` is organized around CSS Custom Properties scoped to the root and dynamic themes:

.. code-block:: css

   :root {
     --font-title: 'Fraunces', Georgia, serif;
     --font-body: 'Nunito', system-ui, -apple-system, sans-serif;
     
     /* Light Theme Tokens */
     --bg: #f7f3ed;
     --surface: #ffffff;
     --ink: #2b2420;
     --ink-muted: #786c63;
     --border: #e8ded2;
     --primary: #9c5b3f;
     --primary-dark: #7b422a;
     --accent: #d28d70;
     --gold: #c98a2c;
   }

   [data-theme="dark"] {
     /* Dark Theme Tokens */
     --bg: #151312;
     --surface: #201c1a;
     --ink: #f4ede6;
     --ink-muted: #a3958a;
     --border: #352e2a;
     --primary: #d28d70;
     --primary-dark: #e6a88e;
     --accent: #e6a88e;
   }

Theme switching is instant: setting ``document.documentElement.dataset.theme = 'dark'`` updates the entire document cascade without page reloads.

Dynamic Restaurant Scenegraph Themes
------------------------------------

When navigating to a restaurant via ``menu.html?id=X``, ``app.js`` applies dynamic CSS variables to the root container (``--mbg``, ``--mi``, ``--ma``, ``--soft``, ``--bt``, ``--mf``), transforming the background, typography, button treatments, and subtle radial gradients to match the venue's individual aesthetic.
