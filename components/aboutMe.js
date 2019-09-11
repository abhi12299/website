import React from 'react';

import '../css/aboutMe.css';

function AboutMe() {
    return (
        <section className='about-me pad-top-50'>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-6 col-md-6 col-sm-12' >
                        <h2 className='about-me-title'>A Little Bit About Me</h2>
                        <div className='about-me-content-bottom'>
                            <p className='about-me-content'>
                                A MERN Stack Developer based in Delhi. I love to learn new things and experiment with new technologies
                                that come about in the web development community.
                                Besides programming, I also love to play video games :)
                                </p>
                            <hr className='sep' />
                            <div className='experience'>
                                <b>Work Experience</b>
                                <ul>
                                    <li>MERN Stack Developer @<a href='https://so.city' target='_blank'>SoDelhi</a></li>
                                </ul>
                            </div>
                            <hr className='sep' />
                            <div className='contact'>
                                <b>Wanna get in touch?</b>
                                <p>Drop me an email at <a href='mailto:abhi.9811206369@gmail.com' target='_blank'>abhi.9811206369@gmail.com</a></p>
                            </div>
                        </div>
                    </div>
                    <div className='d-none d-lg-block d-md-block col-lg-5 col-md-5 offset-md-1 offset-lg-1 text-center my-auto'>
                        <img src='../static/png/about-me.png' alt='banner-right' className='banner-right-about-me' />
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutMe;
