.. _community_contributing:

Contributing Guide
==================

We welcome contributions to Nomo! This guide covers our branching strategy, commit conventions, local development workflow, and pull request guidelines.

Branching Strategy
------------------

* ``main``: The primary production-ready branch. Direct pushes to ``main`` are protected and prohibited by pre-commit hooks.
* Feature branches: Branch off ``main`` using descriptive prefixes:
  * ``feature/<feature-name>`` (e.g., ``feature/explore-filters``)
  * ``fix/<bug-description>`` (e.g., ``fix/cart-tax-rounding``)
  * ``docs/<documentation-topic>`` (e.g., ``docs/sphinx-setup``)
  * ``chore/<maintenance-task>`` (e.g., ``chore/update-dependencies``)

Commit Conventions (Conventional Commits)
-----------------------------------------

Commit messages must adhere to the `Conventional Commits <https://www.conventionalcommits.org/>`_ standard, enforced via ``commitlint``:

.. code-block:: text

   <type>(<optional scope>): <description>

   [optional body]

   [optional footer(s)]

Supported Types:
* ``feat``: A new feature for the user or platform.
* ``fix``: A bug fix.
* ``docs``: Documentation changes only.
* ``style``: Formatting, missing semi-colons, whitespace fixes (no code logic changes).
* ``refactor``: Refactoring production code without altering behavior.
* ``test``: Adding or modifying test suites.
* ``chore``: Routine maintenance, CI updates, configuration tweaks.

Pull Request (PR) Process
-------------------------

1. **Keep PRs Focused:** Aim for single-concern pull requests that solve one issue or introduce one cohesive capability.
2. **Ensure Tests Pass:** Run the test suite locally prior to pushing:
   
   .. code-block:: bash
   
      npm test
   
3. **Run Pre-Commit Hooks:** Verify clean formatting and secret audits:
   
   .. code-block:: bash
   
      pre-commit run --all-files
   
4. **Fill PR Template:** Complete all sections in ``.github/PULL_REQUEST_TEMPLATE.md``:
   * Description of changes.
   * Linked issues (e.g., ``Closes #12``).
   * Visual verification screenshots / test evidence.
   * Checklist confirmation.
5. **Code Review & CI Approval:** All automated CI checks must pass before merging.
