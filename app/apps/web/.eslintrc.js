module.exports = {
  extends: ["@repo/eslint-config/next.js"],
  rules: {
    "no-console": "off",
    "turbo/no-undeclared-env-vars": "off",
    "no-confusing-void-expressions": "off",
  },
  env: {
    node: true,
  },
  globals: {
    NodeJS: true,
  },
};
