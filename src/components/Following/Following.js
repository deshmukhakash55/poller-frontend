import React from 'react';
import User from '../User/User';

import * as classes from './Following.module.css';

const Following = (props) => {
	return (
		<div className={classes.Following}>
			<User reloadUser={props.reloadFollowings} user={props.following} />
		</div>
	);
};

export default Following;
