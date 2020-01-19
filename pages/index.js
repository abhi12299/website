import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import PageLayout from '../components/pageLayout';
import AdminFAB from '../components/adminFAB';
import LatestPosts from '../components/latestPosts';

import actions from '../redux/actions';
import { getCookie, removeCookie } from '../utils/cookies';
import { showToast } from '../utils/toasts';

const Home = props => {
  useEffect(() => {
    if (props.auth.initiateForceLogout) {
      props.dispatch(actions.authActions.logout());
      return;
    }

    if (props.notAdminError) {
      removeCookie('notAdmin');
      setTimeout(() => showToast('You are not an administrator!', 'error'), 500);
    }
  }, []);

  const metaTags = (
    <Fragment>
        <title>Abhishek Mehandiratta | Web Developer</title>
        <link href='URL' rel='canonical' />
        <link rel='canonical' href='https://iabhishek.dev' />

        <meta name='description' content='Hi! I am Abhishek. I love developing web apps, especially server side applications.' />
        <meta name='keywords' content='Abhishek, Mehandiratta, Developer, Web' />
        <meta name='author' content='Abhishek Mehandiratta' />

        <meta property='og:title' content='Abhishek Mehandiratta | Web Developer' />
        <meta property='og:type' content='website' />
        <meta property='og:description' content='Hi! I am Abhishek. I love developing web apps, especially server side applications.' />
        <meta property='og:image' content='https://iabhishek.dev/static/logo.png' />
        <meta property='og:url' content='https://iabhishek.dev' />

        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@abhishek_m' />
        <meta name='twitter:creator' content='@abhishek_m' />
        <meta name='twitter:title' content='Abhishek Mehandiratta | Web Developer' />
        <meta name='twitter:description' content='Hi! I am Abhishek. I love developing web apps, especially server side applications.' />
    </Fragment>
  );

  return (
    <PageLayout
      headContent={metaTags}
    >
      { props.auth.admin && <AdminFAB /> }
      <LatestPosts />
    </PageLayout>
  );
};

Home.getInitialProps = async ctx => {
  const notAdminError = getCookie('notAdmin', ctx.req);
  await ctx.store.dispatch(actions.authActions.authenticate(ctx.req));
  await ctx.store.dispatch(actions.blogPostActions.getLatestPosts());

  return { notAdminError: !!notAdminError };
}

export default connect(state => state)(Home);
