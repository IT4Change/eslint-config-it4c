// Base modules (included in default config)
import comments from "./modules/comments";
import eslint from "./modules/eslint";
import graphql from "./modules/graphql";
import importX from "./modules/import-x";
import jest from "./modules/jest";
import json from "./modules/json";
import node from "./modules/node";
import prettier from "./modules/prettier";
import promise from "./modules/promise";
import react from "./modules/react";
import security from "./modules/security";
import typescript from "./modules/typescript";
import vue2 from "./modules/vue2";
import vue3 from "./modules/vue3";
import yaml from "./modules/yaml";

import type { Linter } from "eslint";

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
