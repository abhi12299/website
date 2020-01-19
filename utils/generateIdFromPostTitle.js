// generates _id for mongodb from post title
module.exports = title => {
    return title
                .trim()
                .toLowerCase()
                .replace(/\s/g, '-')
                .replace(/[^\w\-]/g, '')
                .replace(/-{2,}/g, '-') // replace consecutive dashes with single dash
                .substr(0, 200);
};
