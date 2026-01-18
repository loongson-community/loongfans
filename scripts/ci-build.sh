#!/bin/sh
# Runs in Alpine Linux for every CI run, mimicking real deployment workflow
# elsewhere.

set -ex

env

apk update
apk upgrade
apk add pnpm

[[ -n $GITHUB_WORKSPACE ]] && cd "$GITHUB_WORKSPACE"
pnpm install
pnpm run build
