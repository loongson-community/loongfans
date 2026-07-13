#!/usr/bin/env bash

PROJECT_ROOT="$(realpath "$(dirname "${BASH_SOURCE[0]}")"/..)"
cd "$PROJECT_ROOT"

_running_on_loong64() {
  [[ $( uname -m ) == loongarch64 ]]
}

_has_loong64_binding_pkg() {
  [[ $(pnpm why @oxc-parser/binding-linux-loong64-gnu 2>&1 | wc -l) -gt 0 ]]
}

main() {
  if _running_on_loong64 && ! _has_loong64_binding_pkg; then
    echo "note: @oxc-parser/binding-linux-loong64-gnu seems not existing yet" >&2
    echo "note: force-enabling napi-rs WASI fallback codepath" >&2
    export NAPI_RS_FORCE_WASI=1
  fi
  exec pnpm exec "$@"
}

main "$@"
