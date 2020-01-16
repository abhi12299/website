import React, { Fragment } from 'react';
import { useRouter } from 'next/router';

import PageLayout from '../../../components/pageLayout';
import SingleBlogPost from '../../../components/singleBlogPost';
// import Error from '../../_error';

const Post = () => {
  const router = useRouter();
  const { id } = router.query;

  const metaTags = (
    <Fragment>
      <title>Single Blog Post Page!</title>
    </Fragment>
  );

  return (
      <PageLayout
        headContent={metaTags}
      >
        <SingleBlogPost />
      </PageLayout>
  );
};

export default Post