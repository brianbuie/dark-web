const shell = require("shelljs");
const chalk = require("chalk");
const archiver = require("archiver");
const path = require("path");
const fs = require("fs");
const devConfig = require("../webpack.dev.js");

const { host, port } = devConfig.devServer;
const isProd = process.env.NODE_ENV === "production";
const dest = isProd ? "build" : "build-dev";

// remove everything at the build location
console.log(`Rebuilding extension in ${dest}/`);
shell.rm("-rf", `${dest}/*`);

// Copy files
shell.cp("-R", "chrome/assets/", `${dest}/assets/`);
shell.cp("-R", "chrome/js", `${dest}/js/`);

// Replace "_BUNDLE_SRC_" in content.js
// Prod build has bundle included
// Dev build retrieves bundle from devServer
const bundleSrc = isProd
  ? `chrome.runtime.getURL('./js/bundle.js')`
  : `'https://${host}:${port}/bundle.js'`;
shell.sed("-i", "_BUNDLE_SRC_", bundleSrc, `${dest}/js/content.js`);

// Dynamically create the manifest
// Dev build has additional permissions for devServer
delete require.cache[require.resolve("../chrome/manifest.js")];
const manifest = require("../chrome/manifest.js");
fs.writeFileSync(`${dest}/manifest.json`, JSON.stringify(manifest, null, 2));

// zip the dev build folder and put it in the dev build folder
// this allows the zip to be downloaded from the devServer on any device on the network
if (!isProd) zipAndMove();

// zip it
function zipDirectory(source, out) {
  const archive = archiver("zip", { zlib: { level: 9 } });
  const stream = fs.createWriteStream(out);

  return new Promise((resolve, reject) => {
    archive
      .directory(source, false)
      .on("error", (err) => reject(err))
      .pipe(stream);

    stream.on("close", () => resolve());
    archive.finalize();
  });
}

// zips into the project root (to avoid recursion)
// moves it into dev-build
// console logs download location
async function zipAndMove() {
  const filename = "dev-extension.zip";
  const source = path.resolve(__dirname, "../build-dev/");
  const output = path.resolve(__dirname, "..") + `/${filename}`;

  await zipDirectory(source, output);
  shell.mv(output, source);

  const downloadAt = `https://${host}:${port}/${filename}`;
  console.log(
    chalk.yellow(
      `Chrome Extension available to download at ${chalk.green(downloadAt)}`
    )
  );
}
