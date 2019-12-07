import React, { useState } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import actions from '../../redux/actions/index';

import '../../css/dashboard/post.css';

const Post = props => {
    const { _id, title,
        postedDate, published,
        headerImageURL,
    } = props.post;

    let [loading, setLoading] = useState(false);

    const getPostedDate = () => {
        const d = new Date(postedDate);
        let hrs = d.getHours() + 1;
        let am = hrs >= 12 ? 'pm' : 'am';
        hrs = hrs > 12 ? hrs - 12 : hrs;
        let mins = d.getMinutes();
        mins = mins > 10 ? mins : `0${mins}`;

        return `${d.toDateString()}, ${hrs}:${mins} ${am}`;
    };

    const togglePublish = () => {
        setLoading(true);
        props.dispatch(actions.dashboardActions.togglePublish({
            _id, published: published === 0 ? 1 : 0
        })).then(() => setLoading(false));
    };

    const handlePreview = () => {
        window.open(`/preview/${_id}`, '_blank');
    };

    return (
        <div className='dashboard-post row mx-auto'>
            <div className='dashboard-post-header-img-container col-lg-3 col-md-3 col-3 mx-auto'>
                <img src={headerImageURL} crossOrigin='anonymous' className='post-header-img' />
            </div>
            <div className='dashboard-post-content-container col-lg-9 col-md-9 col-9'>
                <div className='row col-lg-12 col-md-12 col-12'>
                    <Link href={`/dashboard/edit/${_id}`}>
                        <a><h3>{title}</h3></a>
                    </Link>
                </div>
                <div className='row col-lg-12 col-md-12 col-12 posted-date'>
                    <b>Written on:</b>&nbsp;&nbsp;{getPostedDate()}
                </div>
                <div className='row col-lg-12 col-md-12 col-12 actions'>
                    <ul>
                        <li>
                            <FontAwesomeIcon 
                                icon={published ? faEyeSlash: faEye} 
                                className={'toggle-publish' + (loading ? ' toggle-wait': '')}
                                title={published ? 'Unpublish': 'Publish'}
                                onClick={loading ? null : togglePublish}
                            />
                        </li>
                        <li>
                            <FontAwesomeIcon 
                                className='preview'
                                icon={faExternalLinkAlt} 
                                title={'Preview'}
                                onClick={handlePreview}
                            />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default connect(null, null)(Post);
