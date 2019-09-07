import React, { useState, useEffect, createRef } from 'react';
import Link from 'next/link';
import $ from 'jquery';

import '../css/header.css';

const Header = () => {
    let [showMenu, toggleMenu] = useState(false);

    const header = createRef();

    // on scroll, toggle sticky class
    useEffect(() => {
        const headerComponent = header.current;
        
        if (headerComponent) {
            const initialHeaderOffset = headerComponent.offsetTop;
            if (window.pageYOffset > initialHeaderOffset) {
                headerComponent.classList.add('sticky');
            }

            window.onscroll = () => {
                if (window.pageYOffset <= initialHeaderOffset) {
                    headerComponent.classList.remove('sticky');                    
                }
                if (window.pageYOffset > headerComponent.offsetTop) {
                    headerComponent.classList.add('sticky');
                }
            }
        }
    }, []);

    const handleMenuToggle = e => {
        const expander = e.target.closest('.menu-click');
        if (expander) {
            if (expander.classList.contains('open')) {
                toggleMenu(false);
            } else {
                toggleMenu(true);
            }
            $('#main-menu').slideToggle(200);
        }
    }

    return (
        <section className='header-wrapper' ref={header}>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-2 col-md-12 text-left'>
                        <Link href='/' scroll={true}>
                            <a className='logo'>
                                <img src='https://via.placeholder.com/60.png?text=AM' alt='logo' />
                            </a>
                        </Link>
                        <a className={'menu-click' + (showMenu ? ' open': '')} onClick={handleMenuToggle}><span></span><span></span><span></span></a>
                    </div>
                    <div className='col-lg-8 col-md-12'>
                        <nav id='main-menu' className='text-center'>
                            <ul>
                                <li>
                                    <a>Home</a>
                                </li>
                                <li>
                                    <a>About Me</a>
                                </li>
                                <li>
                                    <a>Contact</a>
                                </li>
                                <li>
                                    <a href='../static/Abhishek.pdf' download='abhishek'>Get My CV</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    {/* <div className='col-lg-2 col-md-4 text-right'>
                        <a className='search-icon' onClick={() => console.log('click')}><img className='search-area' src='../static/icons8-search-50.png' /></a>
                    </div> */}
                </div>
            </div>
        </section>
    );
}

export default Header;
