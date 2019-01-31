# Marketplace sample
=====================================
Sample project of a bit capital client. You should go through this code if you are interested in developing using bitcapital sdk.

This project is a rough sample of a marketplace api. 

## Development Steps

1) Setup local infrastructure - DONE
2) Project setup - DONE
3) Design database schema - DONE
4) Develop all models - DONE
5) User SignUp - DONE
6) Get user information - DONE
7) KYC documents - DONE
8) Crypto transaction extract - DONE
9) Deposit asset - DONE
10) Withdraw asset - DONE
11) Create product - DONE
12) Create sell offer - DONE
13) User buy product - DONE
14) User Balance - DONE
15) Develop unit tests
16) Develop integration tests
17) Add transactional to the buy product method
18) Add logs
19) Finish documentation

==================================

## Getting started

Install dependencies using Yarn.

```bash
yarn install
```

### Running the local development server

Install locally Postgres and create a database with a custom name and change the api/config/bitcapital.config.ts archive with your data.

Start the server using Yarn for development, with live rebuilding:

```bash
yarn run watch
```

Start the jobs in development mode.

```bash
yarn run workers --development
```

### Running the development console

To connect interactively with the server, use the built-in REPL Console.

```bash
yarn run console
```

### Running the Unit Tests

After a initial successful initialization for the database seed creation, you can run the unit tests:

```bash
yarn test
```

### Running in production

To start the production server, build the typescript than start the project.

```bash
yarn start
```

==================================
