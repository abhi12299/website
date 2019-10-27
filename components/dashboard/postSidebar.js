import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { 
    validateHeaderImageURL, 
    validateMetaDesc, 
    validateMetaKeywords
} from '../../utils/validate';
import '../../css/dashboard/postSidebar.css';
import { SETHEADERIMAGE, SETMETADESC, SETMETAKEYWORDS } from '../../redux/types';
import LoadingSVG from '../loadingSVG';

function PostSidebar(props) {
    const { headerImage, metaDescription, saving,
        metaKeywords, postRestored } = props;
    
    let [imageLoading, setImageLoading] = useState(false);
    let [isImageValid, setIsImageValid] = useState(false);

    const headerImageInput = useRef();
    const headerImageError = useRef();
    const metaDescInput = useRef();
    const metaDescError = useRef();
    const metaKeywordsInput = useRef();
    const metaKeywordsError = useRef();

    useEffect(() => {
        if (postRestored) {
            if (headerImage) {
                handleHeaderImageInputBlur();
            }
            if (metaDescription) {
                handleMetaDescInputBlur();
            }
            if (metaKeywords) {
                handleMetaKeywordsBlur();
            }
        }
    }, [postRestored]);

    const handleHeaderImageInputBlur = async () => {
        setImageLoading(true);
        const inputElement = headerImageInput.current;
        const errorElement = headerImageError.current;

        const url = inputElement.value.trim();
        const errorText = await validateHeaderImageURL(url);
        setImageLoading(false);
        if (errorText) {
            setIsImageValid(false);
            inputElement.classList.add('error');
            errorElement.classList.add('show');
            errorElement.innerText = errorText;
        } else {
            setIsImageValid(true);
            inputElement.classList.remove('error');
            errorElement.classList.remove('show');
            errorElement.innerText = '';
        }
    }

    const handleMetaDescInputBlur = () => {
        const inputElement = metaDescInput.current;
        const errorElement = metaDescError.current;

        const metaDesc = inputElement.value.trim();
        const errorText = validateMetaDesc(metaDesc);
        if (errorText) {
            inputElement.classList.add('error');
            errorElement.classList.add('show');
            errorElement.innerText = errorText;
        } else {
            inputElement.classList.remove('error');
            errorElement.classList.remove('show');
            errorElement.innerText = '';
        }
    }

    const handleMetaKeywordsBlur= () => {
        const inputElement = metaKeywordsInput.current;
        const errorElement = metaKeywordsError.current;

        const metaKeywords = inputElement.value.trim();
        const errorText = validateMetaKeywords(metaKeywords);
        if (errorText) {
            inputElement.classList.add('error');
            errorElement.classList.add('show');
            errorElement.innerText = errorText;
        } else {
            inputElement.classList.remove('error');
            errorElement.classList.remove('show');
            errorElement.innerText = '';
        }
    }

    const handleRemoveMetaKeyword = i => {
        const metaKeywordsArr = metaKeywords.split(',');
        metaKeywordsArr.splice(i, 1);
        const newMetaKeywords = metaKeywordsArr.join(',');
        props.dispatch({ type: SETMETAKEYWORDS, payload: newMetaKeywords });
        handleMetaKeywordsBlur();
    }

    const handleHeaderImageURLChange = e => 
        props.dispatch({ type: SETHEADERIMAGE, payload: e.target.value });
    const handleMetaDescriptionChange = e =>
        props.dispatch({ type: SETMETADESC, payload: e.target.value });
    const handleMetaKeywordsChange = e => 
        props.dispatch({ type: SETMETAKEYWORDS, payload: e.target.value });

    const headerImageURL = isImageValid ? headerImage : 'https://via.placeholder.com/200x170.png?text=Header+image+shown+here';
    return (
        <div className='col-lg-3 col-md-4 col-sm-12 sidebar-container'>
            <div className='post-header-image-container'>
                <input 
                    ref={headerImageInput}
                    type='text' 
                    className='post-header-image-url'
                    placeholder='Enter header image URL'
                    onBlur={handleHeaderImageInputBlur}
                    onChange={handleHeaderImageURLChange}
                    value={headerImage}
                    disabled={imageLoading || saving}
                />
                { imageLoading && <div className='loader-wait'><LoadingSVG width='20px' height='20px'/></div> }
                <small ref={headerImageError} className='errorText'></small>
                <div className='header-image-preview'>
                    <img alt='header-image' src={headerImageURL} className='header-img' />
                </div>
            </div>
            <hr />
            <div className='post-meta-desc-container'>
                <textarea 
                    disabled={saving}
                    ref={metaDescInput}
                    onChange={handleMetaDescriptionChange}
                    placeholder='Enter meta description here'
                    value={metaDescription || ''}
                    onBlur={handleMetaDescInputBlur}
                    className='post-meta-desc'
                    maxLength='250'
                />
                <div className='counter'>
                    { metaDescription ? metaDescription.length : '--'} / 250
                </div>
                <small ref={metaDescError} className='errorText'></small>
            </div>
            <div className='post-meta-keywords-container'>
                <textarea
                    disabled={saving}
                    ref={metaKeywordsInput}
                    onChange={handleMetaKeywordsChange}
                    placeholder='Enter meta keywords here (separated by comma)'
                    value={metaKeywords || ''}
                    onBlur={handleMetaKeywordsBlur}
                    className='post-meta-keywords-input'
                    maxLength='300'
                />
                <div className='post-meta-keywords-view row mx-auto'>
                    {
                        metaKeywords && 
                        (metaKeywords.split(',').map((k, i) => {
                            if (k.trim().length > 0) {
                                return (
                                    <div 
                                        className='post-meta-keyword col-lg-4 col-md-4 col-4 my-1' 
                                        key={k + i}
                                        onClick={saving ? null : () => handleRemoveMetaKeyword(i)}
                                    >
                                        <span>{k}</span>
                                        <span className='remove-keyword'>&times;</span>
                                    </div>
                                );
                            }
                            return null;
                        }))
                    }
                </div>
                <small ref={metaKeywordsError} className='errorText'></small>
            </div>
        </div>
    );
}

export default connect(state => state.dashboardPosts, null)(PostSidebar);
