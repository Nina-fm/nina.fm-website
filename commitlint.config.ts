import type { UserConfig } from '@commitlint/types'

const config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Types autorisés
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'perf', 'build', 'ci', 'revert'],
    ],
    // Longueur du header
    'header-max-length': [2, 'always', 100],
    // Scope en kebab-case
    'scope-case': [2, 'always', 'kebab-case'],
    // Subject en lowercase
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    // Pas de point final
    'subject-full-stop': [2, 'never', '.'],
    // Subject non vide
    'subject-empty': [2, 'never'],
    // Type non vide
    'type-empty': [2, 'never'],
    // Body : ligne vide avant
    'body-leading-blank': [1, 'always'],
    // Footer : ligne vide avant
    'footer-leading-blank': [1, 'always'],
  },
}

export default config
