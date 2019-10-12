import fetch from 'isomorphic-unfetch';

function postTitleValidate(title) {
    if(title.length < 10) {
        return 'Title should be at least 10 characters long!';
    } else if (title.length > 200) {
        return 'Title should be at most 200 characters long!';
    } else if (!new RegExp(/^[A-Z]{1,}.*/).test(title)) {
        return 'Title must begin with uppercase letter!';
    } else if (!new RegExp(/.* .*/).test(title)) {
        return 'Title must have at least a few words!';
    }
    return '';
}

async function validateHeaderImageURL(url) {
    let error = '';
    if (!new RegExp(/(http(s?):)([/|.|\w|\s|-])*\.(?:jpe?g|png)/i).test(url)) {
        error = 'Header Image URL doesn\'t look like a valid one!';
    } else {
        try {
            const resp = await fetch(url);
            if (!resp.ok) {
                throw new Error();
            }
        } catch (err) {
            console.log(err);
            error = 'Header image URL is invalid!';
        }
    }
    return error;
}

module.exports = {
    postTitleValidate,
    validateHeaderImageURL
};
