import React from 'react';
import LoadingSVG from './loadingSVG';
import PropTypes from 'prop-types';

import '../css/fullScreenLoader.css';

const FullScreenLoader = props => {
    const { text='Hang on!', loading } = props;

    return (
        <div id='fs-loader' className={`${loading ? 'loading': 'loaded'}`}>
            <div className='fs-loader-svg d-flex flex-column align-items-center' style={{marginTop: '40vh'}}>
                <LoadingSVG text={text} width='80px' height='80px' />
            </div>
        </div>
    );
}

FullScreenLoader.propTypes = {
    text: PropTypes.string,
    loading: PropTypes.bool.isRequired
}

export default FullScreenLoader;
