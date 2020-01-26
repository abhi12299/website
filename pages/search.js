// common search page for dashboard and users
import React, { useEffect, useState, Fragment } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';

import PageLayout from '../components/pageLayout';
import AdminFAB from '../components/adminFAB';
import SearchResults from '../components/searchResults';
const Pagination = dynamic(() => import('../components/pagination'), { ssr: false });

import actions from '../redux/actions';

const perPage = 10;
const SearchPage = props => {
    const router = useRouter();
    let [pageNo, setPageNo] = useState(1);

    useEffect(() => {
        if (props.auth.initiateForceLogout) {
            props.dispatch(actions.authActions.logout());
            return;
        }
    }, []);

    useEffect(() => {
        let { page = 1 } = router.query;
        page = parseInt(page) || 1;
        page = page > 0 ? page : 1;
        setPageNo(page);
    }, [router.query]);

    const { q } = router.query;
    const { count } = props.search;

    const metaTags = (
        <Fragment>
            <title>{decodeURI(q)} - Search Results - Abhishek Mehandiratta | Web Developer</title>
            <link href='URL' rel='canonical' />
            <link rel='canonical' href='https://iabhishek.dev/search' />

            <meta name='description' content={`${count} Results For ${decodeURI(q)} - Abhishek Mehandiratta | Web Developer`} />
            <meta name='keywords' content={`Abhishek, Mehandiratta, Web, Development, Developer, Search, ${decodeURI(q)}`} />
            <meta name='author' content='Abhishek Mehandiratta' />

            <meta property='og:title' content={`${decodeURI(q)} - Search Results | Abhishek Mehandiratta Web Developer`} />
            <meta property='og:type' content='website' />
            <meta property='og:description' content={`${count} Results For ${decodeURI(q)} - Abhishek Mehandiratta | Web Developer`} />
            <meta property='og:image' content='https://iabhishek.dev/static/logo.png' />
            <meta property='og:url' content='https://iabhishek.dev/search' />

            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:site' content='@abhishek_m' />
            <meta name='twitter:creator' content='@abhishek_m' />
            <meta name='twitter:title' content={`${decodeURI(q)} - Search Results | Abhishek Mehandiratta Web Developer`} />
            <meta name='twitter:description' content={`${count} Results For ${decodeURI(q)} - Abhishek Mehandiratta | Web Developer`} />
        </Fragment>
    );

    return (
        <PageLayout
            headContent={metaTags}
        >
            {props.auth.admin && <AdminFAB />}
            <div className='container'>
                <SearchResults
                    page={pageNo}
                    perPage={perPage}
                />
                {
                    count > 0 &&
                    <Pagination
                        pageNo={pageNo}
                        perPage={perPage}
                        totalItems={count}
                    />
                }
            </div>
        </PageLayout>
    );
};

SearchPage.getInitialProps = async ctx => {
    await ctx.store.dispatch(actions.authActions.authenticate(ctx.req));
    await ctx.store.dispatch(actions.searchActions.search(ctx, perPage));

    return {};
}

export default connect(state => state)(SearchPage);
