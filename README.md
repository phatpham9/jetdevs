# jetdevs

## Description

NodeJS Blog API Service

### Database design

#### Entity relationship diagram

![Entity relationship diagram](./docs/db-design-erd.png)

#### Database schema

![Database schema](./docs/db-design-schema.png)

### API design

![API design](./docs/api-design.png)

### Techstack

- [TypeScript](https://www.typescriptlang.org/)
- [NestJS](https://nestjs.com/)
- [Swagger](https://swagger.io/)
- [Jest](https://jestjs.io/)
- [Prisma](https://www.prisma.io/)
- [MySQL](https://www.mysql.com/)
- [GitHub Actions](https://docs.github.com/en/actions)

## Installation

```bash
$ npm install
```

## Running the app

Before you can start the app, you need to create a `.env` file in the root directory of the project and add the following environment variables:

```
DATABASE_URL="mysql://user:password@localhost:3306/jetdevs"
```

```bash
# database migration
$ npm run migrate

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

The API service will be available at [http://localhost:3000](http://localhost:3000)

And the API Specs will be available at [http://localhost:3000/api](http://localhost:3000/api)

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

[MIT licensed](LICENSE)

## Author

[Phat Pham](https://onroads.xyz)
