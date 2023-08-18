// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
process.env.ASSET_PATH = '/';

var WebpackDevServer = require('webpack-dev-server'),
  webpack = require('webpack'),
  config = require('../webpack.config'),
  env = require('./env'),
  path = require('path'),
  fs = require('fs'),
  mkcert = require('mkcert');


var options = config.chromeExtensionBoilerplate || {};
var excludeEntriesToHotReload = options.notHotReload || [];

for (var entryName in config.entry) {
  if (excludeEntriesToHotReload.indexOf(entryName) === -1) {
    config.entry[entryName] = [
      'webpack/hot/dev-server',
      `webpack-dev-server/client?hot=true&hostname=localhost&port=${env.PORT}`,
    ].concat(config.entry[entryName]);
  }
}

delete config.chromeExtensionBoilerplate;

// create a certificate authority
// const ca = await mkcert.createCA({
//   organization: 'Hello CA',
//   countryCode: 'NP',
//   state: 'Bagmati',
//   locality: 'Kathmandu',
//   validityDays: 365
// });

// // then create a tls certificate
// const cert = await mkcert.createCert({
//   domains: ['127.0.0.1', 'localhost'],
//   validityDays: 365,
//   caKey: ca.key,
//   caCert: ca.cert
// });

var compiler = webpack(config);
var server = new WebpackDevServer(
  {
    hot: true,
    liveReload: false,
    client: {
      webSocketTransport: 'sockjs',
    },
    webSocketServer: 'sockjs',
    host: 'localhost',
    port: env.PORT,
    static: {
      directory: path.join(__dirname, '../build'),
    },
    devMiddleware: {
      publicPath: `http://localhost:${env.PORT}/`,
      writeToDisk: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    allowedHosts: 'all',
    // server: "https"
    server: {
      type: "https",
      options: {
        key: path.resolve(__dirname, 'ssl', 'cert.key'),
        crt: path.resolve(__dirname, 'ssl', 'cert.crt'),
        passphrase: '123123',
        requestCert: true
      }
    }
  },
  compiler
);

(async () => {
  await server.start();
})();
