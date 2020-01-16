import React from 'react';
import { connect } from 'react-redux';

import PostTile from './postTile';

import '../css/searchResults.css';

function SearchResults(props) {
    const { searchResults } = props.search;
    const { admin } = props.auth;

    const noResultsPlaceholder = (
        <div className='no-search-results col-md-10 offset-md-1'>
            <h3>No results found!</h3>
            <div className='col container mx-auto no-data-img-container'>
                <img src='../static/svg/no_data.svg' className='no-data-img' />
            </div>
        </div>
    );

    return (
        <div className='row search-results-container'>
            {
                searchResults.length ? 
                searchResults.map(s => <PostTile post={s} key={s._id} adminButtons={admin} />)
                : noResultsPlaceholder
            }
        </div>
    );
}

export default connect(state => state)(SearchResults);
