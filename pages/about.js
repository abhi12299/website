import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import PageLayout from '../components/pageLayout';
import AboutMe from '../components/aboutMe';
import TechStack from '../components/techStack';
import AdminFAB from '../components/adminFAB';

import actions from '../redux/actions';

const About = props => {
  useEffect(() => {
    if (props.auth.initiateForceLogout) {
      props.dispatch(actions.authActions.logout());
      return;
    }
  }, []);

  const metaTags = (
    <Fragment>
        <title>About Me | AM - Web Developer</title>
    </Fragment>
  );

  return (
    <PageLayout
      headContent={metaTags}
    >
      <AboutMe />
      { props.auth.admin && <AdminFAB /> }
      <TechStack />
    </PageLayout>
  );
};

About.getInitialProps = async ctx => {
  await ctx.store.dispatch(actions.authActions.authenticate(ctx.req));

  return {};
}

export default connect(state => state)(About);
