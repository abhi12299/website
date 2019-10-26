import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { 
    validateHeaderImageURL, 
    validateMetaDesc, 
    validateMetaKeywords,
    validatePostTitle,
    validatePostBody
} from '../../utils/validate';
import '../../css/dashboard/saveButtons.css';
import LoadingSVG from '../loadingSVG';
import { showToast } from '../../utils/toasts';
import { dashboardActions } from '../../redux/actions';
import transformMetaKeywords from '../../utils/transformMetaKeywords';

function SaveButton(props) {
    const { 
        headerImage, 
        metaDescription, 
        metaKeywords,
        title,
        saving,
        body,
    } = props;

    const handleSavePost = async () => {
        let errorText = '';
        errorText = await validateHeaderImageURL(headerImage);
        if (errorText) {
            showToast(errorText, 'error')
            return;
        }
        errorText = await validatePostBody(body);
        if (errorText) {
            showToast(errorText, 'error')
            return;
        }
        errorText = validateMetaDesc(metaDescription);
        if (errorText) {
            showToast(errorText, 'error')
            return;
        }
        errorText = validatePostTitle(title);
        if (errorText) {
            showToast(errorText, 'error')
            return;
        }
        errorText = validateMetaKeywords(metaKeywords);
        if (errorText) {
            showToast(errorText, 'error')
            return;
        }
        console.log(transformMetaKeywords(metaKeywords));
        // await dashboardActions.savePost({
        //     title, body, metaDescription,
        //     headerImage, metaKeywords
        // });
    }

    return (
        <div className='col-lg-12 col-md-12 col-sm-12 save-container'>
            <div className={'button-4 mx-auto' + (saving ? ' no-cursor' : '')} onClick={saving ? null : handleSavePost}>
                {
                    saving ?
                        (
                            <LoadingSVG width='43' height='43' />
                        )
                    :
                        (
                            <>
                                <div className='eff-4' />
                                <a>
                                    <FontAwesomeIcon icon={faBookmark} /> &nbsp;&nbsp;
                                    Save Post
                                </a>
                            </>
                        )
                }
            </div>
        </div>
    );
}

export default connect(state => state.dashboardPosts, null)(SaveButton);
