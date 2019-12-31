import $ from 'jquery';
import baseURL from '../constants/apiURL';

function noop() {}

export default (blob, filename, { cbOnProgress=noop, cbOnError=noop, cbOnComplete=noop }) => {
    const formData = new FormData();
    formData.append('file', blob, filename);
    $.ajax({
        type: 'POST',
        url: baseURL + '/api/dashboard/uploadMedia',
        data: formData,
        processData: false,
        contentType: false,
        xhr: () => {
            const xhr = new window.XMLHttpRequest();
            xhr.upload.addEventListener('progress', cbOnProgress, false);
            xhr.addEventListener("error", cbOnError, false);
            return xhr;
        }
    }).done(resp => {
        cbOnComplete(resp);
    }).catch(err => {
        console.error('Upload media failed:', err);
        cbOnError(err);
    });
};
