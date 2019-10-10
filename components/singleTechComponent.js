import React from 'react';
import PropTypes from 'prop-types';

function SingleTechStack(props) {
    const { tech, image } = props;

    return (
        <div className='col-lg-4 col-md-4 col-sm-4 col-4'>
            <div className='single-brand-item d-table'>
                <div className='d-table-cell text-center'>
                    <img crossOrigin='anonymous' src={image} alt={tech} title={tech} />
                </div>
            </div>
        </div>
    );
}

SingleTechStack.propTypes = {
    tech: PropTypes.string.isRequired
};

export default SingleTechStack;
