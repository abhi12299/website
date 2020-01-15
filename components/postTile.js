import React, { Fragment } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import months from '../constants/months';
import baseURL from '../constants/apiURL';

import '../css/postTile.css';

const getDate = timestamp => {
    const d = new Date(timestamp);
    return { date: d.getDate(), month: months[d.getMonth()], year: d.getFullYear() };
};

function PostTile(props) {
    const {
        postedDate,
        _id,
        published,
        title,
        headerImageURL,
        metaDescription,
        metaKeywords
    } = props.post;
    const { adminButtons } = props;

    const dateObj = getDate(postedDate);

    const url = `${baseURL}/post/${_id}`;

    return (
        <div className='col-md-10 offset-md-1'>
            <article className='has-animation animate-in blog-post'>
                <div className='entry-meta-content'>
                    <div className='entry-date'>
                        {dateObj.date} <span>{dateObj.month} {dateObj.year}</span>
                    </div>
                    <h2 className='entry-title'>
                        {title}
                    </h2>
                    <span className='entry-meta'>
                        {metaKeywords.map((mk, i) => (
                            <span className='meta-tags' key={i}>#{mk}</span>
                        ))}
                    </span>
                </div>
                <div className='entry-media'>
                    <img src={headerImageURL} alt='title for post' />
                </div>
                <div className='entry-content-bottom'>
                    <p className='entry-content'>{metaDescription}</p>
                    <Link href='/post/something'>
                        <a className='entry-read-more'>
                            <span></span>
                            Read More
                        </a>
                    </Link>
                    {
                        published === 1 &&
                        <Fragment>
                            <ul className='blog-social-share list-inline'>
                                <li className='list-inline-item'>
                                    <a
                                        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
                                        target='_blank'
                                    >
                                        <FontAwesomeIcon
                                            icon={faFacebook}
                                            className='blog-ss-icons'
                                            title='Share to FB'
                                        />
                                    </a>
                                </li>
                                <li className='list-inline-item'>
                                    <a
                                        href={`whatsapp://send?text=${url}`}
                                        target='_blank'
                                    >
                                        <FontAwesomeIcon
                                            icon={faWhatsapp}
                                            className='blog-ss-icons'
                                        />
                                    </a>
                                </li>
                            </ul>
                            <span className='entry-meta bold float-right'>
                                Share
                            </span>
                        </Fragment>
                    }

                </div>
            </article>
        </div>
    );
}

export default PostTile;
