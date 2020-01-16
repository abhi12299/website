import React, { useEffect, useState, Fragment } from 'react'
import Head from 'next/head';
import { connect } from 'react-redux';

import withAuth from '../../components/withAuth';
import Preloader from '../../components/preloader';
import Header from '../../components/header';
import Footer from '../../components/footer';
import AdminFAB from '../../components/adminFAB';
import PostEditor from '../../components/dashboard/postEditor';
import PostSidebar from '../../components/dashboard/postSidebar';
import SaveButton from '../../components/dashboard/saveButton.js';
import FullScreenLoader from '../../components/fullScreenLoader';
import { RESTOREPOST } from '../../redux/types';
import restoreFromLS from '../../utils/restoreFromLS';
import { useRouter } from 'next/router';
import Error from '../_error';
import PageLayout from '../../components/pageLayout';

const EditPost = props => {
  const router = useRouter();
  const keyName = `edit-${router.query.id || ''}`;

  const { title, loading, error, errorMessage } = props.dashboardPost;
  let [isPostRestored, setIsPostRestored] = useState(false);

  useEffect(() => {
    const prevArticleData = restoreFromLS(keyName);

    if (prevArticleData) {
      props.dispatch({ type: RESTOREPOST, payload: prevArticleData });
      setIsPostRestored(true);
    }
  }, []);

  if (error) {
    return <Error errorText={errorMessage} />;
  }

  const metaTags = (
    <Fragment>
      <title>{title.trim().length > 0 ? `${title} | Edit Post` : 'Edit Post'}</title>
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
            lsKeyName={keyName}
            postRestored={isPostRestored}
          />
          <PostSidebar
            lsKeyName={keyName}
            postRestored={isPostRestored}
          />
          <SaveButton
            type='edit'
            lsKeyName={keyName}
          />
        </div>
      </div>
    </PageLayout>
  );
};

EditPost.getInitialProps = () => {
  return {
    editPost: true
  };
};

export default withAuth(connect(state => state, null)(EditPost));
