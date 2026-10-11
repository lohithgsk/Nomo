.. _testing_test_suites:

Test Suites Breakdown
=====================

Nomo's test suite contains comprehensive browser test specs covering the entire application surface.

.. list-table::
   :widths: 25 35 40
   :header-rows: 1

   * - Test File
     - Scope & Feature Focus
     - Test Cases Included
   * - ``tests/smoke.spec.js``
     - Route availability & HTTP status
     - Verifies 200 OK responses on ``/``, ``/explore.html``, ``/menu.html``, and ``/cart.html``.
   * - ``tests/ui.spec.js``
     - UI layout & search sanity
     - Checks homepage hero title, explore page heading, restaurant grid rendering, and keyword search.
   * - ``tests/account.spec.js``
     - Authentication, theme, and profile
     - 10 comprehensive tests covering guest states, email validation, password length checks, user creation, persistence, theme toggling, passport views, and signout.
   * - ``tests/discovery.spec.js``
     - Discovery, filters, menus, and scenes
     - 10 tests verifying 50-restaurant count, cuisine filtering, city dropdown selection, name/dish queries, empty states, menu routing, vegetarian filter, and keyboard scene panning.
   * - ``tests/shopping-community.spec.js``
     - Cart, calculations, orders, and feed
     - 10 tests verifying empty cart states, adding items, quantity modification, removal, tip changes, auth gates, order placement, guest states, like gates, and note publishing.

Running Tests
-------------

To run all tests locally:

.. code-block:: bash

   npm test

To run in debug mode with interactive Playwright UI:

.. code-block:: bash

   npx playwright test --ui

To execute a single test file:

.. code-block:: bash

   npx playwright test tests/discovery.spec.js
