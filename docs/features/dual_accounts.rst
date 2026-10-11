.. _features_dual_accounts:

Dual-Account Identity System
============================

Nomo supports two distinct user archetypes through a unified modal authentication dialog and role-specific workflows: **Food Explorers (Diners)** and **Restaurant Partners**.

Diner Account Workflow
----------------------

* **Target Audience:** Food enthusiasts, diners, travelers, and local explorers.
* **Registration Fields:** First name, last name, age, gender, country of residence, email, and password.
* **Data Model:**
  * Assigned a generated Passport ID (``NM`` + 7-digit code).
  * Date of issuance stamped to current local date.
  * Empty stamps array initialized.
* **Capabilities:**
  * Collect stamps in digital passport.
  * Advance progression ranks from Beginner to Legend.
  * Book table reservations.
  * Place food orders.
  * Like and post community recommendations.
  * Edit profile in ``profile.html``.

Restaurant Partner Workflow
---------------------------

* **Target Audience:** Restaurant owners, chefs, and general managers.
* **Registration Fields:**
  * Restaurant name (``rn``).
  * Unique Restaurant Code (``rc``, e.g., ``NONNA01``).
  * Cuisine classification (``rcu``).
  * Physical address and phone number.
  * Owner / manager contact name.
  * Business email and password.
* **Partner Dashboard (``dash.html``):**
  * View and update restaurant operational details (name, cuisine, address, phone, manager).
  * Inspect incoming customer table reservations in real time, with dates, time slots, party sizes, and customer names.
  * Synchronized persistence via ``nomo_rests``.

Authentication Modal UI
-----------------------

The dialog (``#ad``) uses the native HTML5 ``<dialog>`` element with polyfilled and standards-based ``showModal()`` calls. 
* **Role Switcher Chips:** Toggle between **DINERS** and **RESTAURANT PARTNERS**.
* **Mode Switcher Chips:** Toggle between **LOG IN** and **CREATE ACCOUNT**.
* **Form Validation:** Validates email formatting, minimum password length (6+ characters), required fields, and duplicate registration checks before executing cryptographic hashing.
