.. _architecture_overview:

System Architecture
===================

This document outlines the architectural blueprint of the Nomo platform, spanning its monorepo organization, frontend execution model, data layer, and future backend integration strategy.

Architecture Diagram
--------------------

.. code-block:: text

   ┌────────────────────────────────────────────────────────────────────────┐
   │                            CLIENT LAYER                                │
   │                                                                        │
   │  ┌──────────────────────────────────────────────────────────────────┐  │
   │  │                 Nomo Web Client (apps/web)                       │  │
   │  │                                                                  │  │
   │  │  Pages: index, explore, menu, cart, passport, community, dash    │  │
   │  │  Styling: CSS Custom Properties, Responsive Grid, Font Engine    │  │
   │  │  Engine: app.js (State, procedural stamps, 3D flipbook, pan)     │  │
   │  └──────────────────────────────────────────────────────────────────┘  │
   │                                   │                                    │
   │                                   ▼                                    │
   │  ┌──────────────────────────────────────────────────────────────────┐  │
   │  │                    BROWSER PLATFORM RUNTIME                      │  │
   │  │                                                                  │  │
   │  │  • Web Crypto API (SubtleCrypto SHA-256 password hashing)        │  │
   │  │  • LocalStorage (Synchronous client-side persistence)            │  │
   │  │  • History API (URL queries for deep-linking: ?id=0&veg=1)       │  │
   │  │  • MatchMedia (System theme preference detection)                │  │
   │  └──────────────────────────────────────────────────────────────────┘  │
   └────────────────────────────────────────────────────────────────────────┘
                                       │
                         (Planned REST / JWT Layer)
                                       ▼
   ┌────────────────────────────────────────────────────────────────────────┐
   │                         FUTURE BACKEND LAYER                           │
   │                                                                        │
   │  ┌──────────────────────────────────────────────────────────────────┐  │
   │  │                 FastAPI REST API (apps/api)                      │  │
   │  │                                                                  │  │
   │  │  • JWT Authentication & OAuth2                                   │  │
   │  │  • MongoDB Engine (GeoJSON restaurant search & indexing)         │  │
   │  │  • Stripe / Square Webhook Payment Handlers                      │  │
   │  │  • Image CDN Pipeline                                            │  │
   │  └──────────────────────────────────────────────────────────────────┘  │
   └────────────────────────────────────────────────────────────────────────┘

Monorepo Structure
------------------

The repository is structured as a modular workspace prepared for multi-application development:

* ``apps/web``:
  The active web client. Serves multi-page HTML documents with bundled vanilla JavaScript (``js/app.js``), global stylesheet (``css/style.css``), and world border vectors (``world-country-borders.svg``).
* ``apps/api``:
  Planned backend services. Targeted for Python/FastAPI with async database drivers and token-based authentication.
* ``apps/mobile``:
  Planned cross-platform mobile client (React Native) sharing design tokens with the web client.
* ``packages/shared``:
  Planned package for shared TypeScript models, validation schemas, and constants.
* ``packages/design-system``:
  Planned design system package for reusable component tokens, typography rules, and color palettes.
* ``infra/``:
  Infrastructure definitions, Docker manifests, and future cloud deployment specifications.
* ``docs/``:
  Sphinx documentation source files, configuration, and Architecture Decision Records (ADRs).
* ``tests/``:
  Playwright end-to-end tests, Chrome DevTools Protocol coverage fixtures, and helpers.
* ``scripts/``:
  CI test and coverage summarization scripts.

Key Architectural Principles
----------------------------

1. **Lightweight Decoupling:**
   The frontend is currently decoupled from proprietary runtime frameworks, rendering rapidly without bundle download bottlenecks or virtual DOM reconciliation overhead.
2. **Deterministic State Modeling:**
   All mutations—whether adding dishes to a cart, submitting reservations, collecting stamps, or toggling themes—operate through deterministic update functions that serialize directly to local storage.
3. **Graceful Fallbacks:**
   Unsplash photography elements include image-missing listeners and emoji fallbacks to guarantee interface stability even in offline or constrained network conditions.
4. **Accessible Semantics:**
   Semantic HTML5 tags (``<nav>``, ``<main>``, ``<header>``, ``<article>``, ``<aside>``, ``<dialog>``) and ARIA attributes (``role="region"``, ``role="option"``, ``aria-selected``, ``aria-expanded``) are used throughout.
