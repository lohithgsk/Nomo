# Contributing to Nomo

Thank you for your interest in contributing to Nomo!

For the full, detailed guide, please see our [Sphinx Contribution Documentation](docs/community/contributing.rst) or build the documentation with `npm run docs`.

---

## Quick Reference

### 1. Branching Strategy
* `main`: Protected production branch.
* Branches must use descriptive prefixes:
  * `feature/<feature-name>`
  * `fix/<bug-description>`
  * `docs/<doc-topic>`
  * `chore/<task>`

### 2. Commit Message Conventions
We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:
* `feat`: A new feature
* `fix`: A bug fix
* `docs`: Documentation changes
* `style`: Code style / formatting
* `refactor`: Refactoring without behavioral change
* `test`: Adding or updating tests
* `chore`: Build or tooling maintenance

### 3. Pre-Commit Hooks
Install and run pre-commit hooks before committing:
```bash
pip install pre-commit
pre-commit install
pre-commit install --hook-type commit-msg
pre-commit run --all-files
```

### 4. Running Tests
Ensure all Playwright tests pass:
```bash
npm test
```

### 5. Building Documentation
Build Sphinx HTML documentation:
```bash
npm run docs
```
Serve the built documentation:
```bash
npm run docs:serve
```

---

## Code of Conduct
All contributors are expected to uphold our [Code of Conduct](CODE_OF_CONDUCT.md). Please report issues or violations to `rmahind@ncsu.edu`.
