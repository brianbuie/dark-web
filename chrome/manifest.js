const devConfig = require("../webpack.dev.js");
const { host, port } = devConfig.devServer;

const contentSecurityPolicy = require("content-security-policy-builder");
const isProd = process.env.NODE_ENV === "production";

const prodDirectives = {
  defaultSrc: ["'self'"],
  scriptSrc: ["'self'", "'unsafe-eval'"],
  styleSrc: ["*", "'unsafe-inline'", "'self'"],
};

const devDirectives = {
  ...prodDirectives,
  scriptSrc: [`https://${host}:${port}`, ...prodDirectives.scriptSrc],
  connectSrc: [`ws://${host}:${port}`, `https://${host}:${port}`],
};

const extensionName = isProd
  ? "Chrome Extension Starter"
  : "Chrome Extension Starter DEV";
const directives = isProd ? prodDirectives : devDirectives;

module.exports = {
  short_name: extensionName,
  name: extensionName,
  version: "1.0",
  manifest_version: 2,
  icons: {
    16: "assets/icon-16.png",
    48: "assets/icon-48.png",
    128: "assets/icon-128.png",
  },
  content_security_policy: contentSecurityPolicy({ directives }),
  content_scripts: [
    {
      js: ["js/content.js"],
      matches: ["<all_urls>"],
      run_at: "document_idle",
    },
  ],
  background: {
    scripts: ["js/background.js"],
  },
  browser_action: {
    default_icon: "assets/icon-48.png",
  },
  permissions: ["activeTab"],
  web_accessible_resources: ["*.js"],
};
