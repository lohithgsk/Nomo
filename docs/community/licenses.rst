.. _community_licenses:

Licenses & Third-Party Dependencies
===================================

Project License
---------------

Nomo is licensed under the **MIT License**:

.. code-block:: text

   MIT License

   Copyright (c) 2026 Nomo Project

   Permission is hereby granted, free of charge, to any person obtaining a copy
   of this software and associated documentation files (the "Software"), to deal
   in the Software without restriction, including without limitation the rights
   to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   copies of the Software, and to permit persons to whom the Software is
   furnished to do so, subject to the following conditions:

   The above copyright notice and this permission notice shall be included in all
   copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   SOFTWARE.

Third-Party Dependencies Inventory
----------------------------------

Nomo relies on verified open-source libraries and frameworks. Full dependency inventories and license notices are tracked in ``THIRD_PARTY_LIBRARIES.md`` and ``licenses.csv``:

.. list-table::
   :widths: 25 35 20 20
   :header-rows: 1

   * - Dependency
     - Description
     - License
     - Project Link
   * - **Playwright**
     - Cross-browser automation & testing suite
     - Apache-2.0
     - `Playwright GitHub <https://github.com/microsoft/playwright>`_
   * - **Pre-commit**
     - Multi-language pre-commit hooks framework
     - MIT
     - `Pre-commit Web <https://pre-commit.com/>`_
   * - **Prettier**
     - Opinionated code formatting engine
     - MIT
     - `Prettier Web <https://prettier.io/>`_
   * - **ESLint**
     - Pluggable JavaScript linter
     - MIT
     - `ESLint Web <https://eslint.org/>`_
   * - **http-server**
     - Zero-configuration static HTTP server
     - MIT
     - `http-server npm <https://www.npmjs.com/package/http-server>`_
   * - **license-checker**
     - Automated license extraction & auditing tool
     - BSD-3-Clause
     - `license-checker npm <https://www.npmjs.com/package/license-checker>`_

Automated License Auditing
--------------------------

To audit all production and development dependencies across the repository:

.. code-block:: bash

   npx license-checker --summary
