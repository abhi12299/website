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
    _id,
    postedDate
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

      <meta property='og:site_name' content='Abhishek Mehandiratta | Web Developer' />
      <meta property='article:published_time' content={new Date(postedDate).toJSON()} />
      {metaKeywords.map(mk => (<meta property='article:tag' content={mk} key={mk} />))}
      <meta property='og:title' content={title} />
      <meta property='og:type' content='article' />
      <meta property='og:description' content={metaDescription} />
      <meta property='og:image' content={headerImageURL} />
      <meta property='og:url' content={postURL} />

      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content='@abhishek_m' />
      <meta name='twitter:creator' content='@abhishek_m' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={metaDescription} />
      <meta name='twitter:url' content={postURL} />
      <meta name='twitter:label1' content='Written By' />
      <meta name='twitter:data1' content='Abhishek Mehandiratta' />
      <meta name='twitter:label1' content='Filed under' />
      <meta name='twitter:label1' content={metaKeywords.join(', ')} />

      <script type='application/ld+json' dangerouslySetInnerHTML={{
        __html: `
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "publisher": {
              "@type": "Organization",
              "name": "Abhishek Mehandiratta | Web Developer",
              "logo": {
                "@type": "ImageObject",
                "url": "https://iabhishek.dev/static/png/logo.png",
                "width": 80,
                "height": 80
              }
            },
            "author": {
              "@type": "Person",
              "name": "Abhishek Mehandiratta",
              "image": {
                "@type": "ImageObject",
                "url": "https://iabhishek.dev/static/png/logo.png",
                "width": 100,
                "height": 100
              },
              "url": "https://iabhishek.dev/about/"
            },
            "headline": "${title}",
            "url": "${postURL}",
            "datePublished": "${new Date(postedDate).toJSON()}",
            "keywords": "${metaKeywords.join(', ')}",
            "description": "${metaDescription}",
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://iabhishek.dev/"
            }
          }
      `}}>
      </script>
    </Fragment>
  );

  useEffect(() => {
    if (!data) return;
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
      />
    </PageLayout>
  );
};

Post.getInitialProps = async ctx => {
  await ctx.store.dispatch(actions.blogPostActions.getPost(ctx));
  return {};
};

export default connect(state => state)(Post);
