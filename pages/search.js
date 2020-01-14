// common search page for dashboard and users
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';

import Preloader from '../components/preloader';
import Header from '../components/header';
import Footer from '../components/footer';
import AdminFAB from '../components/adminFAB';

import actions from '../redux/actions';
const Pagination = dynamic(() => import('../components/pagination'), { ssr: false });

const perPage = 10;
const SearchPage = props => {
    const router = useRouter();
    let [pageNo, setPageNo] = useState(1);

    useEffect(() => {
        let { page = 1 } = router.query;
        page = parseInt(page) || 1;
        page = page > 0 ? page : 1;
        setPageNo(page);
    }, [router.query]);

    const { q } = router.query;
    const { count } = props.search;

    return (
        <div>
            <Head>
                <title>{decodeURI(q)} - Search Results | AM Web Developer</title>
            </Head>
            <Preloader />
            <Header />
            {/* position relative needed for jquery scroll */}
            <div className='main-body-content' style={{ maxWidth: '100%', position: 'relative' }}>
                {props.auth.admin && <AdminFAB />}
                <div className='container'>
                    <Pagination
                        pageNo={pageNo}
                        perPage={perPage}
                        totalItems={count}
                    />
                </div>
                <Footer />
            </div>
        </div>
    );
};

SearchPage.getInitialProps = async ctx => {
    await ctx.store.dispatch(actions.authActions.authenticate(ctx.req));
    await ctx.store.dispatch(actions.searchActions.search(ctx, perPage));

    return {};
}

export default connect(state => state)(SearchPage);
