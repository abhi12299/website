import React, { useRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Editor } from '@tinymce/tinymce-react';

import UploadMediaButton from './uploadMediaButton';

import apiKeys from '../../constants/apiKeys';
import { validatePostTitle, validatePostBody } from '../../utils/validate';
import { SETTITLE, SETBODY } from '../../redux/types';

import '../../css/dashboard/postEditor.css';

function PostEditor(props) {
    const { title, body, postRestored, saving, lsKeyName } = props;

    const titleInput = useRef();
    const titleError = useRef();
    const bodyError = useRef();

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
        props.dispatch({ type: SETBODY, payload: editor.getContent(), keyName: lsKeyName });

    const handleTitleChange = e => 
        props.dispatch({ type: SETTITLE, payload: e.target.value, keyName: lsKeyName });

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
                <div className='my-auto'>
                    <UploadMediaButton />
                </div>
            </div>
            <Editor
                className='mceNoEditor'
                apiKey={apiKeys ? apiKeys.TINY_MCE_API_KEY : ''}
                init={{
                    height: 570,
                    plugins: [
                        'advlist autolink lists link codesample image charmap print anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect blockquote | bold italic backcolor | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | removeformat | help',
                    menubar: 'file edit view insert format tools table tc help',
                    autosave_ask_before_unload: true,
                    codesample_languages: [
                        {text: 'HTML/XML', value: 'markup'},
                        {text: 'JavaScript', value: 'javascript'},
                        {text: 'CSS', value: 'css'},
                        {text: 'PHP', value: 'php'},
                        {text: 'Ruby', value: 'ruby'},
                        {text: 'Python', value: 'python'},
                        {text: 'Java', value: 'java'},
                        {text: 'C', value: 'c'},
                        {text: 'C#', value: 'csharp'},
                        {text: 'C++', value: 'cpp'},
                        {text: 'Go', value: 'go'},
                        {text: 'Bash', value: 'bash'},
                        {text: 'Docker', value: 'docker'},
                        {text: 'HTTP', value: 'http'},
                        {text: 'Markdown', value: 'markdown'},
                        {text: 'React', value: 'jsx'}
                    ]
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
