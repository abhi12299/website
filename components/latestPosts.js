import React from 'react';
import { connect } from 'react-redux';

import PostTileV2 from './postTileV2';
import LoadingSVG from './loadingSVG';

function LatestPosts(props) {
    const { data, loading } = props;

    const loader = (
        <div style={{textAlign: 'center'}}>
            <LoadingSVG 
                width='50px'
                height='50px'
                text='Please wait...' 
            />
        </div>
    );

    return (
        <div className='container' style={{ padding: '50px 0px' }}>
            <div className='row'>
                <div className='col-sm-12 text-center' style={{ marginBottom: '50px' }}>
                    <h1>Latest Posts</h1>
                </div>
            </div>
            <div className='row'>
                <div className='col-sm-12'>
                    {
                        loading ? loader :
                        data.map(post => (
                            <PostTileV2 post={post} key={post._id} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default connect(state => state.posts)(LatestPosts);
