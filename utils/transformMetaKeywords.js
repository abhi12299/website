function transformMetaKeywords(keywordString) {
    let keywords = keywordString.split(',');
    keywords = keywords.filter(k => k.trim().length > 0);
    return keywords.map(k => k.trim());
}

export default transformMetaKeywords;