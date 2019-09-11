import React from 'react'
import Head from 'next/head';

import Preloader from '../components/preloader';
import IntroHeader from '../components/introHeader';
import Header from '../components/header';
import AboutMe from '../components/aboutMe';
import TechStack from '../components/techStack';
import Footer from '../components/footer';
import Projects from '../components/projects';

const Home = () => {
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

export default Home;
