import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import Footer from './footer';
import Header from './header';
import IntroHeader from './introHeader';
import Preloader from './preloader';

function PageLayout(props) {
    const {
        headContent
    } = props;

    const { pathname } = useRouter();
    const toShowIntroHeader = pathname === '/';

    return (
        <Fragment>
            <Head>
                {headContent}
            </Head>
            <Preloader />
            {toShowIntroHeader && <IntroHeader />}
            <Header />
            {/* position relative needed for jquery scroll */}
            <div className='main-body-content' style={{ maxWidth: '100%', position: 'relative' }}>
                {props.children}
            </div>
            <Footer />
        </Fragment>
    );
}

export default PageLayout;
