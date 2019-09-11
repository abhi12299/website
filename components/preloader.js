import React from 'react';

import '../css/preloader.css';

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
