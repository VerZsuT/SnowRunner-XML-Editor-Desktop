import js from '@eslint/js';
import unicorn from 'eslint-plugin-unicorn';
import vue from 'eslint-plugin-vue';
import ts from 'typescript-eslint';
import vueParser from 'vue-eslint-parser';

export default [
	js.configs.recommended,
	ts.configs.eslintRecommended,
	...ts.configs.recommended,
	...vue.configs["flat/recommended"],
	{
	languageOptions: {
		parser: vueParser,
		parserOptions: {
			parser: '@typescript-eslint/parser',
			ecmaVersion: 'latest',
			sourceType: 'module',
			project: [
				'src/tsconfig.json',
				'src/main/tsconfig.json',
				'src/renderer/tsconfig.json',
			],
			extraFileExtensions: ['.vue'],
		},
	},	
	plugins: {
		'vue': vue,
		'unicorn': unicorn,
	},
	rules: {
		'quotes': ['warn', 'single'],
		'semi': ['warn', 'never'],
		'eqeqeq': ['warn', 'always'],
		'camelcase': ['warn', { properties: 'always' }],
		'no-async-promise-executor': 'warn',
		'no-extra-bind': 'warn',
		'no-extra-label': 'warn',
		'no-lone-blocks': 'warn',
		'no-lonely-if': 'warn',
		'no-sequences': 'warn',
		'no-useless-call': 'warn',
		'operator-assignment': 'warn',
		'prefer-const': 'warn',
		'prefer-template': 'warn',
		'arrow-parens': ['warn', 'as-needed'],
		'arrow-spacing': 'warn',
		'block-spacing': 'warn',
		'comma-spacing': 'warn',
		'comma-style': 'warn',
		'eol-last': 'warn',
		'func-call-spacing': 'warn',
		'no-whitespace-before-property': 'warn',
		'keyword-spacing': 'warn',
		'implicit-arrow-linebreak': 'warn',
		'computed-property-spacing': 'warn',
		'comma-dangle': ['warn', 'never'],
		'quote-props': ['warn', 'as-needed'],
		'prefer-rest-params': 'error',
		'one-var': ['error', 'never'],
		'no-useless-rename': 'error',
		'no-useless-return': 'error',
		'no-var': 'error',
		'no-undef-init': 'error',
		'no-unneeded-ternary': 'error',
		'no-proto': 'error',
		'no-eval': 'error',
		'no-extend-native': 'error',
		'no-alert': 'error',
		'no-caller': 'error',
		'@typescript-eslint/consistent-type-imports': 'error',
		'@typescript-eslint/no-floating-promises': 'warn',
		'@typescript-eslint/no-unused-vars': ['warn', {
			vars: 'all',
			args: 'after-used',
			varsIgnorePattern: '_+',
		}],
		'@typescript-eslint/no-namespace': 'off',
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/ban-ts-comment': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'@typescript-eslint/no-this-alias': 'off',
		'@typescript-eslint/no-non-null-assertion': 'off',
		'no-tabs': 'off',
		'no-multi-spaces': 'off',
		'key-spacing': 'off',
		'no-bitwise': 'off',
		'indent': 'off',
		'no-empty': 'off',
		'no-empty-function': 'off',
		'no-invalid-this': 'off',
		'no-param-reassign': 'off',
		'no-void': 'off',
		'no-unused-expressions': 'off',
		'no-unused-vars': 'off',
		'unicorn/no-static-only-class': 'off',
		'unicorn/prefer-top-level-await': 'off',
		'unicorn/prevent-abbreviations': 'off',
		'unicorn/no-process-exit': 'off',
		'unicorn/no-array-reduce': 'off',
		'unicorn/no-array-callback-reference': 'off',
		'unicorn/no-zero-fractions': 'off',
		'unicorn/no-null': 'off',
		'unicorn/no-await-expression-member': 'off',
		'unicorn/consistent-function-scoping': 'off',
		'unicorn/consistent-destructuring': 'off',
		'vue/multi-word-component-names': 'off',
	},
	ignores: [
		'images',
		'*.dll',
		'*.SFX',
		'*.txt',
		'*.ion',
		'*.lst',
		'*.exe',
		'*.chm',
		'*.sass',
		'*.scss',
		'*.css',
		'*.json',
		'*.html',
	],
}]
