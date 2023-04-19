# Booking

Booking is a saas platform for boutiques, studios, and gyms which allows business owners to manage
their courses, classes, members, memberships etc...

## Features

- Create classes 
- Book for a class

## API

Run the project and visit: http://localhost:3000/api-docs/

## Tech

This project uses a number of open source projects to work properly:

- [Node.js (https://nodejs.org/en/)] - Evented I/O for the backend.
- [Typescript (https://www.typescriptlang.org/)] - JavaScript with syntax for types.
- [Express (http://expressjs.com/)] - Fast node.js network app framework [@tjholowaychuk]
- [MongoDB (https://www.mongodb.com/)] - Document database with the scalability and flexibility that you want with the querying and indexing that you need.
- [Jest (https://jestjs.io/)] - Testing framework designed to ensure correctness of any JavaScript codebase.
- [Prettier (https://prettier.io/)] - Opinionated code formatter.
- [Eslint (https://eslint.org/)] - A pluggable and configurable linter tool for identifying and reporting on patterns in JavaScript. Maintain your code quality with ease.
- [Docker (https://www.docker.com/)] - Docker is an open platform for developing, shipping, and running applications.
- [Swagger (https://swagger.io/)] - Swagger allows you to describe the structure of your APIs so that machines can read them.

## Installation

This project requires [Node.js](https://nodejs.org/) v14+ to run.

Install the dependencies and devDependencies and start the server.

```sh
npm install
```

## Development

Open your favorite Terminal and run these commands.

First step: Check the configuration file

```sh
1. In the root project, rename the file '.env.example' to '.env'
2. In the '.env' file, make sure your connection to MongoDB is correct, like this: MONGOOSE_CONNECTION_STRING=mongodb://localhost:27017/documents
```

Second step: Run the project

```sh
# server with hot reload at localhost:3000
$ npm run dev
```

```sh
# run tests
$ npm run test
```

## Building for source (Production)

For production release:

```sh
# build for production and launch server
$ npm run build
$ npm run start
```

## Docker

This project is very easy to run in a Docker container.

By default, the Docker will expose port 3000, so change this within the
Dockerfile if necessary.

```sh
docker-compose up
```

## Improvements

- Divide the project into micro services
- Create automation pipelines for test validation and deploy via gitlab (gitlab-ci.yml)
- Detailing of unit tests by api return schema

## License

MIT

**Free Software, Hell Yeah!**
