# Third-Party Libraries

This project, **Nomo**, relies on several open-source third-party libraries and tools. We are grateful to the maintainers and contributors of these projects. 

Below is a list of the major dependencies, their licenses, and links to their project pages.

## Development & Testing Dependencies

| Dependency | Description | License | Link |
| :--- | :--- | :--- | :--- |
| **Playwright** | End-to-end testing framework for web apps | Apache 2.0 | [Playwright GitHub](https://github.com/microsoft/playwright) |
| **Pre-commit** | Framework for managing multi-language pre-commit hooks | MIT | [Pre-commit Web](https://pre-commit.com/) |
| **ESLint** | Pluggable JavaScript linter | MIT | [ESLint Web](https://eslint.org/) |
| **Prettier** | Opinionated code formatter | MIT | [Prettier Web](https://prettier.io/) |

## Core / Production Dependencies

| Dependency | Description | License | Link |
| :--- | :--- | :--- | :--- |
| **Node.js** | JavaScript runtime environment | MIT | [Node.js Web](https://nodejs.org/) |
| **Express** | Fast, unopinionated, minimalist web framework | MIT | [ExpressJS Web](https://expressjs.com/) |


---

### Automated License Checking (Tip)
To automatically generate a comprehensive list of all your NPM dependencies and their licenses, you can run the following command in your terminal:

```bash
npx license-checker --summary
