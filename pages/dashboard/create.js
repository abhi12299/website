import React from 'react'
import Head from 'next/head';

import withAuth from '../../components/withAuth';
import Preloader from '../../components/preloader';
import Header from '../../components/header';
import Footer from '../../components/footer';
import AdminFAB from '../../components/adminFAB';

const CreatePost = props => {
  const createPostView = (
    <div>
      Create Post here!
    </div>
  );

  return (
    <div>
      <Head>
        <title>Create Post</title>
      </Head>
      <Preloader />
      <Header />
      {/* position relative needed for jquery scroll */}
      <div className='main-body-content' style={{maxWidth: '100%', position: 'relative'}}>
          { createPostView }
          <Footer />
          { props.auth.admin && <AdminFAB /> }
      </div>
    </div>
  );
};

export default withAuth(CreatePost);
