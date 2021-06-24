# Inventory
Item inventory management dashboard.

# Table of Contents
- [Overview](#overview)
- [Development](#development)
- [Configuration](#configuration)

# Overview
Web application to track items and their location.

# Development
The server and frontend are written in Typescript, dependencies are managed with Yarn, and the server is run with NodeJS. Data is stored in Postgres.

Install dependencies:

```
yarn install
```

Start Postgres. The `docker-compose.yml` file provides a pre-setup Postgres server, run it with:

```
docker-compose up -d
```

Set [configuration environment variables](#configuration).

If you are using the docker Postgres server you must set the host to `postgres`, and the username, password, and database all to `devinventory`. The `docker-compose.dev.yml` file provides a pre-setup bash shell with these environment variables set. Run it with:

```
./scripts/docker-compose up -d --build
./scripts/docker-compose exec inventorydev bash
```

Start development servers which rebuild and reload the server and frontend with:

```
yarn dev
```

This runs `yarn dev-server` and `yarn dev-frontend` in parallel.

# Configuration
The server is configured via environment variables, all prefixed with `INVENTORY_APP_`.

- `INVENTORY_APP_API_HTTP_PORT` (Number): Port on which HTTP API will listen
- `INVENTORY_APP_POSTGRES_HOST` (String): Host of Postgres database server
- `INVENTORY_APP_POSTGRES_PORT` (Number): Port of Postgres database server
- `INVENTORY_APP_POSTGRES_USERNAME` (String): Postgres database server login username
- `INVENTORY_APP_POSTGRES_PASSWORD` (String): Postgres database server login password
- `INVENTORY_APP_POSTGRES_DB` (String): Name of the database within Postgres to store data
