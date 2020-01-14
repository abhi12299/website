import React, { useEffect } from 'react';
import Head from 'next/head';
import { connect } from 'react-redux';

import Preloader from '../components/preloader';
import IntroHeader from '../components/introHeader';
import Header from '../components/header';
import AboutMe from '../components/aboutMe';
import TechStack from '../components/techStack';
import Footer from '../components/footer';
import Projects from '../components/projects';
import FullScreenLoader from '../components/fullScreenLoader';
import AdminFAB from '../components/adminFAB';

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

  const { loading } = props.auth;
  // if (props.auth.loading) {
  //   return <FullScreenLoader />;
  // }

  return (
    <div>
      <Head>
        <title>Abhishek Mehandiratta | Web Developer</title>
      </Head>
      <Preloader />
      <IntroHeader />
      <Header />
      <FullScreenLoader loading={loading} />
      {/* position relative needed for jquery scroll */}
      <div className='main-body-content' style={{maxWidth: '100%', position: 'relative'}}>
        <AboutMe />
        { props.auth.admin && <AdminFAB /> }
        <TechStack />
        <Projects />
        <Footer />
      </div>
    </div>
  );
};

Home.getInitialProps = async ctx => {
  const notAdminError = getCookie('notAdmin', ctx.req);
  await ctx.store.dispatch(actions.authActions.authenticate(ctx.req));

  return { notAdminError: !!notAdminError };
}

export default connect(state => state)(Home);
