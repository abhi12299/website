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
import { getCookie, removeCookie } from '../utils/cookies';

const perPage = 10;
const SearchPage = props => {
    const router = useRouter();
    let [pageNo, setPageNo] = useState(1);

    useEffect(() => {
        if (props.auth.initiateForceLogout) {
            props.dispatch(actions.authActions.logout());
            return;
        }

        if (props.notAdminError) {
            removeCookie('notAdmin');
            setTimeout(() => showToast('You are not an administrator!', 'error'), 500);
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
            <title>{decodeURI(q)} - Search Results | AM Web Developer</title>
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
    const notAdminError = getCookie('notAdmin', ctx.req);

    await ctx.store.dispatch(actions.authActions.authenticate(ctx.req));
    await ctx.store.dispatch(actions.searchActions.search(ctx, perPage));

    return { notAdminError: !!notAdminError };
}

export default connect(state => state)(SearchPage);
