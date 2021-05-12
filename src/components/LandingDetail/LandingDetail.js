import React from 'react';

import * as classes from './LandingDetail.module.css';

const LandingDetail = () => {
	return (
		<div className={classes.LogoAndDetail}>
			<div className={classes.Logo}></div>
			<div className={classes.Detail}>
				Hey there, Welcome to Poller!
				<br />
				<p>
					Polls are important part of our decision making everyday. It
					influences the way we think and act. So we, at Poller
					provide the platform to take up your polls around the globe.
					We make all the effort to make sure all your data and
					responses are left confidential.
				</p>
				<p className={classes.LandingContactDetail}>
					In case of any issues, contact{' '}
					<a
						className={classes.Email}
						href="mailto:deshmukhakash9689750481@gmail.com"
					>
						deshmukhakash9689750481@gmail.com
					</a>
					.
				</p>
			</div>
		</div>
	);
};

export default LandingDetail;
