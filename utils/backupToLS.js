export default (key, value) => {
    let tempSavePost = JSON.parse(localStorage.getItem('tempSavePost'));
    if (!tempSavePost) {
      tempSavePost = {};
    }
    tempSavePost[key] = value;
    localStorage.setItem('tempSavePost', JSON.stringify(tempSavePost));
};
