.. _features_cart_and_orders:

Cart & Order Processing
=======================

Nomo provides a comprehensive, responsive shopping cart and mock checkout experience (``apps/web/cart.html``) allowing users to assemble orders, customize tips, calculate localized taxes, and earn passport stamps.

Cart Operations & Lifecycle
---------------------------

* **Adding Dishes:**
  Clicking **Add to cart** on a restaurant menu item initializes the cart or increments item counts.
* **Single-Restaurant Constraint:**
  To preserve logistics integrity, a cart holds dishes from one restaurant at a time. If a user adds an item from another venue, a confirmation prompt offers to start a fresh cart.
* **Quantity Stepper:**
  Items can be dynamically adjusted or decremented to zero, which removes the dish and automatically resets the cart if empty.
* **Header Badge:**
  The shopping cart counter (``#cn``) updates in real time and automatically hides when the cart is cleared.

Financial Calculation Model
---------------------------

Order pricing is calculated via the ``bill()`` function:

.. code-block:: javascript

   const TAX = 0.0725; // 7.25% North Carolina State & County Sales Tax
   const FEE = 1.99;   // $1.99 Platform service fee
   let tip = 0.10;     // Default 10% gratuity

   const bill = () => {
     const sub = Object.values(cart.items).reduce((a, x) => a + x.p * x.q, 0);
     const tax = sub * TAX;
     const tp = sub * tip;
     return {
       sub,
       tax,
       tp,
       total: sub + tax + FEE + tp
     };
   };

Tip Customization
-----------------

Diners can dynamically adjust gratuity with instant recalculation:
* **No tip** (0%)
* **10%** (Default)
* **15%**
* **20%**

Checkout & Authentication Gate
------------------------------

When the user clicks **Place order**:

1. **Authentication Check:** If unauthenticated, the application triggers the login modal. If signed in as a restaurant partner, a toast notification instructs them to sign in with a diner account.
2. **Order Code Generation:** A unique order identifier is generated (e.g., ``#NM-39481``).
3. **Stamp Awarding & Rank Advancement:**

   * If the diner has fewer than 25 stamps, a new stamp entry for the current restaurant is appended to their user profile.
   * If the new total crosses a rank milestone (e.g., 5, 10, 15, 20, 25 stamps), a celebratory level-up toast appears (e.g., *"Level up: Novice!"*).

4. **Order Confirmation View:** Renders an order summary with estimated preparation time (25 minutes), dish recap, paid total, and direct action links to view the updated passport or return to exploration.
