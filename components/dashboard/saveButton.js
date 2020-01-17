import React, { useState } from 'react';
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
import generateIdFromPosiTitle from '../../utils/generateIdFromPostTitle';
import '../../css/dashboard/saveButtons.css';
import LoadingSVG from '../loadingSVG';
import Modal from '../modal';
import { showToast } from '../../utils/toasts';
import actions from '../../redux/actions';
import transformMetaKeywords from '../../utils/transformMetaKeywords';

function SaveButton(props) {
    const { 
        headerImage, 
        metaDescription, 
        metaKeywords,
        title,
        saving,
        body,
        type='save',
        _id,
        lsKeyName
    } = props;

    let [showTitleChangeModal, setShowTitleChangeModal] = useState(false);

    const isTitleChanged = () => {
        // if _id differs from generatedId using the current title, return true
        const tempId = generateIdFromPosiTitle(title);
        return type === 'edit' && tempId !== _id;
    };

    const dispatchEditPostAction = (keepOldId=true) => {
        props.dispatch(actions.dashboardActions.editPost({
            title, body, metaDescription, headerImageURL: headerImage,
            metaKeywords: transformMetaKeywords(metaKeywords), _id
        }, lsKeyName, keepOldId));
    };

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
        if (type === 'save') {
            props.dispatch(actions.dashboardActions.savePost({
                title, body, metaDescription, headerImageURL: headerImage,
                metaKeywords: transformMetaKeywords(metaKeywords)
            }));
        } else if (type === 'edit') {
            // bring up the modal if title differs
            if (isTitleChanged()) {
                setShowTitleChangeModal(true);
            } else {
                dispatchEditPostAction();
            }   
        }
    }

    return (
        <>
        <Modal 
            maxWidth='50%'
            show={showTitleChangeModal}
            title='Alert!'
            positiveActionButtonName='Yes, keep the old id'
            negativeActionButtonName='No, change the id'
            onPositiveAction={() => dispatchEditPostAction(true)}
            onNegativeAction={() => dispatchEditPostAction(false)}
            onClose={() => {
                setShowTitleChangeModal(false);
                // to remove loading indicator from save btn
                props.dispatch(actions.dashboardActions.changePostSaveLoading(false));
            }}
            triggerActionOnDismiss={false}
        >
            <p>
                The post has a new title. This means that the id for this post will change.
                I suggest keeping the same id and just updating the title and the rest of the contents.
                Do you want to keep the old id?
                <br />
                <small className='text-danger'>* Please note that changing the id will have its implications!</small>
            </p>
        </Modal>
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
        </>
    );
}

export default connect(state => state.dashboardPost, null)(SaveButton);
