# Chrome Extension Starter

This is a simple setup for chrome extension development.

## Installing

1. Download a zip of this repository and unzip it.
2. Open Chrome and navigate to **`chrome://extensions/`**
3. Enable "Developer Mode" on the top right.
4. Click "Load Unpacked" and navigate to the "build" folder in the zip you downloaded.

## Development

```sh
$ yarn dev
```

This will build the chrome extension and start a webpack devserver with the bundled app.

The extension will also be available to download on any device on the local network. Check the console for exact location:

```sh
Chrome Extension available to download at https://192.168.1.2:3333/dev-extension.zip
```

On the device you're testing with:

1. Download and unzip the extension
2. Go to **`chrome://extensions/`** and enable "Developer Mode" on the top right.
3. Click "Load Unpacked" and navigate to folder you just unzipped.

_Note_: The first time you load the dev extension, the added script will likely get blocked due to invalid HTTPS certificate. You'll have to visit the bundle.js URL directly in the browser and dismiss Chrome's warnings.
