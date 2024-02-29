/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks:true,
  setupFiles: ['dotenv/config'],
  moduleFileExtensions:["js","ts", "tsx", "node"],
  roots:["server/src"],
  testMatch: ["**/__tests__/**/*.[jt]s?(x)"],
  transform: {
    "^.+\\.(ts|tsx)$":"ts-jest",
  },
}