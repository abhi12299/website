import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStackOverflow, faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faFilePdf } from '@fortawesome/free-regular-svg-icons';

import '../css/introHeader.css';

function IntroHeader() {
	return (
		<section className="top-header style-one pad-125 bg-pattern-2">
			<div className="container">
				<div className="row">
					<div className="col-xl-5 col-md-6 offset-xl-1 text-left">
						<div className='img-placeholder'>
							<img src="../static/png/400.png" alt="avatar" className="avatar-img" />
						</div>
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
							<li className="list-inline-item">
								<a target='_blank' rel='noopener' href="mailto:abhi.9811206369@gmail.com">
									<FontAwesomeIcon className='icon' icon={faGoogle} size='3x' title='Gmail' />
								</a>
							</li>
							<li className="list-inline-item">
								<a href='../static/Abhishek.pdf' download='AbhishekCV'>
									<FontAwesomeIcon className='icon' icon={faFilePdf} size='3x' title='CV' />
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
