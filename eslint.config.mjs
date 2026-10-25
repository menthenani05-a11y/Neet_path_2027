import tsParser from '@typescript-eslint/parser';
import nextPlugin from '@next/eslint-plugin-next';

export default [{
  files: ['**/*.{js,jsx,ts,tsx}'],
  ignores: ['.next/**', 'node_modules/**'],
  languageOptions: { parser: tsParser, parserOptions: { ecmaFeatures: { jsx: true }, sourceType: 'module' } },
  plugins: { '@next/next': nextPlugin },
  rules: { ...nextPlugin.configs.recommended.rules, ...nextPlugin.configs['core-web-vitals'].rules },
}];
