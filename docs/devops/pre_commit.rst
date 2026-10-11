.. _devops_pre_commit:

Git Hooks & Pre-Commit Automation
=================================

Nomo utilizes `pre-commit <https://pre-commit.com/>`_ to enforce code hygiene, format standards, prevent secret leakage, and validate commit conventions locally before commits reach the remote repository.

Configuration Breakdown (``.pre-commit-config.yaml``)
------------------------------------------------------

1. General File Hygiene (``pre-commit/pre-commit-hooks`` v4.6.0)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
* ``trailing-whitespace``: Trims extraneous trailing whitespace characters.
* ``end-of-file-fixer``: Ensures files end with a newline.
* ``check-yaml``: Validates YAML syntax across workflow and config files.
* ``check-json``: Validates JSON syntax across configs and manifests.
* ``check-toml``: Validates TOML formatting.
* ``check-merge-conflict``: Catches unmerged git conflict markers (``<<<<<<<``).
* ``check-added-large-files``: Rejects binary files exceeding 1000 KB.
* ``detect-private-key``: Prevents accidental commits of private key files.
* ``no-commit-to-branch``: Blocks direct accidental commits to ``main``.

2. Secret & Credential Scanning (``gitleaks`` v8.18.4)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Scans all staged additions for API keys, bearer tokens, passwords, and private credentials.

3. Formatting (``mirrors-prettier`` v3.3.3)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Automatically formats JavaScript, JSX, TypeScript, TSX, JSON, YAML, Markdown, and CSS files to maintain consistent styling.

4. Linting (``local`` ESLint)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Runs ``npx eslint --fix`` across staged script files.

5. Conventional Commits (``local`` Commitlint)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Enforces Conventional Commit conventions on the ``commit-msg`` hook stage (e.g., ``feat:``, ``fix:``, ``docs:``, ``chore:``).

Installation & Manual Execution
-------------------------------

.. code-block:: bash

   # Install pre-commit via pip
   pip install pre-commit

   # Install the git commit hook
   pre-commit install

   # Install the commit-msg hook
   pre-commit install --hook-type commit-msg

   # Run all checks manually across all files
   pre-commit run --all-files
