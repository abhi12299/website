import React, { useEffect, useState } from 'react'
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

  return (
    <div>
      <Head>
        <title>{title.trim().length > 0 ? `${title} | Edit Post` : 'Edit Post'}</title>
      </Head>
      <Preloader />
      <Header />
      <FullScreenLoader loading={loading} />
      {/* position relative needed for jquery scroll */}
      <div className='main-body-content' style={{maxWidth: '100%', position: 'relative'}}>
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
          <Footer />
          { props.auth.admin && <AdminFAB /> }
      </div>
    </div>
  );
};

EditPost.getInitialProps = () => {
    return {
        editPost: true
    };
};

export default withAuth(connect(state => state, null)(EditPost));
