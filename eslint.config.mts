import eslint from "@eslint/js"
import { defineConfig } from "eslint/config"
import eslintConfigPrettier from "eslint-config-prettier"
import pluginVue from "eslint-plugin-vue"
import globals from "globals"
import tseslint from "typescript-eslint"

export default defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  pluginVue.configs["flat/recommended"],
  eslintConfigPrettier, // disable stylistic rules that may conflict with prettier
  {
    ignores: [".vitepress/cache/", ".vitepress/dist/"],
  },
  {
    rules: {
      // override/add rules settings here, such as:
      // 'vue/no-unused-vars': 'error'
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },
)
