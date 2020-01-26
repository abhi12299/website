import React, { Fragment } from 'react'

import withAuth from '../../components/withAuth';
import PageLayout from '../../components/pageLayout';
import AdminFAB from '../../components/adminFAB';

const Dashboard = props => {
  const dashboardView = (
    <div>
      Dashboard here!
    </div>
  );

  const metaTags = (
    <Fragment>
        <title>Dashboard</title>
    </Fragment>
  );

  return (
    <PageLayout
      headContent={metaTags}
    >
      { props.auth.admin && <AdminFAB /> }

      { dashboardView }
    </PageLayout>
  );
};

export default withAuth(Dashboard);
