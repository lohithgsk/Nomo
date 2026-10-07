# Installation Guide

Follow these steps to set up and run the project locally or via Docker.

## Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (bundled with Node.js)
- [Docker](https://www.docker.com/) and Docker Compose (optional, for containerized deployment)
- Git

## Local Development Setup

### 1. Clone the Repository

Clone the repository and navigate into the project directory:

```bash
git clone https://github.com/stardust-skye/nomo.git
cd nomo
```

### 2. Install Project Dependencies

Install all required Node.js dependencies:

```bash
npm install
```

### 3. Install Testing Dependencies

The project uses Playwright for UI and smoke testing. Install the required browsers:

```bash
npx playwright install
```

### 4. Start the Application

Start the application using:

```bash
npm start
```

> **Note:** If your `package.json` uses a different script, such as `npm run dev`, use that command instead.

The application should now be available at the local address configured by the project.

## Docker Deployment

To run the application in an isolated container environment using the provided `Dockerfile` and `docker-compose.yml`:

### 1. Build and Start the Container

Build the Docker image and start the application:

```bash
docker-compose up --build
```

The application will be accessible at the port specified in your `docker-compose.yml`.

### 2. Stop the Container

To stop the running containers:

```bash
docker-compose down
```

## Running Tests

The project includes automated Playwright tests for UI and smoke testing.

The test files include:

- `tests/smoke.spec.js`
- `tests/ui.spec.js`

Run all Playwright tests using:

```bash
npx playwright test
```

Playwright will display the test results in the terminal after execution.

## Troubleshooting

### Playwright Browsers Not Installed

If Playwright reports that a required browser is missing, install the Playwright browsers again:

```bash
npx playwright install
```

### Application Does Not Start

If `npm start` does not work, check the `scripts` section of `package.json` for the correct start command. For example:

```bash
npm run dev
```

### Docker Issues

If the Docker container does not start correctly, rebuild the containers:

```bash
docker-compose down
docker-compose up --build
```
