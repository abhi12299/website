import React, { useEffect } from 'react'
import Head from 'next/head';

import Preloader from '../components/preloader';
import IntroHeader from '../components/introHeader';
import Header from '../components/header';
import AboutMe from '../components/aboutMe';
import TechStack from '../components/techStack';
import Footer from '../components/footer';
import Projects from '../components/projects';

import { getCookie, removeCookie } from '../utils/cookies';
import { notAdminToast } from '../utils/toasts';

const Home = props => {
  useEffect(() => {
    if (props.notAdminError) {
      removeCookie('notAdmin');
      notAdminToast();
    }
  });

  return (
    <div>
      <Head>
        <title>Abhishek Mehandiratta | Web Developer</title>
      </Head>
      <Preloader />
      <IntroHeader />
      <Header />
      {/* position relative needed for jquery scroll */}
      <div className='main-body-content' style={{maxWidth: '100%', position: 'relative'}}>
        <AboutMe />
        <TechStack />
        <Projects />
        <Footer />
      </div>
    </div>
  );
};

Home.getInitialProps = ctx => {
  const notAdminError = getCookie('notAdmin', ctx.req);
  return { notAdminError: !!notAdminError };
}

export default Home;
