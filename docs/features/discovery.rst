.. _features_discovery:

City & Restaurant Discovery Engine
==================================

The discovery engine (``apps/web/explore.html``) allows users to explore a collection of 50 restaurants distributed across North Carolina's Research Triangle and Piedmont regions.

Geographic Coverage
-------------------

The catalog features 10 restaurants in each of 5 key culinary centers:

1. **Raleigh, NC** (Capital city dining, downtown districts, Glenwood South, Warehouse District, Five Points).
2. **Durham, NC** (Bull City dining, American Tobacco Campus, Brightleaf, Ninth Street).
3. **Charlotte, NC** (Queen City dining, South End, NoDa arts district, Plaza Midwood, Dilworth, Uptown).
4. **Cary, NC** (Downtown Cary, Preston, Waverly, Fenton, Park West).
5. **Chapel Hill, NC** (Franklin Street, Carrboro, Meadowmont, Eastgate).

Cuisine Spectrum
----------------

Restaurants span 10 global culinary categories:

* **Italian** (Hand-stretched pizza, artisanal pasta, wood-fired hearths).
* **Indian** (Thali suppers, tandoor grilling, regional curries, dosa).
* **Mexican** (Authentic taquerias, street tacos, mole poblano, arepas).
* **Japanese** (Late-night ramen bars, gyoza, udon, tempura).
* **Thai** (Wok-fired curries, basil stir-fries, noodle dishes).
* **Korean** (Gochujang bibimbap, twice-fried chicken, kimchi jjigae).
* **Southern BBQ** (Hickory and oak smoked pork shoulder, brisket, Carolina sides).
* **Chinese** (Dim sum, handmade dumplings, Sichuan peppercorn dishes).
* **Vietnamese** (Slow-simmered phở, vermicelli bowls, bánh mì).
* **Mediterranean / Ethiopian** (Mezze boards, sharing platters, injera stews).

Interactive Multi-City Dropdown Picker
--------------------------------------

The discovery interface features an accessible, custom dropdown picker (``#city-picker``):

* **Keyboard Navigation:**
  * ``ArrowDown`` / ``ArrowUp``: Traverses adjacent cities.
  * ``Home`` / ``End``: Jumps to the first ("All cities") or last ("Chapel Hill, NC") option.
  * ``Enter`` / ``Space``: Confirms selection and triggers query filtering.
  * ``Escape``: Dismisses the open dropdown and restores focus to the trigger.
* **ARIA Contract:**
  Uses ``role="option"``, ``aria-selected="true"``, and dynamic ``aria-expanded`` toggles.

Multi-Dimensional Search & Filtering
------------------------------------

The search filter evaluates input queries across multiple data attributes simultaneously:

.. code-block:: javascript

   const f = R.filter(r =>
     (city === "All" || r.city === city) &&
     (cuisine === "All" || r.c === cuisine) &&
     (r.n + r.c + r.a + r.city + r.m.map(m => m[0]).join())
       .toLowerCase()
       .includes(q)
   );

This allows users to search not only by restaurant name, but also by:
* Specific dishes (e.g., typing ``"cacio"`` brings up *Nonna Fornace*).
* Neighborhoods (e.g., typing ``"NoDa"`` matches Charlotte's *NoDa Forno*).
* Cuisines or cities.

Card Elements & Visited Badging
-------------------------------

Each restaurant card renders:
* High-resolution atmospheric cover photography.
* City tag (e.g., ``Raleigh, NC``) and cuisine pill.
* Average diner star rating (★) and price bracket (``$`` to ``$$``).
* A green **Visited** badge if the diner's passport already contains a stamp from this restaurant.
* Hover animations with subtle transforms and drop shadows.
