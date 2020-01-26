const $ = require('cheerio');
const baseURL = require('../constants/apiURL');

// scans through the header image
// and body of a post to find media attached to a post
// hosted on the same server
module.exports = (headerImage, postBody) => {
    // list to store media asset names on the server
    // attached to the post
    const assetNames = new Set();
    const fullURLRegex = new RegExp(`^${baseURL}/static/blogs/`);
    // short urls beign with ../static/blogs
    // tinyMCE trims same source urls to this
    const shortURLRegex = new RegExp('^../static/blogs/');
    if (fullURLRegex.test(headerImage) || shortURLRegex.test(headerImage)) {
        const temp = headerImage.split('/');
        // only need the asset name, not full path
        assetNames.add(temp[temp.length - 1]);
    }
    
    const imgTags = $(postBody).find('img');
    imgTags.each((index, img) => {
        if (fullURLRegex.test(img.attribs.src) || shortURLRegex.test(img.attribs.src)) {
            const temp = img.attribs.src.split('/');
            assetNames.add(temp[temp.length - 1]);
        }
    });

    const videoTags = $(postBody).find('video');
    videoTags.each((index, video) => {
        if (fullURLRegex.test(video.attribs.src) || shortURLRegex.test(video.attribs.src)) {
            assetNames.push(video.attribs.src);
        }
    });
    
    console.log('Attached media with the post is:', Array.from(assetNames));

    return Array.from(assetNames);
};