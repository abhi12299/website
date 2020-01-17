import React, { Fragment } from 'react';

import FullScreenLoader from '../../../components/fullScreenLoader';
import withAuth from '../../../components/withAuth';
import AdminFAB from '../../../components/adminFAB';
import PageLayout from '../../../components/pageLayout';
import Error from '../../../pages/_error';
import SingleBlogPost from '../../../components/singleBlogPost';
import baseURL from '../../../constants/apiURL';

const Preview = props => {
  const { data, loading } = props.blogPost;

  if (!data) {
    return (
      <Error 
        statusCode={404}
      />
    );
  }

  const {
    title, _id
  } = data;

  const metaTags = (
    <Fragment>
      <title>{title} | Preview Post</title>
    </Fragment>
  );

  const postURL = `${baseURL}/post/${_id}`;

  return (
    <PageLayout
      headContent={metaTags}
    >
      <FullScreenLoader loading={loading} />
      { props.auth.admin && <AdminFAB /> }
      
      <SingleBlogPost
        enableComments={false}
        blogPost={data}
        url={postURL}
      />

      <script src='../static/prism/prism.js' async defer></script>
      <link rel='stylesheet' href='../static/prism/prism.css' />
    </PageLayout>
  );
};

Preview.getInitialProps = () => {
  return {
    fetchPostPreview: true
  };
};

export default withAuth(Preview);
