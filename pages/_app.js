import React from 'react';
import App from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';

import { initStore } from '../redux';
import actions from '../redux/actions';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'toastr/build/toastr.min.css';
import 'toastr/build/toastr.min.js';

import '../css/index.css';

export default withRedux(initStore, { debug: true })(
  class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
      await ctx.store.dispatch(actions.authActions.authenticate(ctx.req));
      const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
      return { pageProps };
    }

    render() {
      const { Component, pageProps, store } = this.props;
      return (
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      );
    }
  }
);
