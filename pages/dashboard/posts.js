import React, { useEffect, useState } from 'react'
import { withRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { connect } from 'react-redux';

import withAuth from '../../components/withAuth';
import Preloader from '../../components/preloader';
import Header from '../../components/header';
import Footer from '../../components/footer';
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
    let { page = 1} = router.query;
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

  return (
    <div>
      <Head>
        <title>View All Posts</title>
      </Head>
      <Preloader />
      <Header />
      <FullScreenLoader loading={loading} />
      {/* position relative needed for jquery scroll */}
      <div className='main-body-content' style={{maxWidth: '100%', position: 'relative'}}>
        <div className='container'>
          <DashboardPostsHeader />
          <div className='posts-container'>
            { posts.map(p => <PostTile key={p._id} post={p} adminButtons={true} />) }
          </div>
          <Pagination 
            pageNo={pageNo} 
            perPage={perPage} 
            totalItems={count}
          />
        </div>
          <Footer />
          { props.auth.admin && <AdminFAB /> }
      </div>
    </div>
  );
};

ViewPosts.getInitialProps = () => {
  return {
      fetchPosts: true,
      perPage
  };
}
  
export default withAuth(connect(state => state, null)(withRouter(ViewPosts)));
