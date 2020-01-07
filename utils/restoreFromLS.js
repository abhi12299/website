export default (keyName='tempSavePost') => {
    return JSON.parse(localStorage.getItem(keyName));
}