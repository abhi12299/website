import React from 'react';

import SingleProject from './singleProject';
import myProjects  from '../constants/myProjects';
import '../css/projects.css';

function Projects() {
    return (
        <section className='container projects'>
                <h2 className='title'>My Projects</h2>
                <div className='row justify-content-center projects-container'>
                    {
                        myProjects.map((proj, i) => 
                        <SingleProject 
                            index={i}
                            project={proj}
                            key={proj.title} 
                        />)
                    }
                </div>
        </section>
    );
}

export default Projects;
