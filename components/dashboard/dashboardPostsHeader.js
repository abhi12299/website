import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Dropdown from '../dropdown';

import '../../css/dashboard/dashboardPostsHeader.css';

const dropdownOptions = [
    { title: 'Published (Latest first)', query: {sortBy: 'postedDate', published: '1', sortOrder: '-1', page: 1} },
    { title: 'Published (Oldest first)', query: {sortBy: 'postedDate', published: '1', sortOrder: '1', page: 1} },
    { title: 'Unpublished (Latest first)', query: {sortBy: 'postedDate', published: '0', sortOrder: '-1', page: 1} },
    { title: 'Unpublished (Oldest first)', query: {sortBy: 'postedDate', published: '0', sortOrder: '1', page: 1} },
    { title: 'All (Oldest first)', query: {sortBy: 'postedDate', published: 'all', sortOrder: '1', page: 1} },
    { title: 'All (Latest first)', query: {sortBy: 'postedDate', published: 'all', sortOrder: '-1', page: 1} }
];

function DashboardPostsHeader() {
    const router = useRouter();

    let [defaultIndex, setDefaultIndex] = useState(0);

    useEffect(() => {
        // by default sort by all posts, latest first
        const {
            sortBy='postedDate',
            sortOrder='-1',
            published='all'
        } = router.query;
        const filteredIndex = dropdownOptions.findIndex(op => (
            op.query.sortBy === sortBy && 
            op.query.sortOrder === sortOrder &&
            op.query.published === published
        ));
        // when not in array, findIndex returns -1
        setDefaultIndex(Math.max(0, filteredIndex));
    }, []);

    const delayedReload = () => {
        setTimeout(() => window.location.reload(true), 1200);
    };

    const handleSelectionChange = index => {
        router.push({
            pathname: router.route,
            query: {
                ...router.query,
                ...dropdownOptions[index].query
            }
        });
    };

    return (
        <div className='row dashboard-posts-header'>
            <div className='offset-lg-6 col-lg-6 col-md-12 col-12'>
                <div className='row'>
                    <div 
                        className='col-5 col-md-7 col-lg-5' 
                        style={{textAlign: 'right', fontSize: '18px'}}
                    >
                        Sort By:
                    </div>
                    <div 
                        className='col-7 col-md-5 col-lg-7'
                        style={{textAlign: 'left'}}
                    >
                        <Dropdown
                            options={dropdownOptions.map(op => op.title)}
                            defaultIndex={defaultIndex}
                            onSelectionChange={handleSelectionChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPostsHeader;
