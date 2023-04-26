Radian Assignment - Api/Service
===============================

Design and develop an API in NestJS with endpoints to add new cars and view the list of saved cars as well as a single car by ID.

# Requirements

## Database

The data will be stored in and retrieved from a MongoDB or Postgresql database. (**Bonus points for using an ORM tool like Prisma in your project to access the database**).

Design the Cars collection with the following columns:
- VehicleID
- Make
- Model
- Year
- Color

*Some examples of rows in a MongoDB collection would be:*
```text
{ 1, "Toyota", "Corolla", 2012, "Red" },
{ 2, "Nissan", "Altima", 2015, "White" },
{ 456,   "BMW",  "M5",  2019,  "Black" },
```

## Api/Service
The Api you will create in NestJS can use either HTTP/RESTful endpoints or GraphQL queries and mutations (**Bonus points for implementing the endpoints in GraphQL**)

## Endpoints

The following endpoints should be available in your Api:

### Get list of all cars stored 
**(eg: GET /cars or POST query GetAllCars() if using GraphQL)**

This should return a list of all the cars stored in the database in the following format:
```text
results = [
{ vehicleId: 1, make: "Toyota", model: "Corolla",year: 2012,color: "Red" },

{ vehicleId: 2, make: "Nissan", model: "Altima", year: 2015, color: "White" },

......

]
```

### Fetch list of cars grouped by model 
**(eg: GET /car/model or POST query GetCarsByModel() if using GraphQL)**

This should return a list of all the cars stored in the database in the following format:
```text
results = [

{

    make: "Toyota",

    items: [

      { vehicleId: 1, model: "Corolla",year: 2012,color: "Red" },

      // ...other results for toyota

    ],

},

{

    make: "Nissan",

    items: [

      { vehicleId: 2, model: "Altima",year: 2015,color: "White" },

      // ...other results for toyota

    ],

},

// ... other make items

]
```

### Add a new vehicle object to the database
### Add a list of vehicles to the database


#Author
Marcos Frony <mfrony@gmail.com>

# Installation
```bash
$ npm install
```

## Start the database
**You must have [Docker](https://docs.docker.com/engine/install/) installed.**

From the root of the project, run:
```shell
make db-start
```

## Stop the database
```shell
make db-stop
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
