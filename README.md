# API Starter Template


[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)


## Introduction

This project contains all the necessary things to get started with writing an API in NodeJS. It includes Inversify, Inversify-Express-Utils for dependency injection, sequelize for the database ORM, and jest for testing.

The idea of this project is to bring a batteries included project that is not too opinionated, yet brings in libraries that allow for the creation of API using NodeJS

The initial template shows an example with a basic CRUD application using sequelize-typecript. Since the structure of the project is split up into features, you can delete the **todo** folder inside api and remove the *todoModule* from inversify.config.ts, so it is no longer part of the application.

The repository tries to follow the [best practices](https://github.com/goldbergyoni/nodebestpractices)for structuring a repository. 


## What this repository does not have

* Authentication: The passport and passport-strategy should be left up to the user
  
* Session Management: This is up to the user, even though connect-redis is installed

* Logger: Besides logging of the API results, logging is up to the user


## Getting Started


> git clone https://github.com/josecolella/node-api-starter-template.git

> cd node-api-starter-template

> npm install

- Create a .env file with the following properties, but remember to change it to the appropriate values.

```
PORT=8080
APP_NAME=someapplicationame
AUTHOR=author
COMMIT_SHA=commit
DB_HOST="127.0.0.1"
DB_USERNAME=someusername
DB_PASSWORD=somepassword
DB_NAME=somedatabasename
DB_DIALECT=somedatabasedialect
```

- Builds and watches for any change in the application
> npm run watch

- Executes the application in development mode
> npm run start:dev

* For testing use

> npm test

The repository contains an example with two controllers; TodoController and HealthController with corresponding tests to show how to use jest, jest-express to test [inversify-express-utils](https://github.com/inversify/inversify-express-utils)


## Contact

If you have any issues, please contact [José Miguel Colella](jose.colella@dynatrace.com)


## License

This project is licensed under the Apache v2.0 License - see the [LICENSE](./LICENSE) file for details.

