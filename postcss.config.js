// postcss.config.js
module.exports = {
	plugins: [
		require("postcss-import"),
		require("tailwindcss"),
		require("autoprefixer")
		// Ensure any async plugins are correctly used
	]
};
