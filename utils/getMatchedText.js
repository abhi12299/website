// returns html for matching phrase in searchText and some chars before and after it
const getMatchedText = (phrase, searchText) => {
    const MAX_CHARS = 100;
    let phraseIndex = searchText.search(new RegExp(phrase, 'ig'));
    if (phraseIndex < 0) {
        // just return first 100 chars of the searchText
        return `${searchText.substr(0, MAX_CHARS)}...`;
    }
    let phraseInText = searchText.substr(phraseIndex, phrase.length);

    if (phraseIndex + phrase.length < MAX_CHARS) {
        // if phrase is found in the first 100 chars summed up with the phrase itself
        // return the first 100 chars with <b></b> around found text
        return `${searchText.substr(0, MAX_CHARS).replace(phraseInText, `<b>${phraseInText}</b>`)}...`;
    }
    let phraseLength = phraseInText.length;
    let firstSubstr = (MAX_CHARS - phraseLength) / 2;
    return `${searchText.substr(0, firstSubstr)}... ${searchText.substr(phraseIndex - 15, phrase.length + 15).replace(phraseInText, `<b>${phraseInText}</b>`)}...`;
};

export default getMatchedText;
