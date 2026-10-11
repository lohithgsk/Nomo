.. _features_interactive_map:

Interactive World Map & Global Discovery
========================================

The homepage (``apps/web/index.html``) features an interactive vector map experience that transports visitors through culinary traditions around the globe.

Component Structure
-------------------

The world discovery section consists of:
1. An SVG world map rendered with vectorized country outlines from ``world-country-borders.svg``.
2. A continuous, infinite horizontal scrolling track (``#world-map-track``) that clones vector geometry for seamless cyclical panning.
3. Interactive destination pins positioned over key gastronomic capitals.
4. A dynamic information card (``#world-detail``) detailing the region, city, hallmark dish, and cultural narrative.

Destination Database
--------------------

The global discovery feature maintains a database of 13 iconic food regions across 6 continents:

.. list-table::
   :widths: 20 20 25 35
   :header-rows: 1

   * - Destination Key
     - Region / City
     - Landmark Dish
     - Narrative Highlight
   * - ``mexico``
     - Oaxaca, Mexico
     - Mole negro
     - Deep, slow-built sauce layered with chiles, spices, and chocolate.
   * - ``new-york``
     - New York, USA
     - New York–style pizza
     - Wide, foldable slice with crisp base and bubbling mozzarella.
   * - ``new-orleans``
     - Louisiana, USA
     - Gumbo
     - Slow-simmered roux with local seafood and Creole spice.
   * - ``peru``
     - Lima, Peru
     - Ceviche
     - Fresh fish cured in citrus with ají, red onion, and leche de tigre.
   * - ``senegal``
     - Dakar, Senegal
     - Thieboudienne
     - Celebrated rice and fish, simmered with tomato and vegetables.
   * - ``morocco``
     - Marrakech, Morocco
     - Chicken tagine
     - Tender chicken with preserved lemon, olives, and warm spices.
   * - ``italy``
     - Naples, Italy
     - Pizza Margherita
     - Blistered Neapolitan crust, sweet tomato, mozzarella, and fresh basil.
   * - ``lebanon``
     - Beirut, Lebanon
     - Mezze & hummus
     - Velvety chickpea hummus, olive oil, and warm table sharing.
   * - ``india``
     - Delhi, India
     - Butter chicken
     - Tandoor-kissed chicken in gently spiced tomato and butter sauce.
   * - ``thailand``
     - Bangkok, Thailand
     - Pad Thai
     - Tamarind-bright noodles with peanuts, lime, and holy basil.
   * - ``south-korea``
     - Seoul, South Korea
     - Bibimbap
     - Sizzling rice bowl with seasonal greens, beef, and gochujang.
   * - ``japan``
     - Tokyo, Japan
     - Edomae sushi
     - Seasoned vinegared rice and pristine fresh seafood.
   * - ``france``
     - Paris, France
     - Butter croissant
     - Laminated pastry with delicate crisp layers and buttery crumb.

Spatial Mathematics & Nearest Neighbor Detection
------------------------------------------------

Because the map continuously scrolls across the viewport, standard static pointer hit-testing is insufficient. Nomo implements a nearest-neighbor spatial algorithm:

.. code-block:: javascript

   const nearestWorldMarker = (x, y) => {
     const globe = worldExperience?.querySelector(".world-globe");
     const bounds = globe?.getBoundingClientRect();
     if (!bounds) return null;
     
     let nearest = null;
     let nearestDistance = Infinity;
     
     mapTrack?.querySelectorAll(".world-marker").forEach(marker => {
       const rect = marker.getBoundingClientRect();
       const centerX = rect.left + rect.width / 2;
       const centerY = rect.top + rect.height / 2;
       
       // Ensure marker is within visible viewport bounds
       if (
         centerX < bounds.left ||
         centerX > bounds.right ||
         centerY < bounds.top ||
         centerY > bounds.bottom
       )
         return;
         
       // Calculate Euclidean distance squared
       const distance = (centerX - x) ** 2 + (centerY - y) ** 2;
       if (distance < nearestDistance) {
         nearest = marker;
         nearestDistance = distance;
       }
     });
     return nearest;
   };

Accessibility & Keyboard Controls
---------------------------------

* Interactive pins are marked with ``role="button"`` and ``aria-pressed="false"``.
* Focus events (``focusin`` / ``focusout``) trigger ``showWorldDestination()`` and ``hideWorldDestination()``.
* The cloned loop geometry is explicitly tagged with ``aria-hidden="true"`` to prevent duplicate screen reader announcements.
