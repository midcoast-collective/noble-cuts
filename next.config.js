const withPlugins = require("next-compose-plugins");

const nextConfig = {
  target: "serverless",
  webpack: (config, options) => {
    config.module.rules.push(
      {
        test: /\.md$/,
        use: "raw-loader",
      },
      {
        test: /\.(jpe?g|png|webp)$/i,
        use: {
          loader: "responsive-loader",
          options: {
            adapter: require("responsive-loader/sharp"),
            name: "[name]-[width].[ext]",
            outputPath: "../public/images/responsive/",
            publicPath: "images/responsive/",
            emitFile: true,
          },
        },
      }
    );

    return config;
  },
};

module.exports = withPlugins([], nextConfig);
