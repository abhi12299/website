import React from 'react';

import '../css/aboutMe.css';

function AboutMe() {
    return (
        <section className='about-me pad-top-50'>
            <div className='container'>
                <div className='row'>
                    <div className='col-lg-6 col-sm-12' >
                            <h2 className='about-me-title'>A Little Bit About Me</h2>
                        <div className='about-me-content-bottom'>
                            <p className='about-me-content'>
                                A MERN Stack Developer based in Delhi. I love to learn new things and experiment with new technologies
                                that come about in the web development community.
                                Besides programming, I also love to play video games :)
                                </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutMe;
