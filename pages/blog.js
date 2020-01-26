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
            <title>All Blogs - Page {pageNo} - Abhishek Mehandiratta | Web Developer</title>
            <link href='URL' rel='canonical' />
            <link rel='canonical' href='https://iabhishek.dev' />

            <meta name='description' content='All Blogs - Abhishek Mehandiratta | Web Developer' />
            <meta name='keywords' content='Abhishek, Mehandiratta, Blog, Developer, Web' />
            <meta name='author' content='Abhishek Mehandiratta' />

            <meta property='og:title' content='All Blogs - Abhishek Mehandiratta | Web Developer' />
            <meta property='og:type' content='website' />
            <meta property='og:description' content='Check out these interesting blogs written by me, ranging from basics of javascript and other languages to advanced concepts.' />
            <meta property='og:image' content='https://iabhishek.dev/static/logo.png' />
            <meta property='og:url' content='https://iabhishek.dev/blog' />

            <meta name='twitter:card' content='summary_large_image' />
            <meta name='twitter:site' content='@abhishek_m' />
            <meta name='twitter:creator' content='@abhishek_m' />
            <meta name='twitter:title' content='All Blogs - Abhishek Mehandiratta | Web Developer' />
            <meta name='twitter:description' content='Check out these interesting blogs written by me, ranging from basics of javascript and other languages to advanced concepts.' />
            <script type='application/ld+json' dangerouslySetInnerHTML={{__html: `
                {
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "publisher": {
                        "@type": "Organization",
                        "name": "Abhishek Mehandiratta",
                        "logo": {
                            "@type": "ImageObject",
                            "url": "https://iabhishek.dev/static/png/logo.png",
                            "width": 80,
                            "height": 80
                        }
                    },
                    "url": "https://iabhishek.dev/",
                    "image": {
                        "@type": "ImageObject",
                        "url": "https://iabhishek.dev/static/png/logo.png",
                        "width": 80,
                        "height": 80
                    },
                    "mainEntityOfPage": {
                        "@type": "WebPage",
                        "@id": "https://iabhishek.dev/"
                    },
                    "description": "Check out these interesting blogs written by me, ranging from basics of javascript and other languages to advanced concepts."
                }
            `}}>
            </script>
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
    await ctx.store.dispatch(actions.authActions.authenticate(ctx ? ctx.req : null));
    await ctx.store.dispatch(actions.blogPostActions.getAllPosts(ctx, perPage));

    return {};
}

export default connect(state => state)(Blog);
