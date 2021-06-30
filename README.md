# Inventory
Item inventory management dashboard.

# Table of Contents
- [Overview](#overview)
- [Development](#development)

# Overview
Web application to track items and their location.

# Development
The application is written in Typescript, Yarn is used to manage dependencies.

The server (located in [`./server/`](./server/)) is run with NodeJS and stores data in Postgres.

The frontend (located in [`./frontend/`](./frontend/)) uses React.

First setup a [development environment](#development-environment). Then install dependencies for the frontend and server:

```
./scripts/install.sh
```

Then run the frontend and server development setups. This will auto-build and reload code when it changes.

```
./scripts/dev.sh
```

See the README's in the server and frontend directories for more information.

## Development Environment
A [Docker development environment](#docker-development-environment) is provided for convenience. The [Self setup development environment](#self-setup-development-environment) section defines requirements to reproduce this environment without containers.

## Docker Development Environment
A development environment is provided, this starts a Postgres server, sets all configuration environment variables, and opens a Bash shell in the repository root.

To start this environment and open the Bash shell run:

```
./scripts/container-dev.sh -s
```

This script can also perform other helpful tasks based on the option provided:

- `-s`: Open a shell prompt
- `-d`: Run both the server and frontend's development setups
- `-i`: Install dependencies for both the server and frontend

> _Behind the scenes_:  
> This script starts the containers specified in `docker-compose.yml` and `docker-compose.dev.yml` files. Then executes a Bash process in the `inventorydev` container. This is equivalent to:
> 
> ```
> ./scripts/docker-compose.sh up -d --build
> ./scripts/docker-compose.sh exec inventorydev bash
> ```

## Self Setup Development Environment
A Postgres server and an environment which has NodeJS and NPM installed is required.

Set [configuration environment variables](#configuration) with details on where the Postgres server is running, as well as any other relevant values.

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
