module.exports = {
    semi: false,
    singleQuote: true,
    overrides: [
      {
        files: ['*.ts', '*.tsx'],
        options: {
          parser: 'typescript',
        },
      },
    ],
  }