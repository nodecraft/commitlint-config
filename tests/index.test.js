import lint from '@commitlint/lint';
import load from '@commitlint/load';
import {
	beforeAll,
	describe,
	expect,
	it,
} from 'vitest';

describe('commitlint config', () => {
	let config;

	beforeAll(async () => {
		config = await load({ extends: ['./index.js'] });
	});

	function lintMessage(message) {
		return lint(message, config.rules, { parserOpts: config.parserPreset.parserOpts });
	}

	it('accepts a conventional commit', async () => {
		const result = await lintMessage('feat: add a thing');
		expect(result.valid).toBe(true);
	});

	it('accepts the wip type', async () => {
		const result = await lintMessage('wip: half done');
		expect(result.valid).toBe(true);
	});

	it('accepts long body and footer lines', async () => {
		const long = 'a'.repeat(300);
		const result = await lintMessage(`fix: something\n\n${long}\n\nBREAKING CHANGE: ${long}`);
		expect(result.valid).toBe(true);
	});

	it('rejects an unknown type', async () => {
		const result = await lintMessage('foo: not a type');
		expect(result.errors.map(error => error.name)).toContain('type-enum');
	});
});
