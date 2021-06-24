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

If you are using the docker Postgres server you must set the host to `postgres`. The `docker-compose.dev.yml` file provides a pre-setup bash shell with these environment variables set. Run it with:

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

- API
  - HTTP Port (`INVENTORY_APP_API_HTTP_PORT`, Number, Default `8000`): Port on which HTTP API will listen
- Postgres
  - Host (`INVENTORY_APP_POSTGRES_HOST`, String, Default `localhost`): Host of Postgres database server
  - Port (`INVENTORY_APP_POSTGRES_PORT`, Number, Default `5432`): Port of Postgres database server
  - Username (`INVENTORY_APP_POSTGRES_USERNAME`, String, Default `devinventory`): Postgres database server login username
  - Password (`INVENTORY_APP_POSTGRES_PASSWORD`, String, Default `devinventory`): Postgres database server login password
  - Database (`INVENTORY_APP_POSTGRES_DB`, String, Default `devinventory`): Name of the database within Postgres to store data
