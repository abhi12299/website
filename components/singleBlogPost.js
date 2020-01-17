import React from 'react';

import months from '../constants/months';
import '../css/singleBlogPost.css';

const getFormattedDate = timestamp => {
    const d = new Date(timestamp);
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

// NOTE TO SELF: always wrap images in a div with class img-wrapper
function SingleBlogPost(props) {
    const { _id,
        postedDate,
        published,
        title,
        headerImageURL,
        body,
        metaKeywords
    } = props.blogPost;

    const { url, enableComments } = props;

    const fbShareURL = published ? `https://www.facebook.com/sharer/sharer.php?u=${url}` : '';
    const whatsappShareURL = published ? `whatsapp://send?text=${url}` : '';
    const twitterShareURL = published ? `https://twitter.com/share?url=${url}` : '';
    const linkedInShareURL = published ? `http://www.linkedin.com/shareArticle?mini=true&url=${url}` : '';

    return (
        <section className='single-post pad-50'>
            <div className='container'>
                <div className='row'>
                    {/* Part 1 title and meta */}
                    <div className='col-lg-8 offset-lg-2'>
                        <div className='entry-header text-left'>
                            <h4 className='entry-meta style2'>
                                Abhishek Mehandiratta <span></span>
                                {getFormattedDate(postedDate)}
                            </h4>
                            <h1 className='entry-title'>{title}</h1>
                        </div>
                    </div>
                    {/* Part 2 header image */}
                    <div className='col-lg-12'>
                        <div className='entry-media'>
                            <img src={headerImageURL} alt='header image' />
                        </div>
                    </div>
                    {/* Part 3 content */}
                    <div className='col-lg-8 offset-lg-2 bottom-border'>
                        <div className='entry-content' dangerouslySetInnerHTML={{ __html: body }}>
                        </div>
                        <div className='entry-share-div'>
                            <h5>Share :</h5>
                            <ul className='social-text light list-inline'>
                                <li className='list-inline-item'>
                                    <a target='_blank' className='text-facebook' href={fbShareURL}>
                                        Facebook
                                    </a>
                                </li>
                                <li className='list-inline-item'>
                                    <a target='_blank' className='text-twiiter' href={twitterShareURL}>
                                        Twitter
                                    </a>
                                </li>
                                <li className='list-inline-item'>
                                    <a target='_blank' className='text-linkedin' href={linkedInShareURL}>
                                        Linkedin
                                    </a>
                                </li>
                                <li className='list-inline-item'>
                                    <a target='_blank' className='text-whatsapp' href={whatsappShareURL}>
                                        Whatsapp
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className='entry-share-div'>
                            <h5>Tag :</h5>
                            <ul className='taglist list-inline'>
                                {
                                    metaKeywords.map(mk => (
                                        <li key={mk} className='list-inline-item'>
                                            <a>
                                                {mk}
                                            </a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    {/* Part 4 Comments */}
                    {
                        enableComments &&
                        <div className='col-lg-8 offset-lg-2 comments-section'>
                            <div
                                data-mobile={true}
                                className='fb-comments'
                                data-width='100%'
                                data-numposts='5'>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </section>
    );
}

export default SingleBlogPost;
