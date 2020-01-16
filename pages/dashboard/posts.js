import React, { useEffect, useState, Fragment } from 'react'
import { withRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';

import PageLayout from '../../components/pageLayout';
import withAuth from '../../components/withAuth';
import AdminFAB from '../../components/adminFAB';
import PostTile from '../../components/postTile';
import Error from '../_error';
import FullScreenLoader from '../../components/fullScreenLoader';
import DashboardPostsHeader from '../../components/dashboard/dashboardPostsHeader';
const Pagination = dynamic(() => import('../../components/pagination'), { ssr: false });

const perPage = 10;
const ViewPosts = props => {
  const { router } = props;
  let [pageNo, setPageNo] = useState(1);
  useEffect(() => {
    let { page = 1 } = router.query;
    page = parseInt(page) || 1;
    page = page > 0 ? page : 1;
    setPageNo(page);
  }, [router.query]);

  const posts = props.posts.data;
  const { count, loading } = props.posts;

  if (!posts) {
    return (
      <Error
        statusCode={500}
        errorText='Posts not available! Please check server logs!'
      />
    );
  }

  const metaTags = (
    <Fragment>
      <title>View All Posts</title>
    </Fragment>
  );

  return (
    <PageLayout
      headContent={metaTags}
    >
      <FullScreenLoader loading={loading} />
      {props.auth.admin && <AdminFAB />}
      <div className='container'>
        <DashboardPostsHeader />
        <div className='posts-container'>
          {posts.map(p => <PostTile key={p._id} post={p} adminButtons={true} />)}
        </div>
        <Pagination
          pageNo={pageNo}
          perPage={perPage}
          totalItems={count}
        />
      </div>
    </PageLayout>
  );
};

ViewPosts.getInitialProps = () => {
  return {
    fetchPosts: true,
    perPage
  };
}

export default withAuth(connect(state => state, null)(withRouter(ViewPosts)));
