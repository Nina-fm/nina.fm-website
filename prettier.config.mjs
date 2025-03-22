/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  semi: false,
  singleQuote: true,
  useTabs: false,
  tabWidth: 2,
  trailingComma: 'all',
  printWidth: 120,
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'auto',
  embeddedLanguageFormatting: 'auto',
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
  htmlWhitespaceSensitivity: 'ignore',
  vueIndentScriptAndStyle: true,
}

export default config
