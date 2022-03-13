const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

module.exports = (env, option) => {
  return {
    entry: "./src/index.tsx",
    output: {
      filename: "index.js",
      clean: true,
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/i,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [["@babel/plugin-transform-runtime", { corejs: 3 }]],
            },
          },
        },
        {
          test: /\.tsx?$/i, // .ts 에 한하여 ts-loader를 이용하여 transpiling
          exclude: /node_module/,
          use: {
            loader: "ts-loader",
          },
        },
        {
          test: /\.css/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: ["autoprefixer"],
                },
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "style.css",
      }),
      new CopyPlugin({
        patterns: [{ from: "static" }],
      }),
      new RefreshWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin(),
    ],
    devServer: {
      hot: true,
    },
  };
};
