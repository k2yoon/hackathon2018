#!/usr/bin/env sh

set -o xtrace

set -o errexit

echo "Environment: ${ENVIRONMENT}"

echo "Running $@"

exec "$@"
