const ERROR = {
	off: 'off',
	warn: 'warn'
}

module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
		'node': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended'
	],
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': [
		'react'
	],
	'rules': {
		'indent': ['error', 'tab'],
		'no-unused-vars': ERROR.warn,
		'react/prop-types': ERROR.off,
		'quotes': ['error', 'single'],
		'semi': ['error', 'never']
	}
}
