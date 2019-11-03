import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';

import Error from '../pages/_error';
import actions from '../redux/actions';
import { forceLogoutToast } from '../utils/toasts';
import FullScreenLoader from './fullScreenLoader';

export default function(WrappedComponent) {
    class WithAuth extends Component {
        static async getInitialProps(ctx) {
            await ctx.store.dispatch(actions.authActions.authenticate(ctx.req));
            const store = ctx.store.getState();
            if (store.auth.admin) {
                if (WrappedComponent.getInitialProps) {
                    const { fetchPosts } = await WrappedComponent.getInitialProps();
                    if (fetchPosts) {
                        await ctx.store.dispatch(actions.dashboardActions.fetchPosts({ req: ctx.req }));
                    }
                }
            }
            return {};
        }

        state = {
            forceLogout: false
        };

        componentDidMount() {
            const { initiateForceLogout } = this.props.auth;

            this.setState({ forceLogout: initiateForceLogout });
        }

        componentDidUpdate(prevProps) {
            const { initiateForceLogout } = this.props.auth;
            const { initiateForceLogout:prevForceLogout } = prevProps.auth;
            if (initiateForceLogout && prevForceLogout !== initiateForceLogout) {
                this.setState({ forceLogout: initiateForceLogout });
            }
        }

        render() {
            const { admin, error, errorMessage } = this.props.auth;

            if (this.state.forceLogout) {
                this.setState({ forceLogout: false }, () => {
                    forceLogoutToast(errorMessage).then(() => {
                        Router.push('/');
                    });
                });
            }

            if (admin) {
                return <WrappedComponent {...this.props} />
            } else if (error) {
                return (
                    <Error 
                        statusCode={400} 
                        title='Something went wrong!' 
                        errorText={errorMessage || 'Awwww Snap!'} 
                    />
                );
            }
            return <FullScreenLoader />;
        }
    }
    return connect(state => state)(WithAuth);
}
