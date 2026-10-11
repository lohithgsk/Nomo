.. _technical_procedural_stamps:

Procedural Stamp Geometry Engine
================================

Nomo's procedural stamp engine generates SVG stamps representing real-world rubber stamps.

Vector Stamp Pipeline
---------------------

When ``stamp(id, ds, u)`` executes:

1. **Style Hashing:** The restaurant ID determines the ink color index (``si = id % INK.length``), frame shape (``KIND[si]``), and outline variation (``VAR[si]``).
2. **Path Geometry Generation:** Constructs SVG geometric borders (circles, arches, polygons, or rounded ticket rectangles).
3. **Text Path Mapping:** Places the restaurant's name and location on curved vector paths using SVG ``<textPath>`` elements.
4. **Monospace Date Plate:** Renders the date string in a dedicated bounding box in a bold monospace font.
5. **Emblem Insertion:** Injects a central symbolic vector icon (``EMB[si]``) centered at ``(100, 100)``.
6. **Ink Filter Bleed:** Applies an SVG turbulence/displacement filter to simulate ink bleeding slightly into paper fibers.

Shape Specifications
--------------------

.. list-table::
   :widths: 15 25 60
   :header-rows: 1

   * - Key
     - Geometry
     - Construction Formula
   * - ``c``
     - Circle
     - Concentric ``<circle>`` tags (``r=92``, ``r=84``, ``r=55``).
   * - ``o``
     - Oval
     - Dual ``<ellipse>`` tags (``rx=94, ry=70`` and ``rx=86, ry=62``).
   * - ``n``
     - Scalloped Ticket
     - Closed ``<path>`` with corner arcs and perforated horizontal separator line.
   * - ``q``
     - Quadrilateral
     - Dual concentric ``<rect>`` tags with rounded corners and dotted inner margins.
   * - ``h``
     - Hexagon / Octagon
     - Multi-point ``<polygon>`` border.
   * - ``a``
     - Arched Portal
     - Upright vertical pill shape with curved top arch (``d="M22 190V92A78 78 0 0 1 178 92V190Z"``).

Natural Rotational Variations
-----------------------------

To emulate human stamping, each rendered stamp in the collection is rotated dynamically:

.. code-block:: javascript

   const rotation = (k * 53 % 30) - 15; // Random-looking rotation between -15° and +15°
   style = `transform: rotate(${rotation}deg)`;
