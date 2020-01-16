import React, { Fragment } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

import PageLayout from '../components/pageLayout';

import '../css/error.css';

function Error(props) {
    let { statusCode = 404, title = 'Something went wrong!' } = props;
    let errorText = '';

    switch (statusCode) {
        case 404: errorText = 'Oops! That page could not be found!';
            break;

        case 500: errorText = 'Oops! There was some internal server error. Please try later.';
            break;

        default: errorText = 'Oops! Something went wrong.';
    }
    errorText = props.errorText || errorText;

    const metaTags = (
        <Fragment>
            <title>{title}</title>
        </Fragment>
    );

    return (
        <PageLayout
            headContent={metaTags}
        >
            <div className='main-body-content'>
                <section className='pad-75'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-sm-12 '>
                                <div className='notfound-wrapper pad-100 text-center'>
                                    <h1>{statusCode}</h1>
                                    <p>{errorText}</p>

                                    <div className='d-flex justify-content-center col-sm-12'>
                                        <div className='button-4'>
                                            <div className='eff-4'></div>
                                            <Link href='/' replace={true}>
                                                <a>Back To Home</a>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </PageLayout>
    );
}

// Error.getInitialProps = ({ res, err }) => {
//     const statusCode = res ? res.statusCode : err ? err.statusCode : null;
//     return { statusCode };
// }

Error.proptypes = {
    statusCode: PropTypes.number.isRequired,
    errorText: PropTypes.string,
    title: PropTypes.string.isRequired
};

export default Error;
