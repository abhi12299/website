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
                        <img crossOrigin='anonymous' src='https://res.cloudinary.com/dmzk3uux3/image/upload/fl_progressive/v1570726312/portfolio/png/tech-stack-left-banner_vhfeut.png' alt='banner-left' className='banner-right-tech-stack' />
                    </div>
                    <div className='offset-md-1 offset-lg-1 col-lg-6 col-md-6 tech-stack-content' >
                        <h2 className='tech-stack-title'>Technologies I Work With</h2>
                        <div className='row'>
                            {
                                Object.entries(myTechnologies).map(tech => {
                                    return <SingleTechStack key={tech[0]} tech={tech[0]} image={tech[1]} />
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
