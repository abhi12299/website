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

      <meta name='twitter:card' content='https://iabhishek.dev/static/logo.png' />
      <meta name='twitter:site' content='https://iabhishek.dev' />
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

  const appendScripts = (highlightTimeout) => {
    if (!document.querySelector('script[src$="prism.js"]')) {
      const prismScript = document.createElement('script');
      prismScript.src = '../static/prism/prism.js';
      prismScript.setAttribute('data-manual', true);

      const prismInit = document.createElement('script');
      prismInit.innerHTML = `
        function highlight() {
          if ('Prism' in window && !('PRISM_CODE_PARSED' in window)) {
            Prism.highlightAll(false, () => {
              window.PRISM_CODE_PARSED = true;
            });
          }
        }
      `;

      const prismCss = document.createElement('link');
      prismCss.rel = 'stylesheet';
      prismCss.href = '../static/prism/prism.css';
      document.body.appendChild(prismScript);
      document.body.appendChild(prismCss);
      document.body.appendChild(prismInit);
    }

    setTimeout(window.highlight, highlightTimeout)
  }

  useEffect(() => {
    if (!data) return;
    if (document.readyState === 'complete') {
      appendScripts(1000)
    } else {
      window.addEventListener('load', () => appendScripts(100));
    }
    return () => {
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
