export default file => {
    const mimeType = file.type;
    console.log({ mimeType });
    if (/^image\/gif/i.test(mimeType)) {
        return 'image-gif';
    } else if (/^image\/svg/i.test(mimeType)) {
        return 'image-svg';
    } else if (/^image\/.*/i.test(mimeType)) {
        return 'image';
    }else if (/^video\/.*/i.test(mimeType)) {
        return 'video';
    }
    return 'unknown';
};
