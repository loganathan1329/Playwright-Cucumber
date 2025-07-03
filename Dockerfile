# Use official Node.js LTS image
FROM node:20
#We start with the official Node.js LTS image (Node.js v20), which includes Node.js and npm preinstalled.
#This gives a stable, production-ready base for running Node-based projects like Playwright.

# Install OS-level Dependencies
RUN apt-get update && \
    apt-get install -y wget gnupg && \
    rm -rf /var/lib/apt/lists/*
#apt-get update: Updates the package list
#apt-get install: Installs essential OS tools like wget and gnupg (required by Playwright to install browsers and certificates)
#rm -rf /var/lib/apt/lists/*: Reduces image size by cleaning up cache
#Playwright needs system dependencies for browser installation and networking.

# Set working directory
WORKDIR /app
#This sets /app as the working directory inside the container where all files will be copied and commands executed.

# Copy package files and install dependencies
COPY package.json package-lock.json* ./
RUN npm install
#Copies the package files to the container.
#npm install installs all project dependencies (e.g., Playwright, Cucumber, TypeScript).
#Why separately? Docker caches layers. If dependencies don't change, this step won't re-run, speeding up builds.

# Install Playwright browsers
RUN npx playwright install --with-deps
#Installs Chromium, Firefox, and WebKit with all OS-level dependencies using Playwright CLI.
#Why? So your test scripts can run against actual browsers inside the container.

# Copy the rest of your project
COPY . .
#Copies the rest of the project files (source code, features, step definitions, config, etc.)
#Why now? Prevents re-running npm install if only source files change.

# Compile TypeScript (if needed)
RUN npx tsc
#Needed because Playwright and Cucumber execute JavaScript at runtime.

# Default command: run tests
CMD ["npm", "run", "test"]
#Defines the default command to execute when the container runs.
#Should match the test command in package.json, typically running Cucumber with ts-node.
#Why? Ensures automated execution when run in CI/CD or locally.
