#!/usr/bin/env bash
prog_dir=$(dirname $(realpath "$0"))

die() {
  echo "Error: $@" >&2
  exit 1
}

check() {
  if [[ "$?" != "0" ]]; then
	  die "$@"
  fi
}

checkcd() {
  cd "$@"
  check "Failed to change into: $@"
}

while getopts "hx" opt; do
  case "$opt" in
    h)
      cat <<EOF
dev.sh - Run development setup for frontend and server

USAGE

  dev.sh [-hx]

BEHAVIOR

  -h  Show help text
  -x  Kill any orphan children

  Or by default starts both the yarn dev-server and dev-frontend scripts.

EOF
      exit 0
      ;;
    x)
      echo "Killing"
      ps -aux | grep inventory/node | awk '{ print $2 }' | xargs -L1 kill
      check "Failed to kill"
      
      exit 0
      ;;
    '?') die "Unknown option" ;;
  esac
done

pids=()

checkcd "$prog_dir/../server"
yarn dev &
pids+=("dev-server $!")

checkcd "$prog_dir/../frontend"
yarn dev &
pids+=("dev-frontend $!")

cleanup() {
  for pid_info in "${pids[@]}"; do
    name=$(echo "$pid_info" | awk '{ print $1 }')
    pid=$(echo "$pid_info" | awk '{ print $2 }')

    if ps -p "$pid" &> /dev/null; then
      echo "Killing $name"
      kill "$pid"
      check "Failed to kill $pid_info"
    else
      echo "Confirmed $name stopped"
    fi
  done
}

trap cleanup EXIT

for pid_info in "${pids[@]}"; do
  name=$(echo "$pid_info" | awk '{ print $1 }')
  pid=$(echo "$pid_info" | awk '{ print $2 }')

  wait "$pid"
  check "Failed to wait for $pid_info to complete"
done
