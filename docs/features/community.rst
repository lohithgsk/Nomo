.. _features_community:

Community Food Feed ("Field Notes")
===================================

The community page (``apps/web/community.html``) provides a public feed where food explorers publish concise, personal dining recommendations called **Field Notes**.

Composition & Publishing Workflow
---------------------------------

Authenticated diners can share dish discoveries directly from the composer form:
* **The Place:** Dropdown populated from the 50 curated restaurants in ``R``.
* **The Dish:** Freeform text input specifying the ordered dish.
* **The Reason to Go:** Text area for tasting notes, flavor impressions, and pairing recommendations.
* **Publishing:** Submitting the form prepends a new post object to ``nomo_posts``, immediately rendering at the top of the feed with an interactive toast.

Field Note Anatomy
------------------

Each community post renders:
* **Curated Dish Photography:** High-resolution image dynamically resolved by ``dishPhoto()``.
* **Field Note Number:** Serialized marker (e.g., ``FIELD NOTE · 01``).
* **Author Monogram Badge:** Diner initials and full name (e.g., ``Priya S.``).
* **Dish & Restaurant Heading:** Explicit title and venue affiliation.
* **Editorial Blockquote:** The author's personal review quote.
* **Engagement Actions:**

  * **Like Counter (♥):** Interactive toggle that increments like counts and persists user likes in ``p.by``. Requires customer login.
  * **Reply (↗):** Launches an interactive response prompt, appending threaded author replies beneath the post.

Guest State & Onboarding
------------------------

Unauthenticated visitors see a welcoming call-to-action inviting them to sign in. Attempting to like a post or post a note smoothly opens the authentication modal without losing page context.
