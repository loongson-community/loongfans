#!/usr/bin/env bash

PROJECT_ROOT="$(realpath "$(dirname "${BASH_SOURCE[0]}")"/..)"
cd "$PROJECT_ROOT"

_running_on_loong64() {
  [[ $( uname -m ) == loongarch64 ]]
}

_napi_binding_pkgs_to_check=(
  @oxc-parser/binding-linux-loong64-gnu
  @rolldown/binding-linux-loong64-gnu
)

_pnpm_has_pkg() {
  [[ $(pnpm why "$1" 2>&1 | wc -l) -gt 0 ]]
}

main() {
  if _running_on_loong64; then
    for pkg in "${_napi_binding_pkgs_to_check[@]}"; do
      _pnpm_has_pkg "$pkg" && continue
      echo "note: $pkg seems not existing yet" >&2
      echo "note: force-enabling napi-rs WASI fallback codepath" >&2
      export NAPI_RS_FORCE_WASI=1
      break
    done
  fi
  exec pnpm exec "$@"
}

main "$@"
