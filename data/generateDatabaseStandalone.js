// This script is intended for use without relying on VitePress,
// specifically for testing JSON files independently.

import { generateAll } from "../.vitepress/plugins/loongfans-data/generateDatabase"

// Default: Generating everyone without formatted data
// If require formatted JSON files, set this function value to 1.
generateAll(0).catch(console.error)
