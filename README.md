<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

---

# Final Web-Project NestJS Application 🚀


## Features

- **User Management**: CRUD operations for users with email validation.
- **Conversation Handling**: Create, list, and retrieve conversations.
- **Message Operations**: Send and retrieve messages within conversations.

## Prerequisites

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 20.x or higher)
- [Docker](https://www.docker.com/) (for running databases)
- IDE or code editor of your choice

## Getting Started

To get started, follow these steps:

### 1. Clone the repository

```bash
git clone https://github.com/Chuaibe/web-nest.git
cd web-nest
```

### 2. Install dependencies
```bash
npm install
```
or 
```bash
npm clean install
```

### 3. Set up environment variables

Create a `.env` file in the root directory based on `.env.example` and configure your environment variables.

### 4. Start PostgreSQL and Redis

#### For Linux:

```bash
npm run start:postgres:redis:linux
```

#### For Windows:

```bash
npm run start:postgres:redis:windows
```

This command starts PostgreSQL and Redis using Docker Compose based on your `.env` configuration.

### Primsa run
after running the app, open another terminal to push the migration to the database
```bash
npx prisma db push
```
or
```bash
npm prisma db push
```
rerun the app
### 5. Run the application

```bash
npm run start:docker:build
```

This command allow to sets up a multi-service environment for a NestJS web project, incorporating application (app), Redis, and PostgreSQL services with defined ports, volumes, and environment variables. 

### 6. Access the application

Navigate to `http://localhost:3000/grapl-ql` in your browser to access the application.

## Testing

To run end-to-end tests with Jest, use the following command:

```bash
npm run test:e2e
```

## Other Scripts

- **Build**: Compile the application into JavaScript.

  ```bash
  npm run build
  ```

- **Format**: Automatically format all TypeScript files using Prettier.

  ```bash
  npm run format
  ```

- **Prisma**: Access Prisma CLI commands.

  ```bash
  npm run prisma
  ```
