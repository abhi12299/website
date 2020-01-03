import React, { useState } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import copyToClipboard from '../../utils/copyToClipboard';
import actions from '../../redux/actions/index';

import '../../css/dashboard/media.css';

const Media = props => {
    const { _id, usedInPosts,
        createdAt, url
    } = props.media;

    let [loading, setLoading] = useState(false);

    const getUploadedDate = () => {
        const d = new Date(createdAt);
        let hrs = d.getHours() + 1;
        let am = hrs >= 12 ? 'pm' : 'am';
        hrs = hrs > 12 ? hrs - 12 : hrs;
        let mins = d.getMinutes();
        mins = mins > 10 ? mins : `0${mins}`;

        return `${d.toDateString()}, ${hrs}:${mins} ${am}`;
    };

    const handlePreview = () => {
        window.open(url, '_blank');
    };

    return (
        <div className='col-'>
            I am a media
        </div>
    );
};

export default connect(null, null)(Media);
