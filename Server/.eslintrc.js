const ERROR = {
	off: 'off',
	warn: 'warn'
}
module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true
	},
	extends: [
		'standard'
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	rules: {
		indent: ['error', 'tab'],
		'no-tabs': ERROR.off,
		'no-unused-vars': ERROR.warn,
		'node/no-path-concat': ERROR.off
	}
}
