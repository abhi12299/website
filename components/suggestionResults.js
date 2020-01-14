import React, { Fragment } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import getMatchedText from '../utils/getMatchedText';

import '../css/suggestionResults.css';

function SuggestionResults(props) {
    const { suggestions, adminButtons, searchQuery } = props;

    if (!suggestions) return null;

    return (
        <div className='search-suggestions-container'>
            { 
                suggestions.length === 0 &&
                <div className='search-suggestions-result'>
                    <p className='title'>No results found.. Try some different keywords</p>
                </div>
            }
            {
                suggestions.map(s => {
                    let postLink = (adminButtons && !s.published) ?
                        `/post/preview/${s._id}` :
                        `/post/${s._id}`;
                    const postBodyMatchedText = getMatchedText(searchQuery, s.body);
                    return (
                        <Fragment key={s._id}>
                            <div className='search-suggestions-result'>
                                <Link href={postLink}>
                                    <a>
                                        <h3 className='title'>
                                            {s.title}
                                            {
                                                adminButtons &&
                                                <p className={`search-publish-indicator ${s.published ? 'pub': 'unpub'}`}>
                                                    {s.published ? 'Published': 'Unpublished'}
                                                </p>
                                            }
                                        </h3>
                                        <p
                                            className='post-body-text'
                                            dangerouslySetInnerHTML={{ __html: postBodyMatchedText }}>
                                        </p>
                                    </a>
                                </Link>
                            </div>
                            <div className='sep' />
                        </Fragment>
                    );
                })
            }
        </div>
    );
}

SuggestionResults.propTypes = {
    suggestions: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        metaKeywords: PropTypes.arrayOf(PropTypes.string.isRequired),
        published: PropTypes.number,
        postedDate: PropTypes.number,
        body: PropTypes.string
    })),
    adminButtons: PropTypes.bool,
    searchQuery: PropTypes.string
};

export default SuggestionResults;
