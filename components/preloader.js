import React from 'react';

function Preloader() {
    return (
        <div id='loader-wrapper'>
            <div className='loader-img'>
                <img src='../static/png/logo.png' alt='preloader' />
            </div>
            <div className='loader-section section-left'></div>
            <div className='loader-section section-right'></div>
        </div>
    );
}

export default Preloader;
