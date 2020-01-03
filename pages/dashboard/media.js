import React, { useEffect, useState } from 'react'
import { withRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { connect } from 'react-redux';

import withAuth from '../../components/withAuth';
import Preloader from '../../components/preloader';
import Media from '../../components/dashboard/media';
import Header from '../../components/header';
import Footer from '../../components/footer';
import AdminFAB from '../../components/adminFAB';
const Pagination = dynamic(() => import('../../components/pagination'), { ssr: false });

const perPage = 20;
const DashboardMedia = props => {
    useEffect(() => console.log(props), [])
  const { router } = props;
  let [pageNo, setPageNo] = useState(1);
  useEffect(() => {
    let { page = 1} = router.query;
    page = parseInt(page) || 1;
    page = page > 0 ? page : 1;
    setPageNo(page);
  }, [router.query]);

//   if (loading) {
//     return <FullScreenLoader />;
//   }

    const media = props.dashboardMedia.data;
    const { count } = props.dashboardMedia;

    // make array of 3 elems each in the media
    let chunksOfMedia = [];
    if (media && media.length) {
        //TODO: logic here
    }

  return (
    <div>
      <Head>
        <title>View All Media</title>
      </Head>
      <Preloader />
      <Header />
      {/* position relative needed for jquery scroll */}
      <div className='main-body-content' style={{maxWidth: '100%', position: 'relative'}}>
        <div className='container'>
            <div className='row'>
                { media.map(m => <Media key={m._id} media={m} />) }
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

DashboardMedia.getInitialProps = () => {
  return {
      fetchMedia: true,
      perPage
  };
}

export default withAuth(connect(state => state, null)(withRouter(DashboardMedia)));
