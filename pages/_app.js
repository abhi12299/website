import React from 'react';
import App from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { PageTransition } from 'next-page-transitions'

import { initStore } from '../redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/build/toastr.min.css';
import 'toastr/build/toastr.min.js';

import '../css/index.css';

export default withRedux(initStore, { debug: false })(
  class MyApp extends App {
    render() {
      const { Component, pageProps, store, router } = this.props;
      return (
        <Provider store={store}>
          <PageTransition 
            timeout={50} 
            classNames="page-transition"
          >
            <Component {...pageProps} key={router.route} />
          </PageTransition>
          <style jsx global>{`
            .page-transition-enter {
              opacity: 0;
            }
            .page-transition-enter-active {
              opacity: 1;
              transition: opacity 150ms;
            }
            .page-transition-exit {
              opacity: 1;
            }
            .page-transition-exit-active {
              opacity: 0;
              transition: opacity 150ms;
            }
        `}</style>
        </Provider>
      );
    }
  }
);
