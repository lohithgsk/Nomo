.. _getting_started_installation:

Installation & Setup
====================

This guide details how to clone, install, configure, and execute the Nomo project locally or within Docker containers.

Prerequisites
-------------

Ensure your system has the following tools installed:

.. list-table::
   :widths: 25 35 40
   :header-rows: 1

   * - Requirement
     - Minimum Version
     - Purpose
   * - **Node.js**
     - v18.0.0 or higher (v20 LTS recommended)
     - Runtime environment for tooling, test servers, and Playwright
   * - **npm**
     - v9.0.0 or higher
     - Node package manager
   * - **Python**
     - v3.10.0 or higher
     - Required for building Sphinx documentation
   * - **Docker & Docker Compose**
     - Optional / Recommended
     - Isolated container deployment
   * - **Git**
     - Any recent version
     - Source code control

Local Development Setup
-----------------------

1. Clone Repository
~~~~~~~~~~~~~~~~~~~

Clone the repository and enter the workspace directory:

.. code-block:: bash

   git clone https://github.com/lohithgsk/Nomo.git
   cd Nomo

2. Install Node Dependencies
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Install all package dependencies defined in ``package.json``:

.. code-block:: bash

   npm install

This installs:
* ``@playwright/test``: End-to-end browser test runner.
* ``http-server``: Zero-configuration command-line HTTP server.
* ``license-checker``: License audit analysis tool.

3. Install Playwright Browsers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Install the Chromium browser binaries required for testing and Chrome DevTools coverage:

.. code-block:: bash

   npx playwright install chromium

4. Launch the Web Application
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Launch the development server:

.. code-block:: bash

   npm start

Or equivalently:

.. code-block:: bash

   npm run dev

The web client is hosted at:

.. code-block:: text

   http://127.0.0.1:3000

Sphinx Documentation Setup
--------------------------

To build and view this documentation locally:

1. Install Python Documentation Requirements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

   pip install -r docs/requirements.txt

2. Compile the HTML Documentation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

From the repository root:

.. code-block:: bash

   npm run docs

Or using Sphinx directly:

.. code-block:: bash

   sphinx-build -b html docs docs/_build/html

Or using the provided Makefile (Linux / macOS):

.. code-block:: bash

   cd docs
   make html

Or on Windows PowerShell / Command Prompt:

.. code-block:: bat

   cd docs
   .\make.bat html

3. Serve the Built Documentation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

   npm run docs:serve

The compiled documentation will be available at ``http://127.0.0.1:8085``.

Docker Deployment
-----------------

To run the application inside an isolated Nginx container:

1. Build and Start Container
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

   docker-compose up --build

The application will be accessible at:

.. code-block:: text

   http://localhost:8080

2. Stop the Container
~~~~~~~~~~~~~~~~~~~~~

.. code-block:: bash

   docker-compose down

Container Configuration Reference
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

* **Dockerfile**: Based on ``nginx:alpine``, copies ``apps/web`` directly into ``/usr/share/nginx/html`` and exposes port ``80``.
* **docker-compose.yml**: Maps host port ``8080`` to container port ``80`` and mounts ``./apps/web`` as a read-only volume (``ro``) for instant live reloading during development without requiring container rebuilds.
