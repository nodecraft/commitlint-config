import base from '@nodecraft/eslint-config/base';
import vitest from '@vitest/eslint-plugin';

export default [
	...base,
	{
		languageOptions: {
			sourceType: 'module',
		},
	},
	{
		files: ['tests/**/*.js'],
		plugins: {
			vitest,
		},
		rules: {
			...vitest.configs.recommended.rules,
		},
	},
];
