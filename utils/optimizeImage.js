const imagemin = require('imagemin');
const path = require('path');
const fs = require('fs');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminGiflossy = require('imagemin-giflossy');
const imageminPngquant = require('imagemin-pngquant');
const imageminSvgo = require('imagemin-svgo');

const logger = require('../logger');

module.exports = async assetName => {
    try {
        logger.info(`Optimizing image ${assetName}`);
        const filePath = path.join(__dirname, '../public/static/blogs', assetName);
        if (!fs.existsSync(filePath)) {
            throw new Error(`${assetName} does not exist!`);
        }

        await imagemin([filePath], {
            destination: path.join(__dirname, '../public/static/blogs'),
            plugins: [
                imageminMozjpeg({
                    quality: 75,
                    progressive: true
                }),
                imageminPngquant({
                    strip: true
                }),
                imageminGiflossy({
                    optimizationLevel: 3,
                    lossy: 80,
                    optimize: 3
                }),
                imageminSvgo()
            ]
        });
        
        logger.info('Optimization done!');
    } catch (error) {
        logger.error(error);
    }
};
