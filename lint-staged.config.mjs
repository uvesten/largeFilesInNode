export default {
  "*.{md,json}": "prettier --write",
  "*.ts": ["prettier --write", "eslint"],
  "**/*.ts": () => "pnpm test",
};
