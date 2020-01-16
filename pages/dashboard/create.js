import React, { useEffect, useState, Fragment } from 'react'
import { connect } from 'react-redux';

import PageLayout from '../../components/pageLayout';
import FullScreenLoader from '../../components/fullScreenLoader';
import withAuth from '../../components/withAuth';
import AdminFAB from '../../components/adminFAB';
import PostEditor from '../../components/dashboard/postEditor';
import PostSidebar from '../../components/dashboard/postSidebar';
import SaveButton from '../../components/dashboard/saveButton.js';
import restoreFromLS from '../../utils/restoreFromLS';
import { RESTOREPOST } from '../../redux/types';

const CreatePost = props => {
  const { title, loading } = props.dashboardPost;
  let [isPostRestored, setIsPostRestored] = useState(false);

  useEffect(() => {
    const prevArticleData = restoreFromLS();
    if (prevArticleData) {
      props.dispatch({ type: RESTOREPOST, payload: prevArticleData });
      setIsPostRestored(true);
    }
  }, []);

  const metaTags = (
    <Fragment>
      <title>{title.trim().length > 0 ? `${title} | New Post` : 'Create Post'}</title>
    </Fragment>
  );

  return (
    <PageLayout
      headContent={metaTags}
    >
      <FullScreenLoader loading={loading} />
      {props.auth.admin && <AdminFAB />}
      
      <div className='container'>
        <div className='row'>
          <PostEditor
            postRestored={isPostRestored}
          />
          <PostSidebar
            postRestored={isPostRestored}
          />
          <SaveButton />
        </div>
      </div>
    </PageLayout>
  );
};

export default withAuth(connect(state => state, null)(CreatePost));
