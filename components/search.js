import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import Dropdown from './dropdown';

import { SHOWPOSTSEARCHOVERLAY } from '../redux/types';

import '../css/search.css';

const dropdownSortOptions = [
    { title: 'Time (Oldest first)', query: { sortBy: 'postedDate', sortOrder: '1' } },
    { title: 'Time (Latest first)', query: { sortBy: 'postedDate', sortOrder: '-1' } }
];
const dropdownSearchInOptions = [
    { title: 'All (Pub/unpub)', query: { published: 'all' } },
    { title: 'Published', query: { published: '1' } },
    { title: 'Unpublished', query: { published: '0' } }
];

let selectedIndexSort = 0;
let selectedIndexSearchIn = 0;

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            q: ''
        };

        this.escapeKeyCloseSearch = this.escapeKeyCloseSearch.bind(this);
        this.handleCloseSearch = this.handleCloseSearch.bind(this);
        this.handleSearchInOptionChange = this.handleSearchInOptionChange.bind(this);
        this.handleSortOptionChange = this.handleSortOptionChange.bind(this);
        this.handleSearchInputChange = this.handleSearchInputChange.bind(this);
        this.getSearchSuggestions = this.getSearchSuggestions.bind(this);
        this.handleSearchInputKeydown = this.handleSearchInputKeydown.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

        this.typingTimeout = null;
    }

    componentDidUpdate() {
        const { show } = this.props.search;
        if (show) {
            window.addEventListener('keydown', this.escapeKeyCloseSearch);
            document.documentElement.classList.add('no-scroll');
        } else {
            window.removeEventListener('keydown', this.escapeKeyCloseSearch);
            document.documentElement.classList.remove('no-scroll');
        }
    }

    handleSortOptionChange(i) {
        selectedIndexSort = i;
    }

    handleSearchInOptionChange(i) {
        selectedIndexSearchIn = i;
    }

    getSearchSuggestions() {
        let { q } = this.state;
        // remove left whitespace
        q = q.trimLeft();
        // remove whitespace on right end side that occurs more than once
        q = q.replace(/\s{2,}$/, '');
        // const { admin } = this.props.auth;
        const admin = true;

        if (q.length < 1) {
            return;
        }

        if (admin) {
            console.log('Hitting api for query:', q);
        } else {
            console.log('Not admin query', q);
        }
    }

    handleSearchInputChange(e) {
        clearTimeout(this.typingTimeout);
        this.typingTimeout = setTimeout(this.getSearchSuggestions, 500);
        this.setState({ q: e.target.value });
    }

    escapeKeyCloseSearch(e) {
        if (e.keyCode === 27) {
            this.handleCloseSearch();
        }
    }

    handleCloseSearch() {
        clearTimeout(this.typingTimeout);
        this.props.dispatch({ type: SHOWPOSTSEARCHOVERLAY, payload: false });
    }

    handleSearchInputKeydown(e) {
        if (e.keyCode === 13) { // enter is pressed
            clearTimeout(this.typingTimeout);
            this.handleSearch();
        }
    }

    handleSearch() {
        const { router } = this.props;
        // const { admin } = this.props.auth;
        const admin = true;
        let { q } = this.state;
        q = q.trim();

        if (q.length < 1) {
            return;
        }

        let searchQuery = { q };
        if (admin) {
            searchQuery = {
                ...searchQuery,
                ...dropdownSearchInOptions[selectedIndexSearchIn].query,
                ...dropdownSortOptions[selectedIndexSort].query
            };
        }
        router.push({
            pathname: '/search',
            query: searchQuery
        });
    }

    adminDropdowns() {
        return (
            <div className='admin-search-nav row mx-auto'>
                <div className='col-lg-6 col-md-6 col-12'>
                    <div className='dropdown-label'>
                        Sort By:
                    </div>
                    <div className='sort-dropdown-wrapper mx-auto'>
                        <Dropdown
                            options={dropdownSortOptions.map(d => d.title)}
                            defaultIndex={0}
                            onSelectionChange={this.handleSortOptionChange}
                        />
                    </div>
                </div>
                <div className='col-lg-6 col-md-6 col-12'>
                    <div className='dropdown-label'>
                        Search In:
                    </div>
                    <div className='search-in-dropdown-wrapper mx-auto'>
                        <Dropdown
                            options={dropdownSearchInOptions.map(d => d.title)}
                            defaultIndex={0}
                            onSelectionChange={this.handleSearchInOptionChange}
                        />
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { show } = this.props.search;
        const { q } = this.state;
        // const { admin } = this.props.auth;
        const admin = true;

        return (
            <div className={`section search-section ${show ? 'show' : 'hide'}`}>
                {admin && this.adminDropdowns()}
                <a className='close-search' onClick={this.handleCloseSearch}>
                    <img src='../static/png/close.png' alt='close' />
                </a>
                <div className='centered'>
                    <div className='search-container'>
                        <input
                            type='text'
                            placeholder='Search here..'
                            onChange={this.handleSearchInputChange}
                            value={q}
                            onKeyDown={this.handleSearchInputKeydown}
                        />
                        <button onClick={this.handleSearch}>Search</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(state => state, null)(withRouter(Search));
