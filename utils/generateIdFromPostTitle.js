// generates _id for mongodb from post title
module.exports = title => {
    return title
                .trim()
                .toLowerCase()
                .replace(/\s/g, '-')
                .replace(/[^\w\-]/g, '')
                .substr(0, 200);
};
