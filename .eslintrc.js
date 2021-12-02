module.exports = {
	extends: [
		"react-app",
		"prettier",
		"plugin:jsx-a11y/recommended",
	],
	plugins: ["jsx-a11y", "prettier"],
	rules: {
		"react/jsx-filename-extension": [1, { extensions: [".js", ".jsx", ".tsx"] }],
	},
	overrides: [
		{
			files: ["**/*.ts?(x)"],
			rules: {},
		},
	],
};
