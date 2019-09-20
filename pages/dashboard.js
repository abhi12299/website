import React, { useEffect } from 'react'
import Head from 'next/head';
import { connect } from 'react-redux';

import Preloader from '../components/preloader';
import Header from '../components/header';

const Dashboard = props => {
  useEffect(() => {
      console.log(props);
  });

  return (
    <div>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Preloader />
      <Header />
      {/* position relative needed for jquery scroll */}
      <div className='main-body-content' style={{maxWidth: '100%', position: 'relative'}}>
          Dashboard here!
      </div>
    </div>
  );
};

export default connect(state => state)(Dashboard);
