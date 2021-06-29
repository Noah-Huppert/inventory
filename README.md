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

## Docker Development
A development environment is provided, this starts a Postgres server, sets all configuration environment variables, and opens a Bash shell in the repository root.

To start this environment and open the Bash shell run:

```
./scripts/container-dev.sh
```

Then follow instructions in [Development Tasks](#development-tasks), and run commands inside this new shell.

> _Behind the scenes_:  
> This script starts the containers specified in `docker-compose.yml` and `docker-compose.dev.yml` files. Then executes a Bash process in the `inventorydev` container. This is equivalent to:
> 
> ```
> ./scripts/docker-compose.sh up -d --build
> ./scripts/docker-compose.sh exec inventorydev bash
> ```

## Self Setup Development
A Postgres container and an environment which has NodeJS and NPM installed is required.

Set [configuration environment variables](#configuration) with details on where the Postgres server is running, as well as any other relevant values.

Once configuration has been set follow instructions in [Development Tasks](#development-tasks) section.

## Development Tasks
First install dependencies:

```
yarn install
```

Then start development servers which rebuild and reload the server and frontend with:

```
yarn dev
```

> _Behind the scenes_:  
> This runs `yarn dev-server` and `yarn dev-frontend` in parallel.

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
