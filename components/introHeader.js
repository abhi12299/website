import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStackOverflow, faGithub } from '@fortawesome/free-brands-svg-icons';

import '../css/introHeader.css';

function IntroHeader() {
	return (
		<section className="top-header style-one pad-125 bg-pattern-2">
			<div className="container">
				<div className="row">
					<div className="col-xl-5 col-md-6 offset-xl-1 text-left">
						<img src="https://via.placeholder.com/400.png?text=My+image+here" alt="avatar" className="avatar-img" />
					</div>
					<div className="col-xl-5 col-md-6 text-left">
						<h1> Hi. I'm Abhishek Mehandiratta.</h1>
						<p> I'm a <b>Web Developer</b></p>
						<ul className="social-icons light list-inline">
							<li className="list-inline-item">
								<a target='_blank' rel='noopener' href="https://stackoverflow.com/users/8174895/abhishek-mehandiratta">
									<FontAwesomeIcon className='icon' icon={faStackOverflow} size='3x' title='Stack Overflow' />
								</a>
							</li>
						<li className="list-inline-item">
								<a target='_blank' rel='noopener' href="https://github.com/abhi12299">
									<FontAwesomeIcon className='icon' icon={faGithub} size='3x' title='Github' />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}

export default IntroHeader;
