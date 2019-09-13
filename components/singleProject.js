import React from 'react';
import PropTypes from 'prop-types';

import '../css/singleProject.css';

function SingleProject(props) {
    const { project } = props;

    let className = 'col-lg-5 col-md-12 col-11 single-project';

    return (
        <div className={className}>
            <div className='project-heading'>
                { project.title }
            </div>
            <hr className='sep' />
            <div className='project-links'>
                <ul>
                    {
                        project.links.map(l => 
                            <li key={l.name}>
                                <a target='_blank' rel='noopener' href={l.url}>{l.name}</a>
                            </li>
                        )
                    }
                </ul>
            </div>
            <div className='project-text'>
                { project.description }
            </div>
        </div>
    );
}

SingleProject.propTypes = {
    project: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        links: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            url: PropTypes.string.isRequired
        })),
    })
};

export default SingleProject;
