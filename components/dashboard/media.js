import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { faCopy, faTrashAlt } from '@fortawesome/free-regular-svg-icons';

import copyToClipboard from '../../utils/copyToClipboard';
import { showToast } from '../../utils/toasts';

import '../../css/dashboard/media.css';

const Media = props => {
    const { 
        _id, 
        usedInPublishedPosts, 
        url, 
        usedInUnpublishedPosts
    } = props.media;

    const { 
        deleteMediaLoading,
        onDeleteClick
    } = props;

    const handlePreview = () => {
        window.open(url, '_blank');
    };

    const handleCopyLink = () => {
        copyToClipboard(url);
        showToast('Link copied!', 'success');
    };

    return (            
        <div className='col-lg-3 col-6 media-card'>
            <div className='card'>
                <img className='card-img-top media-card-img' src={url} alt='Card image cap' onClick={handlePreview} />
                <div className='card-body row c2a-btns mx-auto'>
                    <div className='col-6' title='Used In Published Posts'>
                        <FontAwesomeIcon icon={faThumbtack} />
                        <sup>(P)</sup>
                        &nbsp;{usedInPublishedPosts}
                    </div>
                    <div className='col-6' title='Used In Unpublished Posts'>
                        <FontAwesomeIcon icon={faThumbtack} />
                        <sup>(Up)</sup>
                        &nbsp;{usedInUnpublishedPosts}
                    </div>
                    <div className='col-6'>
                        <FontAwesomeIcon 
                            icon={faCopy} 
                            className={`media-copy-btn ${deleteMediaLoading ? 'disabled': ''}`} 
                            title='Copy link' 
                            onClick={handleCopyLink}
                        />
                    </div>
                    <div className='col-6'>
                        <FontAwesomeIcon 
                            icon={faTrashAlt} 
                            className={`media-delete-btn ${deleteMediaLoading ? 'disabled': ''}`} 
                            title='Delete' 
                            onClick={deleteMediaLoading ? null: () => onDeleteClick(_id)} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Media;
