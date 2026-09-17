const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
	outputFileTracingRoot: path.join(__dirname),
	turbopack: {
		root: path.join(__dirname),
	},
	reactStrictMode: true,
	images: {
		domains: ["team.valvoline.com"],
	},
	compiler: {
		// Enables the styled-components SWC transform
		styledComponents: true,
	},
	transpilePackages: ["rc-util", "antd", "@babel/runtime"],
};

module.exports = nextConfig;
