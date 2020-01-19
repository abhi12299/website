import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStackOverflow, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faFilePdf, faEnvelope } from '@fortawesome/free-regular-svg-icons';

import '../css/introHeader.css';

function IntroHeader() {
	return (
		<section className="top-header style-four bg-pattern">
			<div className="container">
				<div className="row">
					<div className="col-md-12 col-sm-12 text-center">
						<h1 className="title-stroke">Hi</h1>
					</div>
					<div className="col-lg-6 col-md-10 offset-md-1 offset-lg-3 text-center">
						<p> I'm Abhishek Mehandiratta. I am a <b>Web Developer</b></p>

						<ul className="social-icons light list-inline">
							<li className="list-inline-item">
								<div className='social-icons-surround'>
									<a target='_blank' rel='noopener' href="https://github.com/abhi12299">
										<FontAwesomeIcon className='icon' icon={faGithub} size='3x' title='Github' />
									</a>
								</div>
							</li>
							<li className="list-inline-item">
								<div className='social-icons-surround'>
									<a target='_blank' rel='noopener' href="https://stackoverflow.com/users/8174895/abhishek-mehandiratta">
										<FontAwesomeIcon className='icon' icon={faStackOverflow} size='3x' title='Stack Overflow' />
									</a>
								</div>
							</li>
							
							<li className="list-inline-item">
								<div className='social-icons-surround'>
									<a target='_blank' rel='noopener' href="mailto:abhi.9811206369@gmail.com">
										<FontAwesomeIcon className='icon' icon={faEnvelope} size='3x' title='Email' />
									</a>
								</div>
							</li>
							<li className="list-inline-item">
								<div className='social-icons-surround'>
									<a href='../static/pdf/Abhishek.pdf' download='AbhishekCV'>
										<FontAwesomeIcon className='icon' icon={faFilePdf} size='3x' title='CV' />
									</a>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
	);
}

export default IntroHeader;
