import React from 'react';

import UploadMediaButton from './uploadMediaButton';
import Dropdown from '../dropdown';

import '../../css/dashboard/mediaHeader.css';

const dropdownOptions = [
    'Time (Latest first)',
    'Time (Oldest first)',
    'Usage Freq (Desc)',
    'Usage Freq (Asc)'
];

function MediaHeader() {
    const delayedReload = () => {
        setTimeout(() => window.location.reload(true), 1200);
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
                            options={dropdownOptions}
                            defaultIndex={0}
                            onSelectionChange={console.log}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MediaHeader;
