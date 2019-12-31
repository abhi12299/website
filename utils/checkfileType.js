export default file => {
    const mimeType = file.type;
    if (/^image\/gif/i.test(mimeType)) {
        return 'image-gif';
    } else if (/^image\/.*/i.test(mimeType)) {
        return 'image';
    }else if (/^video\/.*/i.test(mimeType)) {
        return 'video';
    }
    return 'unknown';
};
