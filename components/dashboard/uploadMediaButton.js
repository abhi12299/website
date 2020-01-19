import React, { useState, useRef, Fragment } from 'react';
import dynamic from 'next/dynamic';

import PropTypes from 'prop-types';

const ImageCropper = dynamic(() => import('./imageCropper'), { ssr: false });

import checkfileType from '../../utils/checkfileType';
import { showToast } from '../../utils/toasts';
import uploadMedia from '../../utils/uploadMedia';
import copyToClipboard from '../../utils/copyToClipboard';
import baseURL from '../../constants/apiURL';

import '../../css/dashboard/uploadMediaButton.css';

function noop() {}
let filename = '';

function UploadMediaButton(props) {
    const { onUploadComplete=noop } = props;

    let [isMediaUploading, setIsMediaUploading] = useState(false);
    let [imageBlob, setImageBlob] = useState('');

    const mediaUploadInput = useRef();
    const uploadStatusRef = useRef();

    const handleMedia = e => {
        const { files } = e.target;
        if (files && files.length > 0) {
            const file = files[0];
            const type = checkfileType(file);
            filename = file.name;
            switch(type) {
                case 'image-svg':
                case'image-gif':
                    upload(file, filename);
                    break;
                case 'image':
                    let url;
                    if (URL) {
                        url = URL.createObjectURL(file);
                        setImageBlob(url);
                    } else if (FileReader) {
                        reader = new FileReader();
                        reader.onload = function (e) {
                            url = reader.result;
                            setImageBlob(url);
                        };
                        reader.readAsDataURL(file);
                    }
                    break;
                case 'video':
                    const fileSizeInMB = file.size * 1e-6;
                    if (fileSizeInMB >= 20) {
                        showToast('File size too large!', 'error');
                        return;
                    }
                    upload(file, filename);
                    break;
                default:
                    showToast('Unknown file type!', 'error');
            }
        }
    };

    const handleUploadProgress = e => {
        const percent = (e.loaded / e.total) * 100;
        const progress = Math.round(percent);
        uploadStatusRef.current.innerText = `${progress}% done`;
        setIsMediaUploading(true);
    };

    const handleUploadComplete = resp => {
        if (!resp.error) {
            const { path } = resp;
            copyToClipboard(baseURL + path);
            showToast('Upload successful! Link copied!', 'success');
        } else {
            showToast('Upload successful! Link could not be copied', 'info');
        }
        onUploadComplete();

        uploadStatusRef.current.innerText = 'Upload';
        mediaUploadInput.current.value = '';
        setIsMediaUploading(false);
    };

    const handleUploadError = () => {
        showToast('Upload failed!', 'error');
        uploadStatusRef.current.innerText = 'Upload';
        mediaUploadInput.current.value = '';
        setIsMediaUploading(false);
    };

    const upload = (blob, filename) => {
        if (blob) {
            const blobSizeInMB = blob.size * 1e-6;
            // imageCropper onComplete calls it directly
            // hence the check
            if (isBlobImage(blob) && blobSizeInMB >= 2) {
                showToast('File size too large!', 'error');
                mediaUploadInput.current.value = '';
                return;
            }
            uploadMedia(blob, filename, {
                cbOnProgress: handleUploadProgress,
                cbOnComplete: handleUploadComplete,
                cbOnError: handleUploadError
            });
        } else {
            showToast('Something went wrong!', 'error');
        }
    };

    const isBlobImage = blob => {
        const mimeType = blob.type;
        return /^image\/.*/i.test(mimeType);
    };

    const closeImageCropper = () => {
        setImageBlob('');
    };

    const handleImageCropCancel = () => {
        showToast('Upload cancelled!', 'info');
        mediaUploadInput.current.value = '';
    };

    return (
        <Fragment>
            <ImageCropper
                show={!!imageBlob} 
                blob={imageBlob}
                onClose={closeImageCropper} 
                onComplete={blob => upload(blob, filename)}
                onCancel={handleImageCropCancel}
            />
            <div className='media-upload-container'>
                <label className='media-upload-label my-auto'>
                    <input 
                        disabled={isMediaUploading}
                        ref={mediaUploadInput}
                        type='file' 
                        className='media-upload' 
                        onChange={handleMedia} 
                        accept='image/*, video/*' 
                    />
                    <span ref={uploadStatusRef}>Upload</span>
                </label>
            </div>
        </Fragment>
    );
};

UploadMediaButton.propTypes = {
    onUploadComplete: PropTypes.func
};

export default UploadMediaButton;
