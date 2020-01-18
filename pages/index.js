import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import PageLayout from '../components/pageLayout';
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

  const metaTags = (
    <Fragment>
        <title>Abhishek Mehandiratta | Web Developer</title>
    </Fragment>
  );

  return (
    <PageLayout
      headContent={metaTags}
    >
      { props.auth.admin && <AdminFAB /> }
      Latest 5 blogs will go here
      All Blogs button goes here
    </PageLayout>
  );
};

Home.getInitialProps = async ctx => {
  const notAdminError = getCookie('notAdmin', ctx.req);
  await ctx.store.dispatch(actions.authActions.authenticate(ctx.req));

  return { notAdminError: !!notAdminError };
}

export default connect(state => state)(Home);
