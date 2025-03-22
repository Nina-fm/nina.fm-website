import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  ...eslintPluginPrettierRecommended,
  rules: {
    ...eslintPluginPrettierRecommended.rules,
    'vue/multi-word-component-names': 'off',
  },
})
