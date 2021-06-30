# Inventory Server
Inventory app server.

# Table Of Contents
- [Overview](#overview)
- [Development](#development)
- [Configuration](#configuration)

# Overview
HTTP REST API written in Typescript, run with NodeJS.

# Development
Yarn is used to manage dependencies.

Install dependencies:

```
yarn install
```

Start a development server, this will re-build and reload the code when it changes:

```
yarn dev
```

Build and run for production:

```
yarn build
yarn start
```

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
