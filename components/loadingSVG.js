import React from 'react';
import PropTypes from 'prop-types';

function LoadingSVG(props) {
    const { width = '20', height='20', className } = props;

    return (
        <div style={{maxWidth: width, maxHeight: height}} className={className}>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid' className='lds-rolling'>
            <circle cx='50' cy='50' fill='none' stroke='#3be8b0' strokeWidth='6' r='35' strokeDasharray='164.93361431346415 56.97787143782138' transform='rotate(4.72781 50 50)'>
                <animateTransform attributeName='transform' type='rotate' calcMode='linear' values='0 50 50;360 50 50' keyTimes='0;1' dur='2.5s' begin='0s' repeatCount='indefinite'></animateTransform>
            </circle>
        </svg>
        </div>
    );
}

LoadingSVG.propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired
};

export default LoadingSVG;
