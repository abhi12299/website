import React from 'react';
import { connect } from 'react-redux';

import PostTile from './postTile';

function SearchResults(props) {
    const { searchResults } = props.search;
    const { admin } = props.auth;

    return (
        <div className='row'>
            {
                searchResults.map(s => <PostTile post={s} key={s._id} adminButtons={admin} />)
            }
        </div>
    );
}

export default connect(state => state)(SearchResults);
