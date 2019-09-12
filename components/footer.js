import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faStackOverflow, faGithub } from '@fortawesome/free-brands-svg-icons';
import toastr from 'toastr';
import fetch from 'isomorphic-unfetch';

import LoadingSVG from './loadingSVG';
import comingSoonToast from '../utils/comingSoonToast';
import goToPage from '../utils/goToPage';
import '../css/footer.css';

function Footer() {
    let [email, setEmail] = useState('');
    let [loading, setLoading] = useState(false);

    const handleSubscribe = async e => {
        e.preventDefault();
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        toastr.options = { positionClass: 'toast-bottom-right', };
        if (!emailRegex.test(email)) {
            toastr.error('Please enter a valid email address!');
        } else {
            setLoading(true);
            try {
                const resp = await fetch('/api/subscribe', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                });
                const result = await resp.json();
                setLoading(false);
                if (result.error) {
                    throw new Error(result.msg);
                }
                toastr.success('Get ready to receive awesome content!');
                setEmail('');
            } catch (err) {
                toastr.error(err.message || 'Something went wrong! Please try again later.');
            }
        }
    };

    return (
        <section className='footer-wrapper pad-50 bg-lightblue style-2'>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-3 col-md-4 col-12 widget'>
                        <a className='logo' onClick={() => goToPage('/')}>
                            <img src='../static/png/logo.png' alt='logo' />
                        </a>
                    </div>
                    <div className='col-lg-3 col-md-4 col-sm-5 col-5 widget footer-link-list-1'>
                        <ul className='widget-link'>
                            <li>
                                <a onClick={() => goToPage('/')}>Home</a>
                            </li>

                            <li>
                                <a onClick={comingSoonToast}>Blog</a>
                            </li>
                        </ul>
                    </div>
                    <div className='col-lg-3 col-md-4 col-5 widget'>
                        <ul className='widget-link'>
                            <li>
                                <a onClick={() => goToPage('/', { scrollToElement: '.about-me' })}>About</a>
                            </li>
                            <li>
                                <a onClick={() => goToPage('/', { scrollToElement: '.contact' })}>Contact</a>
                            </li>
                        </ul>
                    </div>
                    <div className='col-lg-3  col-md-12 widget subscribe-form'>
                        <span className='widget-title'>Subscribe for awesome blogs</span>
                        <form onSubmit={handleSubscribe} className='mt-3'>
                            <input
                                type='email'
                                placeholder='Your email address'
                                onChange={e => setEmail(e.target.value)}
                                value={email}
                            />
                            {
                                loading ?
                                    <LoadingSVG className='subscribe-btn' width='20px' height='15px' /> :
                                    <button className='subscribe-btn'>
                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </button>
                            }
                        </form>
                    </div>
                </div>
                <div className='row pad-top-50'>
                    <div className='col-lg-3 col-md-4 widget social-share-container'>
                        <ul className='social-share list-inline'>
                            <li className='list-inline-item'>
                                <a target='_blank' rel='noopener' href="https://github.com/abhi12299">
                                    <FontAwesomeIcon className='icon' icon={faGithub} title='Github' />
                                </a>
                            </li>
                            <li className='list-inline-item'>
                                <a target='_blank' rel='noopener' href="https://stackoverflow.com/users/8174895/abhishek-mehandiratta">
                                    <FontAwesomeIcon className='icon' icon={faStackOverflow} title='Stack Overflow' />
                                </a>
                            </li>
                            <li className='list-inline-item'>
                                <a target='_blank' rel='noopener' href="mailto:abhi.9811206369@gmail.com">
                                    <FontAwesomeIcon className='icon' icon={faEnvelope} title='Email' />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Footer;
