import React from 'react';
import User from '../../components/User/User';

const Users = (props) => {
	const userContents = props.users.map((user, index) => (
		<User reloadUser={props.onReloadUsers} key={index} user={user} />
	));
	return userContents;
};

export default Users;
