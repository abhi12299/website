import React from 'react'
import Head from 'next/head';
import IntroHeader from '../components/introHeader';
import Header from '../components/header';
import AboutMe from '../components/aboutMe';
import TechStack from '../components/techStack';
import Footer from '../components/footer';

const Home = () => (
  <div>
    <Head>
      <title>Abhishek Mehandiratta | Web Developer</title>
    </Head>
    <IntroHeader />
    <Header />
    <div className='main-body-content'>
      <AboutMe />
      <TechStack />
      <Footer />
    </div>
  </div>
);

export default Home;
