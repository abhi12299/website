import React, { Component } from 'react';
import { connect } from 'react-redux';

import Error from '../pages/_error';
import actions from '../redux/actions';
import { forceLogoutToast } from '../utils/toasts';
import LoadingSVG from './loadingSVG';

export default function(WrappedComponent) {
    class WithAuth extends Component {
        static async getInitialProps(ctx) {
            await ctx.store.dispatch(actions.authActions.authenticate(ctx.req));
            return {};
        }

        state = {
            forceLogout: false
        };

        componentDidMount() {
            const { initiateForceLogout } = this.props.auth;

            this.setState({ forceLogout: initiateForceLogout });
        }

        render() {
            const { admin, error, errorMessage } = this.props.auth;

            if (this.state.forceLogout) {
                forceLogoutToast(errorMessage);
            }

            if (admin) {
                return <WrappedComponent {...this.props} />
            } else if (error) {
                return (
                    <Error statusCode={400} errorText='Awwww Snap!' />
                );
            }
            return (
                <div className='d-flex flex-column align-items-center' style={{marginTop: '40vh'}}>
                    <LoadingSVG text='Hang on!' width='80px' height='80px' />
                </div>
            );
        }
    }
    return connect(state => state)(WithAuth);
}
