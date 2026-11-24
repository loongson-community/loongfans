# Module Invariants: src/node/routes

@liyi:module

This module contains VitePress route modules for dynamic page generation.

**Key invariants:**

1. **Clean Build Compatibility**: All route modules must generate their own data
   using `DatabaseGenerator` rather than importing from data modules. This avoids
   circular dependencies during clean builds because VitePress resolves routes
   before the data pipeline is ready.

2. **Locale Handling**: Route compilers must handle both Chinese (default) and
   English locales, with proper i18n integration for page titles and metadata.

3. **Parameter Contract**: The `paths()` function must return route configurations
   matching the parameter structure expected by the corresponding page template.

4. **Content Loading**: Markdown content for dynamic routes is loaded from the
   filesystem at build time, not bundled with the route module.
