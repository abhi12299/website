import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import createPagination from '../utils/createPagination';

import '../css/pagination.css';

function Pagination(props) {
    const router = useRouter();
    const {
        pageNo,
        perPage,
        totalItems
    } = props;

    const arr = createPagination({
        items: totalItems, 
        itemsOnPage: perPage, 
        currentPage: pageNo
    });

    const handleClick = p => {
        if (p !== pageNo) {
            router.push({
                pathname: router.route,
                query: {
                    ...router.query,
                    page: p
                }
            });
        }
    };

    const isPrevDisabled = pageNo === arr[0];
    const isNextDisabled = pageNo === arr[arr.length - 1];
    return (
        <div className='row pagination'>
            <div className='col-lg-10 offset-lg-1'>
                <div className='row'>
                    <div className='col-md-3 col-xs-2'>
                        <a 
                            onClick={isPrevDisabled ? null : () => handleClick(pageNo - 1)}
                            className={(isPrevDisabled ? 'disabled' : '') + ' left-button'}
                        >
                            <img src='../static/png/left-botton.png' alt='left-button' />
                        </a>
                    </div>
                    <div className='col-md-6 col-xs-8 text-center'>
                        <ul className='page-nav text-center list-inline'>
                            {arr.map((ele, i) => {
                                return (
                                    <a 
                                        key={i}
                                        className={(ele === pageNo ? 'active ' : '' )+'list-inline-item'}
                                        onClick={typeof ele === 'number' ? () => handleClick(ele) : null}
                                    >
                                        {ele}
                                    </a>
                                );
                            })}
                        </ul>
                    </div>
                    <div className='col-md-3 col-xs-2 text-right'>
                        <a 
                            onClick={isNextDisabled ? null : () => handleClick(pageNo + 1)}
                            className={(isNextDisabled ? 'disabled' : '') + ' left-button'}
                        >
                            <img src='../static/png/right-button.png' alt='right-button' />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

Pagination.propTypes = {
    pageNo: PropTypes.number.isRequired,
    perPage: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired
};

export default Pagination;
