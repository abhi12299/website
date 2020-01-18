// common search page for dashboard and users
import React, { useEffect, useState, Fragment } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';

import PageLayout from '../components/pageLayout';
import AdminFAB from '../components/adminFAB';
import AllBlogs from '../components/allBlogs';
const Pagination = dynamic(() => import('../components/pagination'), { ssr: false });

import actions from '../redux/actions';

const perPage = 10;
const Blog = props => {
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

    const { loading, data, count } = props.posts;

    const metaTags = (
        <Fragment>
            <title>Page {pageNo} - All Blogs | AM Web Developer</title>
        </Fragment>
    );

    return (
        <PageLayout
            headContent={metaTags}
        >
            {props.auth.admin && <AdminFAB />}
            <div className='container'>
                <AllBlogs
                    loading={loading}
                    data={data}
                    adminButtons={props.auth.admin}
                />
                <div style={{marginTop: '20px'}} />
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

Blog.getInitialProps = async ctx => {
    await ctx.store.dispatch(actions.authActions.authenticate(ctx.req));
    await ctx.store.dispatch(actions.blogPostActions.getAllPosts(ctx, perPage));

    return {};
}

export default connect(state => state)(Blog);
