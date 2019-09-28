import React, { useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';

import '../css/adminSidebar.css';

function AdminSidebar() {
    useEffect(() => {
        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchmove', handleTouchMove, false);

        var xDown = null;
        var yDown = null;

        function getTouches(evt) {
            return evt.touches || evt.originalEvent.touches;
        }

        function handleTouchStart(evt) {
            const firstTouch = getTouches(evt)[0];
            xDown = firstTouch.clientX;
            yDown = firstTouch.clientY;
        };

        function handleTouchMove(evt) {
            if (!xDown || !yDown) {
                return;
            }

            var xUp = evt.touches[0].clientX;
            var yUp = evt.touches[0].clientY;

            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;

            if (Math.abs(xDiff) > Math.abs(yDiff)) {
                if (xDiff > 0) {
                    // open both sidebars
                    document.querySelectorAll('#adminSidebar .links').forEach(elem => {
                        elem.classList.add('opened');
                        elem.classList.remove('closed');
                    });
                } else {
                    // close both sidebars
                    document.querySelectorAll('#adminSidebar .links').forEach(elem => {
                        elem.classList.add('closed');
                        elem.classList.remove('opened');
                    });
                }
            }
            xDown = null;
            yDown = null;
        };
    }, []);

    return (
        <div id='adminSidebar'>
            <Link href='/dashboard'>
                <div className='button-4 links adminDashboard'>
                    <div className='eff-4' />
                    <a>
                        <FontAwesomeIcon icon={faUser} /> &nbsp;&nbsp;
                        Dashboard
                    </a>
                </div>
            </Link>
            <Link href='/auth/logout'>
                <div className='button-4 links adminLogout'>
                    <div className='eff-4' />
                    <a>
                        <FontAwesomeIcon icon={faSignOutAlt} /> &nbsp;&nbsp;
                        Logout
                    </a>
                </div>
            </Link>
        </div>
    );
}

export default AdminSidebar;
