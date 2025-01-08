/** @type {import('next').NextConfig} */
const nextConfig = {
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
