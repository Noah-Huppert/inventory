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

checkcd() {
  cd "$@"
  check "Failed to change into: $@"
}

prog_dir=$(dirname $(realpath "$0"))

while getopts "h" opt; do
  case "$opt" in
    h)
      cat <<EOF
install.sh - Install server and frontend dependencies

USAGE

  install.sh [-h]

OPTIONS

  -h  Show help text

BEHAVIOR

  Install dependencies via Yarn for server and frontend.

EOF
      exit 0
      ;;
    '?') die "Unknown option" ;;
  esac
done

bold "Installing server dependencies"
checkcd "$prog_dir/../server"
yarn install
check "Failed to install server dependencies via Yarn"

bold "Installing frontend dependencies"
checkcd "$prog_dir/../frontend"
yarn install
check "Failed to install frontend dependencies via Yarn"

