import React from 'react';

import SingleTechStack from './singleTechComponent';
import myTechnologies from '../constants/myTechnologies';

import '../css/techStack.css';

const TechStack = () => {
    return (
        <section className='tech-stack pad-top'>
            <div className='container'>
                <div className='row'>
                    <div className='d-none d-lg-block d-md-block col-lg-5 col-md-5 text-center my-auto'>
                        <img src='../static/tech-stack-left-banner.png' alt='banner-left' className='banner-right-tech-stack' />
                    </div>
                    <div className='offset-md-1 offset-lg-1 col-lg-6 col-md-6 col-sm-12 tech-stack-content' >
                        <h2 className='tech-stack-title'>Technologies I Work With</h2>
                        <div className='row'>
                            {
                                myTechnologies.map(tech => {
                                    return <SingleTechStack key={tech} tech={tech} />
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TechStack;
