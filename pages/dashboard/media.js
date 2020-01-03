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
import Modal from '../../components/modal';
const Pagination = dynamic(() => import('../../components/pagination'), { ssr: false });

import actions from '../../redux/actions';

import '../../css/dashboard/mediaContainer.css';

const perPage = 20;
const DashboardMedia = props => {
  let [showDeleteModal, setShowDeleteModal] = useState(false);
  let [selectedMedia, setSelectedMedia] = useState(null);

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
  const { count, deleteMediaLoading } = props.dashboardMedia;

  const handleDeleteClose = () => {
    setShowDeleteModal(false);
  }

  const handleDelete = () => {
    selectedMedia && props.dispatch(actions.dashboardActions.deleteMedia(selectedMedia._id));
  };

  const openDeleteModal = _id => {
    setShowDeleteModal(true);
    const tempMedia = media.filter(m => m._id === _id);

    setSelectedMedia(tempMedia ? tempMedia[0] : null);
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
        <Modal 
          maxWidth='50%'
          promptBeforeClose={false}
          onClose={handleDeleteClose}
          onPositiveAction={handleDelete}
          onNegativeAction={handleDeleteClose}
          positiveActionButtonName='Delete'  
          negativeActionButtonName='Dismiss'
          title='Delete this media?'
          show={showDeleteModal}
        >
          {
            selectedMedia &&
            (
              <div className='delete-media-container'>
                {
                  selectedMedia.type === 'image' ? 
                  <img src={selectedMedia.url} className='delete-media-img' />
                  :
                  <video controls={true} muted={true} src={selectedMedia.url} className='deleted-media-video' />
                }
              </div>
            )
          }
        </Modal>
        <div className='container'>
            <div className='row media-container'>
                {media.map(m => (
                  <Media 
                    key={m._id} 
                    media={m}
                    onDeleteClick={openDeleteModal}
                    deleteMediaLoading={deleteMediaLoading}
                  />
                ))}
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
