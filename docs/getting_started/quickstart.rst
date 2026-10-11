.. _getting_started_quickstart:

Quickstart Walkthrough
======================

This interactive guide walks through the primary user journeys in Nomo, demonstrating how customer accounts, restaurant discovery, table reservations, shopping, and the food passport operate together.

1. Creating a Food Explorer Account
-----------------------------------

1. Open ``http://127.0.0.1:3000`` in your browser.
2. In the top navigation bar, click the **Account Menu** button (avatar icon labeled ``N``).
3. Select **Create an account**.
4. In the authentication modal:
   * Keep the role set to **DINERS**.
   * Fill in your **First name**, **Last name**, **Age**, **Gender**, and **Country of residence**.
   * Enter your **Email** and a secure **Password** (minimum 6 characters).
5. Click **Create account**.
6. Your account is created, a unique Passport Number (e.g., ``NM5829104``) is assigned, and your credentials are securely hashed via the Web Crypto API into ``localStorage``.

2. Exploring Restaurants
------------------------

1. Click **Explore** in the header navigation or the **Explore restaurants** button on the homepage.
2. Filter by **City**: Click the **Explore by city** dropdown to choose between:
   * *All cities* (50 restaurants across NC)
   * *Raleigh, NC* (10 restaurants)
   * *Durham, NC* (10 restaurants)
   * *Charlotte, NC* (10 restaurants)
   * *Cary, NC* (10 restaurants)
   * *Chapel Hill, NC* (10 restaurants)
3. Filter by **Cuisine**: Click category chips such as *Italian*, *Indian*, *Mexican*, *Japanese*, *Thai*, *Korean*, *Southern BBQ*, or *Chinese*.
4. Search in real time: Type dish names (e.g., ``biryani``, ``ramen``, ``tacos``) or restaurant titles into the search box.

3. Exploring a Menu & Reserving a Table
---------------------------------------

1. Click any restaurant card (e.g., **Nonna Fornace**).
2. The page loads with Nonna Fornace's bespoke visual theme palette.
3. Move your mouse or use the left/right arrow keys across the restaurant hero image to interactively pan the high-resolution dining scene.
4. Check the **Vegetarian dishes only** checkbox to instantly filter the menu items.
5. Click **Reserve a table**:
   * Select a date (Today, Tomorrow, or Day 3).
   * Pick your party size (1 to 8 guests).
   * Click an available time slot.
   * Click **Confirm reservation**.
6. A confirmation toast appears, and the reservation is pinned to your account schedule!

4. Ordering Dishes & Earning Passport Stamps
--------------------------------------------

1. Under the menu items, click **Add to cart** on your favorite dishes (e.g., *Margherita Pizza*).
2. Adjust quantities with the ``+`` and ``-`` steppers.
3. Click the **Cart** icon in the header (or **View cart**).
4. Review the itemized breakdown, including:
   * Subtotal
   * North Carolina sales tax (7.25%)
   * Flat service fee ($1.99)
   * Customizable tip (0%, 10%, 15%, or 20%)
5. Click **Place order**.
6. An order confirmation appears with an order tracking code (e.g., ``#NM-48192``) and notifies you that a new stamp has been inked into your passport!

5. Inspecting Your Food Passport
--------------------------------

1. Navigate to **Passport** in the header menu.
2. View your digital passport ID page displaying:
   * Your name, age, country, and issue date.
   * Visual MRZ (Machine Readable Zone) code.
   * Total places visited and stamps collected.
3. View the **Stamps collected** grid: Each restaurant has a custom hand-inked stamp geometry, ink color, and date stamp.
4. Scroll to **Your passport book**: Click **Next →** or **← Previous** to flip through realistic 3D pages.
5. Track your rank on the **Food roadmap**:
   * *Beginner* (1 stamp)
   * *Novice* (5 stamps)
   * *Explorer* (10 stamps)
   * *Gourmet* (15 stamps)
   * *Connoisseur* (20 stamps)
   * *Legend* (25 stamps)

6. Sharing Field Notes in the Community Feed
--------------------------------------------

1. Navigate to **Community**.
2. Select the restaurant you ordered from.
3. Enter the dish name and write a brief culinary reflection.
4. Click **Share your note →**.
5. Your recommendation is immediately published to the community feed where other diners can like it or leave threaded replies!
