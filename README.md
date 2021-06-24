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
  - HTTP Port (Number): Port on which HTTP API will listen
    - Env var: `INVENTORY_APP_API_HTTP_PORT`
	- Default: `8000`
- Postgres
  - Host (String): Host of Postgres database server
    - Env var: `INVENTORY_APP_POSTGRES_HOST`
	- Default: `localhost`
  - Port (Number): Port of Postgres database server
    - Env var: `INVENTORY_APP_POSTGRES_PORT`
	- Default: `5432`
  - Username (String): Postgres database server login username
    - Env var: `INVENTORY_APP_POSTGRES_USERNAME`
	- Default: `devinventory`
  - Password (String): Postgres database server login password
    - Env var: `INVENTORY_APP_POSTGRES_PASSWORD`
	- Default: `devinventory`
  - Database (String): Name of the database within Postgres to store data
    - Env var: `INVENTORY_APP_POSTGRES_DB`
	- Default: `devinventory`
