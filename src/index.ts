import type { Linter } from "eslint";

// Base modules (included in default config)
import comments from "./modules/comments.js";
import eslint from "./modules/eslint.js";
import importX from "./modules/import-x.js";
import json from "./modules/json.js";
import node from "./modules/node.js";
import prettier from "./modules/prettier.js";
import promise from "./modules/promise.js";
import security from "./modules/security.js";
import typescript from "./modules/typescript.js";
import yaml from "./modules/yaml.js";

// Optional modules (not included in default config)
import graphql from "./modules/graphql.js";
import jest from "./modules/jest.js";
import react from "./modules/react.js";
import vue2 from "./modules/vue2.js";
import vue3 from "./modules/vue3.js";

// Export all modules individually
export {
  // Base modules
  comments,
  eslint,
  importX,
  json,
  node,
  prettier,
  promise,
  security,
  typescript,
  yaml,
  // Optional modules
  graphql,
  jest,
  react,
  vue2,
  vue3,
};

// Default config: Base modules combined
const config: Linter.Config[] = [
  { ignores: ["dist/"] },
  ...eslint,
  ...typescript,
  ...importX,
  ...node,
  ...promise,
  ...security,
  ...comments,
  ...json,
  ...yaml,
  ...prettier,
];

export default config;
