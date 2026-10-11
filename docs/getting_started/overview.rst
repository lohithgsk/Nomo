.. _getting_started_overview:

Project Overview
================

**Nomo** is a gamified restaurant discovery platform designed to turn eating out into an ongoing journey rather than a series of disconnected restaurant searches. By combining personalized recommendations, localized geographic exploration, procedural gamification, and digital rewards, Nomo transforms dining into an exploratory adventure.

.. grid:: 2
   :gutter: 3

   .. grid-item-card:: 🌍 Curated Exploration
      :class-card: sd-shadow-sm

      Browse 50 hand-curated restaurants across 5 North Carolina culinary hubs (Raleigh, Durham, Charlotte, Cary, and Chapel Hill) filtered by cuisine, price point, ratings, and dietary preferences.

   .. grid-item-card:: 🛂 Procedural Food Passport
      :class-card: sd-shadow-sm

      Collect authentic, procedural SVG stamps with unique inks and vector emblems for each restaurant you visit. Flip through a realistic 3D animated passport booklet and rank up from Beginner to Legend.

   .. grid-item-card:: 🍲 Themed Restaurant Menus
      :class-card: sd-shadow-sm

      Experience bespoke visual themes tailored to each restaurant's culinary character, complete with interactive scene panning, photo-driven dish cards, and dietary tags.

   .. grid-item-card:: 👥 Dual Account Workflows
      :class-card: sd-shadow-sm

      Seamlessly support both **Food Explorers** (browsing menus, collecting stamps, and sharing field notes) and **Restaurant Partners** (managing profiles, schedules, and reservations).

The Core Loop
-------------

At the heart of the Nomo experience is a cyclical engagement model:

.. code-block:: text

   ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
   │ 1. Discover  │ ──> │   2. Visit   │ ──> │ 3. Complete  │
   │ Curated Food │     │ & Order Meal │     │ Checkout     │
   └──────────────┘     └──────────────┘     └──────────────┘
          │                                         │
          │                                         v
   ┌──────────────┐     ┌──────────────┐     ┌──────────────┐
   │  6. Explore  │ <── │  5. Unlock   │ <── │   4. Earn    │
   │ Further / Map│     │ Rank / Perks │     │ Passport Ink │
   └──────────────┘     └──────────────┘     └──────────────┘

1. **Discover:** The diner searches by city, cuisine, dish keyword, or explores the world map for inspiration.
2. **Visit:** They inspect the restaurant menu, review vegetarian selections, and choose dishes or book a table reservation.
3. **Complete:** The guest or authenticated user builds a cart, customizes tips, and checks out.
4. **Earn:** Placing an order awards an ink stamp procedurally generated for that specific restaurant.
5. **Unlock:** Earning stamps advances user progression from *Newcomer* through 6 rank tiers, unlocking every 5 stamps.
6. **Explore Further:** diners share field notes in the community feed, inspiring others and fueling repeat discoveries.

Monorepo Ecosystem
------------------

Nomo is organized as a unified monorepo architected for growth:

.. code-block:: text

   nomo/
   ├── apps/
   │   ├── api/              # Planned FastAPI / Express backend services
   │   ├── mobile/           # Planned React Native / Flutter mobile client
   │   └── web/              # Active HTML5/CSS3/Vanilla JS web application
   ├── packages/
   │   ├── shared/           # Planned shared TypeScript types, constants, validators
   │   └── design-system/    # Planned reusable design tokens & components
   ├── infra/                # Infrastructure-as-code and container manifests
   ├── docs/                 # Comprehensive Sphinx documentation & ADRs
   ├── tests/                # End-to-end Playwright tests & coverage harnesses
   ├── scripts/              # Automated build, CI, and test summarization scripts
   └── .github/              # GitHub Actions workflows, CodeQL, and issue templates

Design Philosophy
-----------------

* **Zero-Framework Frontend:** Maximum speed, zero client runtime bloat, and pure standards compliance using vanilla JavaScript, modern CSS Grid/Flexbox, and semantic HTML5.
* **Warm, Editorial Aesthetic:** Stepping away from sterile, corporate directory apps, Nomo embraces editorial typography, soft parchment palettes, and tactile interactions reminiscent of traditional travel guides and passports.
* **Accessible and Responsive:** Designed mobile-first, supporting fluid responsive viewports, full keyboard accessibility, ARIA landmark roles, and high-contrast dark and light modes.
