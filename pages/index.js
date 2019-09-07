import React from 'react'
import Head from 'next/head';
import IntroHeader from '../components/introHeader';
import Header from '../components/header';

const Home = () => (
  <div>
    <Head>
      <title>Abhishek Mehandiratta | Web Developer</title>
    </Head>
    <IntroHeader />
    <Header />
    <div className='main-body-content' style={{ height: '10000px' }}>
      Hello there buddy!
    </div>
  </div>
);

export default Home;
