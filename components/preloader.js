import React from 'react';

function Preloader() {
    return (
        <div id='loader-wrapper'>
            <div className='loader-img'>
                <img crossOrigin='anonymous' src='https://res.cloudinary.com/dmzk3uux3/image/upload/fl_progressive/v1570726311/portfolio/png/logo_nydoag.png' alt='preloader' />
            </div>
            <div className='loader-section section-left'></div>
            <div className='loader-section section-right'></div>
        </div>
    );
}

export default Preloader;
