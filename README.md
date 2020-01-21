<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest

# <center> Mi Chero </center> 

---
  
## Description

A simple API for news searching on the New York Times API and The Guardian API!. You can also save articles by providing an URL. 

## Installation

```bash
$ npm install
```

## Docker installation

If you wish to use the application via docker compose , please clone the "docker" branch  and run the following command.

```bash 
$ docker-compose up 
```
## Email password reset 
For testing purposes provide an email in your .env file, you should receive an email with a link for resetting your password. Try this link on a application like Postman using the PATCH method, for more info on this try out the Swagger documentation. 

## Documentation
For reading the documentation , start up the application and enter the following : http://localhost:3000/api

## Database
### 1- Create the database "showbiz" on Postgresql

### 2- Restore the dump included in the scripts directory

```bash
  $psql showbiz < scripts/DB_BACKUP
```
## Enviroment variables

### A sample .env.example file is included on the root directory; if you wish to provide your own .env file you should include all the required variables in the sample .env file.

## Running the app

```bash

$ npm run start:dev

```
## Built With

- Node.js
- Typescript
- NestJS
- Postgresql
- Prettier and Eslint where used, both for linting a formatting the code.

### API Usage: 
You can use the following admin user for testing:  username: admin password: 1234

