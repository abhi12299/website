export default (key, value, lsKeyName='tempSavePost') => {
  let tempSavePost = JSON.parse(localStorage.getItem(lsKeyName));
  if (!tempSavePost) {
    tempSavePost = {};
  }
  tempSavePost[key] = value;
  localStorage.setItem(lsKeyName, JSON.stringify(tempSavePost));
};
