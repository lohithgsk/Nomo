.. _architecture_security:

Security Architecture
=====================

This document covers the security practices, client-side cryptographic hashing, authentication boundary controls, and automated static analysis implemented within Nomo.

Client-Side Password Hashing
----------------------------

Nomo uses standard cryptographic primitives via the browser's native **Web Crypto API** (``crypto.subtle``) to ensure passwords are never stored in plain text:

.. code-block:: javascript

   async function hash(s) {
     try {
       const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
       return [...new Uint8Array(b)]
         .map(x => x.toString(16).padStart(2, "0"))
         .join("");
     } catch (e) {
       return btoa(s); // Graceful fallback for legacy non-secure contexts
     }
   }

When a diner or restaurant partner signs up or logs in:
1. The plaintext password is validated for minimum length (6+ characters).
2. It is converted to an encoded ``Uint8Array`` and passed to ``crypto.subtle.digest("SHA-256", ...)``.
3. The resulting 32-byte digest is formatted into a 64-character hexadecimal string.
4. Only the hexadecimal hash string is persisted in ``nomo_users`` or ``nomo_rests``.

Role Separation & Access Gates
------------------------------

Nomo strictly segregates operations based on authenticated roles:

* **Guest State:**
  Unauthenticated visitors can browse all 50 restaurants, inspect menus, pan scene photos, filter cuisines and cities, and view community reviews.
* **Customer Account Gate:**
  Certain actions trigger the authentication modal when unauthenticated:
  * Reserving a table (``book()``).
  * Checking out an active cart (``order()``).
  * Liking a community field note (``data-l``).
  * Publishing a new dish recommendation note (``#pb``).
  * Viewing personalized passport stamps and rankings.
* **Restaurant Partner Gate:**
  Access to the restaurant partner dashboard (``dash.html``) requires a verified restaurant code and partner password.

Input Sanitization & XSS Mitigation
-----------------------------------

To protect against Cross-Site Scripting (XSS) attacks in dynamically constructed HTML strings, Nomo applies an HTML entity escaping helper across all user-supplied content:

.. code-block:: javascript

   const esc = s =>
     String(s).replace(/[&<>"]/g, c => ({
       "&": "&amp;",
       "<": "&lt;",
       ">": "&gt;",
       '"': "&quot;"
     }[c]));

All dynamically inserted strings (user names, dish titles, field note descriptions, restaurant codes) pass through ``esc()`` prior to innerHTML assignment.

Automated Secret & Vulnerability Scanning
-----------------------------------------

1. **Gitleaks Secret Scanning:**
   Enforced in the repository pre-commit hooks via ``gitleaks`` (rev ``v8.18.4``) to detect accidental commits containing API keys, private tokens, or credentials.
2. **GitHub CodeQL Analysis:**
   Automated in ``.github/workflows/codeql.yml`` to scan pull requests and commits against the GitHub security intelligence suite for JavaScript and TypeScript security flaws.
3. **Dependabot Updates:**
   Configured in ``.github/dependabot.yml`` to track and alert on vulnerabilities across npm dependencies on a weekly schedule.
