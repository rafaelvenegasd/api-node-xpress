import type { Config } from "@jest/types";
require("dotenv").config();

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  testTimeout: 20000,
  setupFiles: ["dotenv/config"],
};

export default config;
