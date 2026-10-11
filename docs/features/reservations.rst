.. _features_reservations:

Table Reservations Engine
=========================

Nomo integrates table reservations directly into restaurant menu views, providing a frictionless flow for planning in-person dining.

Reservation Flow
----------------

1. On any restaurant menu page (``menu.html?id=X``), the hero displays a prominent **Reserve a table** button.
2. Clicking the button expands the reservation module:
   * **Rolling 3-Day Horizon:** Generates date chips for Today, Tomorrow, and Day 3 (e.g., ``Sun, Oct 11``).
   * **Party Size Selection:** Configurable dropdown supporting 1, 2, 3, 4, 5, 6, or 8 guests.
   * **Time Slot Generation:** Calculates 10 half-hour booking slots spanning dinner service from 5:00 PM to 9:30 PM.

Capacity Simulation
-------------------

To simulate real-world restaurant occupancy, available slots are evaluated via a deterministic capacity hash:

.. code-block:: javascript

   const slotsFor = (id, d) =>
     Array.from({ length: 10 }, (_, i) => {
       const m = 1020 + i * 30; // Minutes from midnight (1020 = 5:00 PM)
       const h = Math.floor(m / 60);
       return {
         t: `${h > 12 ? h - 12 : h}:${m % 60 ? "30" : "00"} PM`,
         full: (id * 7 + d * 3 + i * 5) % 4 === 0
       };
     });

Slots flagged as ``full`` are visually muted and disabled, preventing overbooking.

Confirmation & Synchronized Views
---------------------------------

When an authenticated diner confirms a booking:

1. The reservation is assigned a timestamped ID and saved to ``nomo_res``.
2. A confirmation toast displays the details (e.g., *"Table for 2 at Nonna Fornace, 7:00 PM"*).
3. The booking is pinned to:

   * The diner's **Food Passport** under **Reservations**.
   * The **Restaurant Partner Dashboard** (``dash.html``) for the matched venue.
