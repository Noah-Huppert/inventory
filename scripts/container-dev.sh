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

prog_dir=$(dirname $(realpath "$0"))

while getopts "h" opt; do
  case "$opt" in
    h)
      cat <<EOF
container-dev.sh - Run development setup with Docker

USAGE

  container-dev.sh [-h]

BEHAVIOR

  -h  Show help text

  Starts a Postgres container and a container for development. Opens a shell in the development container. The repository directory is mounted as a volume and set as the working directory.

EOF
      exit 0
      ;;
    '?') die "Unknown option" ;;
  esac
done

# Start docker compose
"$prog_dir/docker-compose.sh" up -d
check "Failed to start containers"

# Open a shell
"$prog_dir/docker-compose.sh" exec inventorydev bash
check "Failed to open shell in container"
