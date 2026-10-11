.. _technical_data_models:

Data Models & Schemas
=====================

This document details the JSON entity structures used across Nomo's in-memory and local storage engines.

Customer User Entity (``nomo_users``)
-------------------------------------

.. code-block:: typescript

   interface User {
     fn: string;          // First name (e.g., "Test")
     ln: string;          // Last name (e.g., "Explorer")
     ag: number;          // Age in years (e.g., 28)
     gn: string;          // Gender selection ("Female" | "Male" | "Non-binary" | "Prefer not to say")
     co: string;          // Country of residence (e.g., "United States")
     email: string;       // Unique login email (e.g., "explorer@example.com")
     h: string;           // SHA-256 password hash (64 hex characters)
     st: StampRecord[];   // Array of collected stamps
     no: string;          // Unique passport code (e.g., "NM4819203")
     iss: string;         // Issuance date formatted string (e.g., "10/11/2026")
   }

   interface StampRecord {
     id: number;          // Target restaurant ID (0 to 49)
     n: string;           // Restaurant name (e.g., "Nonna Fornace")
     e: string;           // Associated emoji icon (e.g., "🍕")
     d: string;           // Formatted date string (e.g., "10/11/2026")
     ts: number;          // Unix epoch timestamp in milliseconds
   }

Restaurant Partner Entity (``nomo_rests``)
------------------------------------------

.. code-block:: typescript

   interface RestaurantPartner {
     code: string;        // Uppercase unique partner code (e.g., "NONNA01")
     n: string;           // Full restaurant trade name (e.g., "Nonna Fornace")
     cu: string;          // Cuisine classification (e.g., "Italian")
     ad: string;          // Street address
     ph: string;          // Contact phone number
     ow: string;          // Name of owner or general manager
     email: string;       // Business communication email
     h: string;           // SHA-256 password hash
   }

Table Reservation Entity (``nomo_res``)
---------------------------------------

.. code-block:: typescript

   interface Reservation {
     id: number;          // Unique timestamp ID
     rn: string;          // Reserved restaurant name
     user: string;        // Customer email address
     name: string;        // Customer full name (first + last)
     date: string;        // Formatted booking date (e.g., "Sun, Oct 11")
     t: string;           // Time slot string (e.g., "7:00 PM")
     sz: number;          // Party size (1 to 8 guests)
   }

Shopping Cart Entity (``nomo_cart``)
------------------------------------

.. code-block:: typescript

   interface Cart {
     rid: number | null;  // Restaurant ID or null if empty
     items: {
       [dishName: string]: {
         p: number;       // Price in USD per item
         q: number;       // Quantity selected
       };
     };
   }

Community Field Note Entity (``nomo_posts``)
--------------------------------------------

.. code-block:: typescript

   interface Post {
     id: number;          // Timestamp identifier
     u: string;           // Author display name (e.g., "Priya S.")
     r: string;           // Recommended restaurant name
     d: string;           // Specific recommended dish
     t: string;           // Personal tasting note / narrative
     by: string[];        // Array of user emails who liked the post
     b: number;           // Base seed likes count
     re: Reply[];         // Threaded user responses
   }

   interface Reply {
     u: string;           // Responding user's first name
     t: string;           // Reply message text
   }
