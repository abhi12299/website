/**
 * @param { Object } req Express request object
 */
module.exports = req => {
    const { headers, cookies, body } = req;
    return { headers, cookies, body };
}
