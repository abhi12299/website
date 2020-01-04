import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import UploadMediaButton from './uploadMediaButton';
import Dropdown from '../dropdown';

import '../../css/dashboard/mediaHeader.css';

const dropdownOptions = [
    { title: 'Time (Latest first)', query: {sortBy: 'createdAt', sortOrder: '-1', page: 1} },
    { title: 'Time (Oldest first)', query: {sortBy: 'createdAt', sortOrder: '1', page: 1} },
    { title: 'Usage Freq (Desc)', query: {sortBy: 'usedInPosts', sortOrder: '-1', page: 1} },
    { title: 'Usage Freq (Asc)', query: {sortBy: 'usedInPosts', sortOrder: '1', page: 1} }
];

function MediaHeader() {
    const router = useRouter();
    let [defaultIndex, setDefaultIndex] = useState(0);

    useEffect(() => {
        // by default sort by time latest first
        const { sortBy='createdAt', sortOrder='-1' } = router.query;
        const filteredOpts = dropdownOptions.findIndex(op => (
            op.query.sortBy === sortBy && 
            op.query.sortOrder === sortOrder
        ));
        // when not in array, findIndex returns -1
        setDefaultIndex(Math.max(0, filteredOpts));
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
        <div className='row container media-header'>
            <div className='col-6'>
                <UploadMediaButton 
                    onUploadComplete={delayedReload}
                />
            </div>
            <div className='col-6'>
                <div className='row'>
                    <div 
                        className='col-5' 
                        style={{textAlign: 'right', fontSize: '23px'}}
                    >
                        Sort By:
                    </div>
                    <div 
                        className='col-7'
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

export default MediaHeader;
