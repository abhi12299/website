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
                    const { fetchPosts, perPage, page:pageFromQuery, fetchMedia, editPost } = await WrappedComponent.getInitialProps();

                    let { page } = ctx.req ? ctx.req.query : ( ctx.query ? ctx.query : {});
                    page = page ? (isNaN(parseInt(page)) ? 1 : parseInt(page))  : 1;
                    page = page > 0 ? page : 1;
                    if (pageFromQuery) {
                        page = pageFromQuery;
                    }
                    if (fetchPosts) {
                        // extract sortBy, sortOrder, published from query
                        let {
                            sortBy='postedDate',
                            sortOrder='-1',
                            published='all' 
                        } = ctx.req ? ctx.req.query : ( ctx.query ? ctx.query : {});
                        await ctx.store.dispatch(actions.dashboardActions.fetchPosts({
                            req: ctx.req,
                            perPage,
                            pageNo: page,
                            filters: { sortOrder, sortBy, published }
                        }));
                    }

                    if (fetchMedia) {
                        // extract sortBy and sortOrder from query
                        let {
                            sortBy='createdAt',
                            sortOrder='-1' 
                        } = ctx.req ? ctx.req.query : ( ctx.query ? ctx.query : {});

                        await ctx.store.dispatch(actions.dashboardActions.fetchMedia({ req: ctx.req, perPage, pageNo: page, filters: {sortBy, sortOrder} }));
                    }
                    
                    if (editPost) {
                        const { id } = ctx.req ? ctx.req.query : ( ctx.query ? ctx.query : {}); 
                        await ctx.store.dispatch(actions.dashboardActions.fetchPost({ _id: id, req: ctx.req }));
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
            const { admin, error, errorMessage, loading } = this.props.auth;

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
            return <FullScreenLoader loading={loading} />;
        }
    }
    return connect(state => state)(WithAuth);
}
