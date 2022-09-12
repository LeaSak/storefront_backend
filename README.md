# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to build a basic backend store api.

## Required Technologies
The application uses the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Project Setup
This project has been developed locally. You need to take a few steps to get it running.

### 1. Environment variables
Create a plain text file and call it '.env'. Add environment variables like the ones created in the .envExample file. This needs to be in the project's root directory. If the `ENV` variable is set to test, the test environment variables will be used. See the `database.config.json`. All tests are run on the test database. Therefore a test database will need to be setup for tests to run.

### 2. Databases
 - Make sure you have installed postgres and can use it in your terminal. You also need access to the terminal wuth sudo privileges and postgres user.
 - Create your test user using the value from your environment variable: Run `sudo -u postgres createuser -P -d -e <testusername>`. Assign a password. You  will need to enter this twice.
 - Build your databases for dev and/or test using the values from your environment variables: Run `sudo -u postgres createdb -O <testusername> <testdatabasename>`
 - Create tables `db-migrate up`

### 3. Install project dependencies
 - Run `npm install`.

### 4. Scripts
 - Unit Tests `npm run test` This runs all unit tests on a test database named 'store_test'. Make sure your database and user is created beforehand and matches the environment variables.
 - Build project and run a server `npm run watch`
 - Prettier `npm run prettier`
 - Linter `npm run lint`
 - Build tables `db-migrate up`
 - Drop tables `db-migrate down`

## API Endpoints
Please see routes listed in `REQUIREMENTS.md`  

