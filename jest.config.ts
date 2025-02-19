import type { Config } from "jest";

const config: Config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",

  preset: "ts-jest",

  testEnvironment: "jsdom",

  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "babel-jest", // Use Babel to transform JSX
  },

  transformIgnorePatterns: [
    "/node_modules/(?!YOUR_MODULE_NAME)", // Adjust YOUR_MODULE_NAME if needed
    "\\.pnp\\.[^\\/]+$",
  ],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },

  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],

  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[tj]s?(x)"],
};

export default config;
