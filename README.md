# ParaBank Test

This project is a Playwright-based test automation framework for the ParaBank web application, implementing the Page Object Model (POM) pattern to create maintainable and reusable test scripts.

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Running Tests](#running-tests)
- [Page Objects](#page-objects)
- [Utilities](#utilities)
- [Data Management](#data-management)
- [Models](#models)

## Overview

This framework automates interactions with the ParaBank application (https://parabank.parasoft.com/), a demo banking application. It enables testing various functionalities including user registration, login, account creation, and account management.

## Project Structure

```
├── config/
│   └── global.config.ts           # Global configuration variables  
├── pages/
│   ├── account-page.ts            # Account overview page interactions
│   ├── base-page.ts               # Base page with common functionality
│   ├── home.page.ts               # Home page interactions
│   ├── login-page.ts              # Login page interactions
│   ├── open-savings-account.page.ts   # Open New Account page interactions
│   └── register-page.ts           # Registration page interactions
├── tests/
│   └── create-savings-account.spec.ts  # Test for creating savings account
├── user-data/
│   ├── accounts.json              # Stored account information
│   └── user.json                  # User credentials and information
├── utils/
│   ├── data-generator.ts          # Generates random test data
│   └── file-manager.ts            # Manages file operations
│   └── acount-manager-utils.ts     # Account data structure and management
├── create-account.ts              # Standalone script to create accounts
├── package.json                   # Project dependencies
└── README.md                      # Project documentation
```

## Setup

1. **Install dependencies:**

```bash
npm install
```

2. **Install Playwright browsers:**

```bash
npx playwright install
```

## Running Tests

### Run all tests:

```bash
npx playwright test
```

### Run a specific test:

```bash
npx playwright test create-savings-account.spec.ts
```

### Run tests with UI mode:

```bash
npx playwright test --ui
```

## Page Objects

This framework follows the Page Object Model (POM) pattern where each page in the application has a corresponding class that encapsulates the page's elements and actions.

### Base Page

The `BasePage` class provides common functionality for all page objects:

```typescript
import { Page } from '@playwright/test';
import { GLOBAL } from '../config/global.config';

export class BasePage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    async navigate() {
        await this.page.goto(GLOBAL.BASE_URL);
    }
}
```

### Page Specific Classes

Each page extends the `BasePage` and implements specific functionality:

- `HomePage`: Handle interactions on the home page
- `LoginPage`: Manage login functionality
- `RegisterPage`: Handle user registration
- `AccountPage`: Interact with the account overview
- `OpenNewAccountPage`: Create new bank accounts

## Utilities

### File Manager

The `FileManager` class handles file operations:

- `saveUserData`: Saves user data to a JSON file
- `loadUserData`: Loads user data from a JSON file
- `ensureUserDataDirectoryExists`: Ensures the user data directory exists

### Data Generator

The `DataGenerator` provides functions to generate random test data:

- `generateRandomUser`: Creates random user data for registration

## Data Management

### User Data

User data is managed through JSON files:

```json
{
  "firstName": "Test35ur4br4p9f",
  "lastName": "User35ur4br4p9f",
  "address": "175 Main St",
  "city": "Anytown",
  "state": "CA",
  "zipCode": 54932,
  "phone": "5556678528",
  "ssn": "700756135",
  "username": "user35ur4br4p9f",
  "password": "password35ur4br4p9f",
  "tag": "User Account"
}
```

### Account Management

The `AccountManager` class provides methods to:

- `saveAccount`: Save account information to a JSON file
- `getAccounts`: Retrieve all accounts
- `getAccountById`: Find a specific account by ID

## Models

### Account Model

The `Account` interface defines the structure for account data:

```typescript
export interface Account {
    id: string;
    type: string;
    balance?: number;
}
```

## Feature: Create Savings Account (On-going)

The framework includes functionality to create a new savings account and store its information:

1. Navigate to ParaBank
2. Log in with stored credentials
3. Navigate to the "Open New Account" page
4. Select "SAVINGS" as the account type
5. Submit the form
6. Capture the new account ID
7. Save the account information

### Example usage:

```typescript
// Using the standalone script
import { createAccount } from './create-account';

createAccount().then(accountId => {
    console.log(`New savings account created: ${accountId}`);
});
```

## Additional Examples

More examples and test scripts will be added as the framework evolves.
