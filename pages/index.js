import React from 'react'
import Head from 'next/head';
import IntroHeader from '../components/introHeader';
import Header from '../components/header';
import AboutMe from '../components/aboutMe';

const Home = () => (
  <div>
    <Head>
      <title>Abhishek Mehandiratta | Web Developer</title>
    </Head>
    <IntroHeader />
    <Header />
    <div className='main-body-content' style={{ marginBottom: '10000px' }}>
      <AboutMe />
    </div>
  </div>
);

export default Home;
