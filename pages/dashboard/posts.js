import React, { useEffect, useState } from 'react'
import Head from 'next/head';
import { connect } from 'react-redux';

import withAuth from '../../components/withAuth';
import Preloader from '../../components/preloader';
import Header from '../../components/header';
import Footer from '../../components/footer';
import AdminFAB from '../../components/adminFAB';
import FullScreenLoader from '../../components/fullScreenLoader';

const ViewPosts = props => {
//   if (loading) {
//     return <FullScreenLoader />;
//   }

  return (
    <div>
      <Head>
        <title>View All Posts</title>
      </Head>
      <Preloader />
      <Header />
      {/* position relative needed for jquery scroll */}
      <div className='main-body-content' style={{maxWidth: '100%', position: 'relative'}}>
        <div className='container'>
          All posts show up here
        </div>
          <Footer />
          { props.auth.admin && <AdminFAB /> }
      </div>
    </div>
  );
};

export default withAuth(connect(state => state, null)(ViewPosts));
