import React, { Fragment } from 'react';

import PostTile from './postTile';
import LoadingSVG from './loadingSVG';

function AllBlogs(props) {
    const { data, loading, adminButtons } = props;

    const noBlogsPlaceholder = (
        <div className='col-md-10 offset-md-1'>
            <div style={{maxWidth: '50%'}} className='col container text-center mx-auto no-data-img-container'>
                <img src='../static/svg/no_data.svg' className='no-data-img' />
                <h4>No Blogs! Stay tuned!</h4>
            </div>
        </div>
    );

    const loader = (
        <div 
            className='mx-auto'
            style={{ 
                textAlign: 'center',
                height: '50vh',
                width: '50vw',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <LoadingSVG
                width='70px'
                height='70px'
                text='Please wait...'
            />
        </div>
    );

    return (
        <div className='container'>
            <div className='row'>
                {
                    loading ?
                        loader :
                        (
                            data.length ?
                                <Fragment>
                                    <div 
                                        style={{paddingTop: '25px', paddingBottom: '20px', fontFamily: 'PoppinsBold'}}
                                        className='col-md-10 offset-lg-1 offset-md-1 text-center'
                                    >
                                        <h2>
                                            ALL BLOGS
                                        </h2>
                                    </div>
                                    {
                                        data.map(s => (
                                            <PostTile
                                                post={s}
                                                key={s._id}
                                                adminButtons={adminButtons}
                                            />
                                        ))
                                    }
                                </Fragment>
                                : noBlogsPlaceholder
                        )
                }
            </div>
        </div>
    );
}

export default AllBlogs;
