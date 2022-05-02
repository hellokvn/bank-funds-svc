## Description

This repository is part of my article on Medium:  
[Microservices with CQRS and Event Sourcing in TypeScript with NestJS](https://medium.com/gitconnected/microservices-with-cqrs-in-typescript-and-nestjs-5a8af0a56c3a)

## Repositories

- https://github.com/hellokvn/bank-account-svc - Bank Account Microservice
- https://github.com/hellokvn/bank-funds-svc - Bank Funds Microservice (you are here)
- https://github.com/hellokvn/bank-api-gateway - API Gateway
- https://github.com/hellokvn/nestjs-event-sourcing - Event Sourcing as NestJS Module
- https://github.com/hellokvn/bank-shared-proto - Shared Proto Repository

# Prerequisites

This application requires running docker services from https://github.com/hellokvn/bank-account-svc

## Installation

```bash
$ npm install
$ npm run proto
```

## Running with Docker

```bash
$ docker-compose up -d
```

## Running on your local machine

```bash
$ npm run start:dev command
$ npm run start:dev query
```

## Transfer Funds Flowchart

![flowchart](https://raw.githubusercontent.com/hellokvn/bank-funds-svc/master/.github/static/flowchart-transfer-funds.jpg)

## Author

- [Kevin Vogel](https://medium.com/@hellokevinvogel)
