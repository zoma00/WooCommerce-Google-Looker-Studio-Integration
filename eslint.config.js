module.exports = [
  {
    files: ["Code.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
      globals: {
        HtmlService: "readonly",
        PropertiesService: "readonly",
        SpreadsheetApp: "readonly",
        UrlFetchApp: "readonly",
        Utilities: "readonly",
        module: "readonly",
      },
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": ["error", { "varsIgnorePattern": "^(doGet|saveWooCommerceDataToSheet|getWooCommerceDataForHTML)$" }],
      eqeqeq: "error",
    },
  },
  {
    files: ["tests/**/*.js", "eslint.config.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        module: "readonly",
        require: "readonly",
      },
    },
    rules: {
      "no-undef": "error",
      "no-unused-vars": "error",
      eqeqeq: "error",
    },
  },
];
