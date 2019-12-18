import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';
import dynamic from 'next/dynamic';

import apiKeys from '../../constants/apiKeys';
import { validatePostTitle, validatePostBody } from '../../utils/validate';
import { SETTITLE, SETBODY } from '../../redux/types';
const ImageCropper = dynamic(() => import('./imageCropper.js'), { ssr: false });

import '../../css/dashboard/postEditor.css';

function PostEditor(props) {
    const { title, body, postRestored, saving } = props;
    let [imageBlob, setImageBlob] = useState('');

    const titleInput = useRef();
    const titleError = useRef();
    const bodyError = useRef();
    const mediaUploadInput = useRef();

    useEffect(() => {
        if (postRestored) {
            if (title) {
                handleTitleInputBlur();
            }
            if (body) {
                handleEditorBlur();
            }
        }
    }, [postRestored]);

    const handleTitleInputBlur = () => {
        const titleElem = titleInput.current;
        const errorElem = titleError.current;

        const title = titleElem.value.trim();
        const errorMsg = validatePostTitle(title);
        if (errorMsg) {
            titleElem.classList.add('error');
            errorElem.classList.add('show');
            errorElem.innerText = errorMsg;
        } else {
            titleElem.classList.remove('error');
            errorElem.classList.remove('show');
            errorElem.innerText = '';
        }
    }

    const handleEditorBlur = () => {
        const errorElem = bodyError.current;

        const errorMsg = validatePostBody(body);
        if (errorMsg) {
            errorElem.classList.add('show');
            errorElem.innerText = errorMsg;
        } else {
            errorElem.classList.remove('show');
            errorElem.innerText = '';
        }
    }

    const handleEditorChange = (e, editor) =>
        props.dispatch({ type: SETBODY, payload: editor.getContent()});

    const handleTitleChange = e => 
        props.dispatch({ type: SETTITLE, payload: e.target.value });

    const handlePostMedia = e => {
        const { files } = e.target;
        if (files && files.length > 0) {
            const file = files[0];
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
        }
    };

    const closeImageCropper = () => {
        setImageBlob('');
    }
    
    const uploadImage = blob => {
        if (blob) {
            console.log('Cropped image blob received:', blob);
            // at the end, clear file upload input field
        } else {
            // toast error!
        }
        mediaUploadInput.current.value = '';
    }

    const handleImageCropCancel = () => {
        // clear file upload input field
        mediaUploadInput.current.value = '';
    };

    return (
        <div className='col-lg-9 col-md-8 col-sm-12 editor-container'>
            <div className='post-title-container'>
                <h3>
                    <input 
                        ref={titleInput}
                        placeholder='Title'
                        type='text' 
                        className='post-title' 
                        onBlur={handleTitleInputBlur}
                        onChange={handleTitleChange}
                        value={title}
                        disabled={saving}
                    />
                </h3>
                <small ref={titleError} className='errorText'></small>
                <div className='my-auto post-media-upload-container'>
                    <label className='post-media-upload-label my-auto'>
                        <input 
                            disabled={false}
                            ref={mediaUploadInput}
                            type='file' 
                            className='post-media-upload' 
                            onChange={handlePostMedia} 
                            accept='image/*' 
                        />
                        <span>Upload</span>
                    </label>
                </div>
            </div>
            <ImageCropper 
                show={!!imageBlob} 
                blob={imageBlob}
                onClose={closeImageCropper} 
                onComplete={uploadImage}
                onCancel={handleImageCropCancel}
            />
            <Editor
                apiKey={apiKeys ? apiKeys.TINY_MCE_API_KEY : ''}
                init={{
                    height: 570,
                    plugins: [
                        'advlist autolink lists link codesample image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect blockquote | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help',
                    menubar: 'file edit view insert format tools table tc help',
                    autosave_ask_before_unload: true
                }}
                onChange={handleEditorChange}
                onKeyUp={handleEditorChange}
                initialValue={body}
                onBlur={handleEditorBlur}
                disabled={saving}
            />
            <small ref={bodyError} className='errorText'></small>
        </div>
    );
}

export default connect(state => state.dashboardPost, null)(PostEditor);
