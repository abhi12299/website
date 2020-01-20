import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import PageLayout from '../../../components/pageLayout';
import SingleBlogPost from '../../../components/singleBlogPost';
import actions from '../../../redux/actions';
import baseURL from '../../../constants/apiURL';

import Error from '../../_error';

const Post = props => {
  const { data } = props.blogPost;

  if (!data) {
    return (
      <Error
        statusCode={404}
        title='The post could not be found!'
      />
    );
  }

  const {
    title,
    metaKeywords,
    metaDescription,
    headerImageURL,
    _id
  } = data;

  const postURL = `${baseURL}/post/${_id}`;

  const metaTags = (
    <Fragment>
      <title>
        {title} - Abhishek Mehandiratta | Web Developer
      </title>

      <link href='URL' rel='canonical' />
      <link rel='canonical' href={postURL} />

      <meta name='description' content={metaDescription} />
      <meta name='keywords' content={`${metaKeywords.join(', ')}, Blog, Abhishek, Mehandiratta, Web, Develpoment`} />
      <meta name='author' content='Abhishek Mehandiratta' />

      <meta property='og:title' content={title} />
      <meta property='og:type' content='website' />
      <meta property='og:description' content={metaDescription} />
      <meta property='og:image' content={headerImageURL} />
      <meta property='og:url' content={postURL} />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@abhishek_m' />
      <meta name='twitter:creator' content='@abhishek_m' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={metaDescription} />
    </Fragment>
  );

  useEffect(() => {
    const prismScript = document.createElement('script');
    prismScript.src = '../static/prism/prism.js';
    prismScript.async = true;
    prismScript.setAttribute('data-manual', true);

    const prismInit = document.createElement('script');
    prismInit.async = true;
    prismInit.innerHTML = `
      function highlight() {
        if ('Prism' in window && !('PRISM_CODE_PARSED' in window)) {
          Prism.highlightAll(true, () => {
            window.PRISM_CODE_PARSED = true;
          });
        }
      }

      window.addEventListener('load', highlight);
      setTimeout(highlight, 2000);
    `;

    const prismCss = document.createElement('link');
    prismCss.rel = 'stylesheet';
    prismCss.href = '../static/prism/prism.css';

    document.body.appendChild(prismScript);
    document.body.appendChild(prismCss);
    document.body.appendChild(prismInit);

    return () => {
      document.body.removeChild(prismCss);
      document.body.removeChild(prismScript);
      document.body.appendChild(prismInit);
      if ('PRISM_CODE_PARSED' in window) delete window['PRISM_CODE_PARSED'];
    };
  }, []);

  return (
    <PageLayout
      headContent={metaTags}
    >
      <SingleBlogPost
        enableComments={true}
        blogPost={data}
        url={postURL}
      />
    </PageLayout>
  );
};

Post.getInitialProps = async ctx => {
  await ctx.store.dispatch(actions.blogPostActions.getPost(ctx));
  return {};
};

export default connect(state => state)(Post);


<a href="https://widgetpack.com" class="wpac-cr">Comments System WIDGET PACK</a>