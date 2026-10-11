.. _features_passport_gamification:

The Food Passport & Procedural Gamification
===========================================

The Food Passport (``apps/web/passport.html``) is Nomo's defining gamification feature, presenting diners with an authentic digital keepsake that chronicles their culinary travels.

Digital Identity Document
-------------------------

The passport begins with an official credential page styled after international travel passports:
* **Identification Photo:** Monogram initials tile styled after biometric passport badges.
* **Holder Profile:** Surname, given name, age, gender, country of residence, and date of issue.
* **Unique Passport Number:** Permanent identifier (e.g., ``NM7419203``).
* **Machine Readable Zone (MRZ):** Two-line standard travel document checksum string:
  
  .. code-block:: text

     P<NMOEXPLORER<<TEST<<<<<<<<<<<<<<<<<<
     NM7419203<NMO028<<<<<<<<<<<<<<<<<<<<<

* **Embossed Hologram Seal:** Displays an animated official authenticity seal.

Procedural Hand-Inked SVG Stamp Engine
--------------------------------------

Rather than displaying generic static icons, each restaurant earns a custom, procedurally generated vector SVG ink stamp:

* **10 Geometric Stamp Enclosures (``KIND`` & ``VAR``):**
  * Concentric circular seals (``c``) with solid, dashed, and coin-ridged borders.
  * Banded dual-hemisphere circles with horizontal ribbon date plates.
  * Smooth oval postal marks (``o``).
  * Rounded scalloped rectangles (``n``).
  * Quadrilateral ticket stamps with notched border trims (``q``).
  * Hexagonal and octagonal transit seals (``h``).
  * Arched portal marks (``a``).
  * Five-star rating rectangle cartouches.
* **10 Curated Ink Pigments (``INK``):**
  Deep navy (``#1d3d9c``), crimson red (``#c62828``), emerald green (``#1f8a4c``), imperial violet (``#6a2fa0``), cyan teal (``#0f7b8c``), and terracotta sienna (``#8b2a14``).
* **Hand-Drawn Vector Emblems (``EMB``):**
  Procedural paths representing pizza slices, spice vessels, solar bursts, rippling broth waves, compass stars, dumpling steamers, yin-yang noodles, barbecue smoke plumes, and foliage branches.
* **Dynamic Monospace Date Inscriptions:**
  Inscribed with the date the visit was logged (e.g., ``11 OCT 2026``).
* **Organic Angular Offsets:**
  Each stamp renders with a pseudorandom slight rotational tilt (``-18°`` to ``+18°``), simulating the natural imperfection of an in-person rubber hand-stamp.

3D Animated Passport Booklet (Flipbook)
=======================================

Diners can browse their accumulated stamps inside an interactive two-page passport spread:

* **Two-Page Spread:** Renders left and right pages with numbered visa headers.
* **3D Page Turn Animation:**
  Clicking **Next →** or **← Previous** splits the spread into front and back leaf elements, executing a CSS 3D matrix transform that flips the page across the spine over 980ms.
* **Reduced Motion Compliance:**
  Supports ``prefers-reduced-motion: reduce`` media queries by bypassing the animation and instantly swapping page indices.

Milestone Progression & Level Hierarchy
---------------------------------------

User progression is measured across 6 distinct ranks:

.. list-table::
   :widths: 20 25 55
   :header-rows: 1

   * - Rank Tier
     - Stamps Required
     - Description & Flavor Text
   * - **Newcomer**
     - 0 stamps
     - Starting tier for new accounts before their first order.
   * - **Beginner**
     - 1 stamp
     - Awarded on completing your first food order.
   * - **Novice**
     - 5 stamps
     - Shows an emerging palate across multiple neighborhoods.
   * - **Explorer**
     - 10 stamps
     - Familiar with distinct regional cuisines and cities.
   * - **Gourmet**
     - 15 stamps
     - Dedicated foodie with deep dining knowledge.
   * - **Connoisseur**
     - 20 stamps
     - Master of diverse flavor profiles and cultural dishes.
   * - **Legend**
     - 25 stamps
     - The pinnacle rank—a verified culinary traveler.

The page includes a visual progress bar and milestone roadmap indicating how many additional stamps are needed to reach the next rank.
