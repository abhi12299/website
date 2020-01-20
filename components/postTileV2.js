import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faWhatsapp, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

import getDateParts from '../utils/getDateParts';
import socialShare from '../utils/socialShareLinks';

import '../css/postTileV2.css';

function PostTileV2(props) {
    const {
        _id, title, headerImageURL,
        metaKeywords, postedDate
    } = props.post;

    const dateObj = getDateParts(postedDate);
    const { facebook, whatsApp, linkedIn, twitter } = socialShare(_id);

    return (
        <article className='post-tile-v2'>
            <div className='entry-media float-right'>
                <Link href='/post/[id]' as={`/post/${_id}`}>
                    <a>
                        <img src={headerImageURL} alt='post-image' />
                    </a>
                </Link>
            </div>
            <div className='entry-meta-content float-left'>
                <Link href='/post/[id]' as={`/post/${_id}`}>
                    <a>
                        <h2 className='entry-title'>
                            {title}
                        </h2>
                    </a>
                </Link>
                <span className='entry-meta'>
                    {metaKeywords.join(', ')} <span>- </span>
                    {dateObj.month} {dateObj.date}, {dateObj.year}
                </span>
                <div className='entry-content-bottom'>
                    <Link href='/post/[id]' as={`/post/${_id}`}>
                        <a className='entry-read-more'>Read More</a>
                    </Link>
                    <ul className='social-share list-inline'>
                        <li className='list-inline-item'>
                            <a
                                href={facebook}
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
                                href={whatsApp}
                                target='_blank'
                            >
                                <FontAwesomeIcon
                                    icon={faWhatsapp}
                                    className='blog-ss-icons'
                                    title='Share to WhatsApp'
                                />
                            </a>
                        </li>
                        <li className='list-inline-item'>
                            <a
                                href={twitter}
                                target='_blank'
                            >
                                <FontAwesomeIcon
                                    icon={faTwitter}
                                    className='blog-ss-icons'
                                    title='Tweet'
                                />
                            </a>
                        </li>
                        <li className='list-inline-item'>
                            <a
                                href={linkedIn}
                                target='_blank'
                            >
                                <FontAwesomeIcon
                                    icon={faLinkedin}
                                    className='blog-ss-icons'
                                    title='Post to LinkedIn'
                                />
                            </a>
                        </li>
                    </ul>
                    <span className='entry-meta bold float-right'>Share</span>
                </div>
            </div>
        </article>
    );
}

export default PostTileV2;
