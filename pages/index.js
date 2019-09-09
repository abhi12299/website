import React, { useEffect } from 'react'
import Head from 'next/head';

import Preloader from '../components/preloader';
import IntroHeader from '../components/introHeader';
import Header from '../components/header';
import AboutMe from '../components/aboutMe';
import TechStack from '../components/techStack';
import Footer from '../components/footer';

const Home = () => {
  useEffect(() => {
    // THIS CODE RIGHT HERE
    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
    });

    // WORK AROUND BUT NOT GOOD
        setTimeout(() => {
          document.body.classList.add('loaded');
        }, 700);
  }, []);

  return (
    <div>
      <Head>
        <title>Abhishek Mehandiratta | Web Developer</title>
      </Head>
      <Preloader />
      <IntroHeader />
      <Header />
      <div className='main-body-content' style={{maxWidth: '100%'}}>
        <AboutMe />
        <TechStack />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
