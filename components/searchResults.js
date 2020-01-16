import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import PostTile from './postTile';

import '../css/searchResults.css';

function SearchResults(props) {
    const { searchResults, count } = props.search;
    const { admin } = props.auth;
    const { page, perPage} = props;

    const noResultsPlaceholder = (
        <div className='no-search-results col-md-10 offset-md-1'>
            <div className='col container mx-auto no-data-img-container'>
                <img src='../static/svg/no_data.svg' className='no-data-img' />
                <h4>No results found!</h4>
            </div>
        </div>
    );

    const lowerLimit = (page - 1) * perPage + 1;
    const upperLimit = Math.min(count, (page - 1) * perPage + perPage);

    return (
        <div className='row search-results-container'>
            {
                searchResults.length ? 
                <Fragment>
                    <div className='col-md-10 offset-md-1'>
                        <h4 className='search-results-count-info'>
                            Showing Results {lowerLimit} to {upperLimit} of {count}
                        </h4>
                    </div>
                    {searchResults.map(s => <PostTile post={s} key={s._id} adminButtons={admin} />)}
                </Fragment>
                : noResultsPlaceholder
            }
        </div>
    );
}

export default connect(state => state)(SearchResults);
