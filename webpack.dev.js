const path = require("path");
const merge = require("webpack-merge");
const ip = require("ip");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "./build-dev"),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    https: true,
    host: ip.address(),
    port: 3333,
    disableHostCheck: true,
    stats: "minimal",
  },
  output: {
    path: path.resolve(__dirname, "./build-dev/js/"),
  },
  devtool: "source-map",
});
