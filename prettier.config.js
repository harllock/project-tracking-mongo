module.exports = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: false,

  overrides: [
    {
      files: "*.sol",
      options: {
        printWidth: 100,
        tabWidth: 2,
        useTabs: false,
        singleQuote: false,
        bracketSpacing: true,
        explicitTypes: "preserve",
      },
    },
    {
      files: "*.mongodb",
      options: {
        parser: "babel",
      },
    },
  ],
}
