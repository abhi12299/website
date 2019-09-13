const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const withCSS = require('@zeit/next-css');
const withOffline = require('next-offline');
const withPlugins = require("next-compose-plugins");
const path = require('path');

module.exports = withPlugins([
    [withCSS],
    [withBundleAnalyzer, {
        analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
        analyzeBrowser: ["browser", "both"].includes(process.env.BUNDLE_ANALYZE),
        bundleAnalyzerConfig: {
            server: {
                analyzerMode: 'static',
                reportFilename: '../bundles/server.html'
            },
            browser: {
                analyzerMode: 'static',
                reportFilename: '../bundles/client.html'
            }
        }
    }],
    [withOffline, {
        generateSw: false,
        workboxOpts: {
            swSrc: path.join(__dirname, 'service-worker.js'),
            importWorkboxFrom: 'local'
        }
    }],
]);
