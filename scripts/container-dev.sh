#!/usr/bin/env bash
die() {
  echo "Error: $@" >&2
  exit 1
}

check() {
  if [[ "$?" != "0" ]]; then
	  die "$@"
  fi
}

bold() {
  echo "$(tput bold)$@$(tput sgr0)"
}

prog_dir=$(dirname $(realpath "$0"))

dev_action=dev-script
while getopts "hsdi" opt; do
  case "$opt" in
    h)
      cat <<EOF
container-dev.sh - Run development setup with Docker

USAGE

  container-dev.sh [-h] -s|d|i

OPTIONS

  -h  Show help text
  -s  Start a shell in the repository root
  -d  Starts the frontend and server development scripts
  -i  Installs dependencies for the frontend and server

BEHAVIOR

  Starts a Postgres container and a container for development. Opens a shell in the development container. The repository directory is mounted as a volume and set as the working directory.

  The -s, -d, and -i options specify one action to take inside this development setup. Only one may be specified. By default -d is used.

EOF
      exit 0
      ;;
    s) dev_action=shell ;;
    d) dev_action=dev-script ;;
    i) dev_action=install ;;
    '?') die "Unknown option" ;;
  esac
done

# Start docker compose
"$prog_dir/docker-compose.sh" up -d
check "Failed to start containers"

# Perform the development action
case "$dev_action" in
  shell)
    bold "Opening shell"
    "$prog_dir/docker-compose.sh" exec inventorydev bash
    check "Failed to open shell in container"
    ;;
  dev-script)
    bold "Running development script"
    "$prog_dir/docker-compose.sh" exec inventorydev ./scripts/dev.sh
    check "Failed to execute the development script in the container"
    ;;
  install)
    bold "Installing server and frontend dependencies"
    "$prog_dir/docker-compose.sh" exec inventorydev ./scripts/install.sh
    check "Failed to install server and frontend dependencies in the container"
    ;;
esac
