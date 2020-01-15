import React from 'react';
import { connect } from 'react-redux';

import PostTile from './postTile';

function SearchResults(props) {
    const { searchResults } = props.search;

    return (
        <div className='row'>
            {
                searchResults.map(s => <PostTile post={s} key={s._id} />)
            }
        </div>
    );
}

export default connect(state => state)(SearchResults);
