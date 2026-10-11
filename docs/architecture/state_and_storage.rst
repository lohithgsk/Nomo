.. _architecture_state_and_storage:

State Management & Storage Architecture
=======================================

Nomo utilizes an in-memory reactive state synchronized with the browser's ``localStorage`` engine for zero-dependency client persistence.

Storage Keys & Data Model
-------------------------

All persisted client data is stored under the ``nomo_*`` namespace:

.. list-table::
   :widths: 25 30 45
   :header-rows: 1

   * - Storage Key
     - Stored Data Type
     - Description
   * - ``nomo_users``
     - Object map: ``{ [email]: User }``
     - Registered customer accounts, profile details, and earned stamps array.
   * - ``nomo_rests``
     - Object map: ``{ [code]: Restaurant }``
     - Registered restaurant partner profiles and contact details.
   * - ``nomo_res``
     - Array: ``Reservation[]``
     - Booked table reservations for both diners and restaurant partners.
   * - ``nomo_cart``
     - Object: ``{ rid: number, items: { [dish]: { p: number, q: number } } }``
     - Active cart state holding restaurant ID and dish item quantities.
   * - ``nomo_posts``
     - Array: ``Post[]``
     - Community field notes, recommendation entries, likes, and reply threads.
   * - ``nomo_me``
     - String (Email) or ``null``
     - Current logged-in diner session identifier.
   * - ``nomo_rme``
     - String (Code) or ``null``
     - Current logged-in restaurant partner code identifier.
   * - ``nomo_theme``
     - String: ``"light"`` | ``"dark"``
     - Diner's preferred UI theme mode.
   * - ``nomo_welcome``
     - String | ``null``
     - Transient one-time greeting toast trigger after successful login redirect.

Accessor Helpers
----------------

All storage operations flow through lightweight wrapper functions in ``apps/web/js/app.js``:

.. code-block:: javascript

   // Load with fallback default
   const ld = (k, d) => {
     try {
       return JSON.parse(localStorage.getItem(k)) ?? d;
     } catch (e) {
       return d;
     }
   };

   // Save serialized JSON safely
   const sv = (k, v) => {
     try {
       localStorage.setItem(k, JSON.stringify(v));
     } catch (e) {}
   };

Reactive State Cache
--------------------

During execution, in-memory references maintain active runtime state:

.. code-block:: javascript

   let users = ld("nomo_users", {});
   let rests = ld("nomo_rests", {});
   let res = ld("nomo_res", []);
   let cart = ld("nomo_cart", { rid: null, items: {} });
   let me = ld("nomo_me", null);
   let rme = ld("nomo_rme", null);
   let cuisine = "All";
   let city = "All";
   let cur = null;
   let posts = ld("nomo_posts", [...]);

Whenever state modifications occur (such as adding items to cart or signing up), ``sv()`` commits the new state to ``localStorage``, and associated UI rendering functions (``explore()``, ``menuPage()``, ``cartPage()``, ``passport()``) execute synchronously.

Migration Path to Production Backend
-------------------------------------

While the client-side storage architecture delivers a zero-setup development environment, the design is explicitly partitioned for backend service integration:

1. **Authentication:**
   Replace ``users[em].h !== h`` validation with standard OAuth2 / JWT bearer token exchange with an API endpoint (``POST /api/v1/auth/token``).
2. **Database Persistence:**
   Migrate ``nomo_res`` and ``nomo_posts`` to a MongoDB or PostgreSQL relational schema with user ownership constraints.
3. **Cart & Payment Integration:**
   Transfer the ``bill()`` calculation to an order checkout session endpoint integrated with Stripe or Square.
