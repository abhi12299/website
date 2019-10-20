import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { validateHeaderImageURL, validateMetaDesc } from '../../utils/validate';
import '../../css/dashboard/postSidebar.css';
import { SETHEADERIMAGE, SETMETADESC } from '../../redux/types';
import LoadingSVG from '../loadingSVG';

function PostSidebar(props) {
    const { headerImage, metaDescription } = props;
    
    let [imageLoading, setImageLoading] = useState(false);
    let [isImageValid, setIsImageValid] = useState(false);

    const headerImageInput = useRef();
    const headerImageError = useRef();
    const metaDescInput = useRef();
    const metaDescError = useRef();

    useEffect(() => {
        if (headerImage) {
            handleHeaderImageInputBlur();
        }
    }, []);

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

    const handleHeaderImageURLChange = e => props.dispatch({ type: SETHEADERIMAGE, payload: e.target.value });
    const handleMetaDescriptionChange = e => {
        props.dispatch({ type: SETMETADESC, payload: e.target.value });
    }

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
                    disabled={imageLoading}
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
                    ref={metaDescInput}
                    onChange={handleMetaDescriptionChange}
                    placeholder='Enter meta description here'
                    value={metaDescription}
                    onBlur={handleMetaDescInputBlur}
                    className='post-meta-desc'
                    maxLength='250'
                />
                <div className='counter'>
                    { metaDescription ? metaDescription.length : '--'} / 250
                </div>
                <small ref={metaDescError} className='errorText'></small>
            </div>
        </div>
    );
}

export default connect(state => state.dashboardPosts, null)(PostSidebar);
