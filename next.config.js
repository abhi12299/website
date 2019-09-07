const withCSS = require('@zeit/next-css');
const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next-server/constants');
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([
    [withCSS, { shouldMergeChunks: false }, [PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD]]
]);
