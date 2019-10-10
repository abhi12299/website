import React from 'react';
import LoadingSVG from './loadingSVG';
import PropTypes from 'prop-types';

const FullScreenLoader = props => {
    const { text='Hang on!' } = props;

    return (
        <div className='d-flex flex-column align-items-center' style={{marginTop: '40vh'}}>
            <LoadingSVG text={text} width='80px' height='80px' />
        </div>
    );
}

FullScreenLoader.propTypes = {
    text: PropTypes.string
}

export default FullScreenLoader;
