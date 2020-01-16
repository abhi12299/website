import React, { useEffect, useState, Fragment } from 'react'
import { withRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { connect } from 'react-redux';

import PageLayout from '../../components/pageLayout';
import withAuth from '../../components/withAuth';
import Media from '../../components/dashboard/media';
import AdminFAB from '../../components/adminFAB';
import Modal from '../../components/modal';
import DashboardMediaHeader from '../../components/dashboard/mediaHeader';
import Error from '../_error';
const Pagination = dynamic(() => import('../../components/pagination'), { ssr: false });

import actions from '../../redux/actions';

import '../../css/dashboard/mediaContainer.css';
import FullScreenLoader from '../../components/fullScreenLoader';

const perPage = 20;
const DashboardMedia = props => {
  let [showDeleteModal, setShowDeleteModal] = useState(false);
  let [selectedMedia, setSelectedMedia] = useState(null);

  const { router } = props;
  const { loading } = props.dashboardMedia;
  let [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    let { page = 1} = router.query;
    page = parseInt(page) || 1;
    page = page > 0 ? page : 1;
    setPageNo(page);
  }, [router.query]);

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

  if (!media) {
    return (
      <Error 
        statusCode={500} 
        errorText='Media not available! Please check the server logs!' 
      />
    );
  }

  const metaTags = (
    <Fragment>
        <title>View All Media</title>
    </Fragment>
  );

  return (
    <PageLayout
      headContent={metaTags}
    >
      <FullScreenLoader loading={loading} />
      { props.auth.admin && <AdminFAB /> }

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
          <DashboardMediaHeader />
            <div className='row container media-container'>
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
    </PageLayout>
  );
};

DashboardMedia.getInitialProps = () => {
  return {
      fetchMedia: true,
      perPage
  };
}

export default withAuth(connect(state => state, null)(withRouter(DashboardMedia)));
