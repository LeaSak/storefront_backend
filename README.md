# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to build a basic backend store api.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Project Setup

### 1. Enviroment variables
Create a plain text file and call it '.env'. Add environment variables like the ones created in the .envExample file. This needs to be in the project's root directory.
If the `ENV` variable is set to test, the `store_test` database will be used instead of the `store` database later on. All tests are run on the test database.

### 2. Databases
Make sure you have installed postgres and can use it in your terminal.
 - Create your test user using the value from your environment variable: Run `sudo -u postgres createuser -P -d <testusername>`. Assign a password.
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
Please see routes listed in `REQUIUREMENTS.md`  

