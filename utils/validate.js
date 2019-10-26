import fetch from 'isomorphic-unfetch';

function validatePostBody(body) {
    if (body.length < 200) {
        return 'Body should be more than 200 characters long!';
    }
    return '';
}

function validatePostTitle(title) {
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

function validateMetaDesc(desc) {
    if (desc.length < 80) {
        return 'Meta description must be at least 80 characters long!';
    } else if (desc.length > 250) {
        return 'Meta description must be at most 250 characters long!';        
    } else if (!new RegExp(/^[A-Z]{1,}.*/).test(desc)) {
        return 'Meta description must begin with uppercase letter!';
    } else if (!new RegExp(/.* .*/).test(desc)) {
        return 'Meta description must have at least a few words!';
    }
}

async function validateHeaderImageURL(url) {
    let error = '';
    if (!new RegExp(/(http(s?):).*?\.(?:jpe?g|png)/i).test(url)) {
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

function validateMetaKeywords(keywords) {
    let error = '';
    let keywordArr = keywords.split(',');
    keywordArr = keywordArr.filter(k => k.trim().length > 0);
    if (keywordArr.length === 0) {
        error = 'Meta keywords cannot be empty';
    } else if (keywordArr.length === 1) {
        error = 'Please enter more than 1 meta keywords!';
    } else if (!keywordArr.every(k => new RegExp(/^[A-Z]{1,}.*/).test(k.trim()))) {
        error = 'Meta keywords must begin with upper case letter';
    }
    return error;
}

module.exports = {
    validatePostTitle,
    validateHeaderImageURL,
    validateMetaDesc,
    validateMetaKeywords,
    validatePostBody
};
