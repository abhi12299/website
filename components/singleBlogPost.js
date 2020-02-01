import React, { useEffect } from 'react';

import socialShare from '../utils/socialShareLinks';
import getDateParts from '../utils/getDateParts';
import keys from '../constants/apiKeys';

import '../css/singleBlogPost.css';

const getFormattedDate = timestamp => {
    const d = getDateParts(timestamp);
    return `${d.date} ${d.month} ${d.year}`;
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

    useEffect(() => {
        if (!enableComments) {
            return;
        }
        const widgetpackScript = document.createElement('script');
        widgetpackScript.innerHTML = `
          wpac_init = window.wpac_init || [];
          wpac_init.push({widget: 'Comment', id: ${keys.WIDGETPACK_PLUGIN_ID}});
          (function() {
            //   if ('WIDGETPACK_LOADED' in window) return;
              WIDGETPACK_LOADED = true;
              var mc = document.createElement('script');
              mc.type = 'text/javascript';
              mc.async = true;
              mc.src = 'https://embed.widgetpack.com/widget.js';
              var s = document.getElementsByTagName('script')[0];
              s.parentNode.insertBefore(mc, s.nextSibling);
          })();
        `;
        document.body.appendChild(widgetpackScript);

        return () => {
            document.body.removeChild(widgetpackScript);
        };
    }, []);

    const { enableComments } = props;

    const { facebook, whatsApp, linkedIn, twitter } = socialShare(_id);

    return (
        <section className='single-post pad-50'>
            <div className='container'>
                <div className='row'>
                    {/* Part 1 title and meta */}
                    <div className='col-lg-8 offset-lg-2'>
                        <div className='entry-header text-left'>
                            <h4 className='entry-meta style2'>
                                Abhishek Mehandiratta<span></span>
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
                                    <a target='_blank' className='text-facebook' href={facebook}>
                                        Facebook
                                    </a>
                                </li>
                                <li className='list-inline-item'>
                                    <a target='_blank' className='text-twiiter' href={twitter}>
                                        Twitter
                                    </a>
                                </li>
                                <li className='list-inline-item'>
                                    <a target='_blank' className='text-linkedin' href={linkedIn}>
                                        Linkedin
                                    </a>
                                </li>
                                <li className='list-inline-item'>
                                    <a target='_blank' className='text-whatsapp' href={whatsApp}>
                                        Whatsapp
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className='entry-share-div'>
                            <h5>Tags :</h5>
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
                            <div id="wpac-comment"></div>
                        </div>
                    }
                </div>
            </div>
        </section>
    );
}

export default SingleBlogPost;
