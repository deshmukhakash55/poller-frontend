import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Main from '../Main/Main';
import NewPoll from '../../components/NewPoll/NewPoll';
import Followings from '../Followings/Followings';
import Notifications from '../../components/Notifications/Notifications';

import * as classes from './Dashboard.module.css';
import Profile from '../../components/Profile/Profile';

const Dashboard = (props) => {
	return (
		<div className={classes.Dashboard}>
			<Navbar />
			<Switch>
				<Route
					exact
					path={`${props.match.path}/main`}
					component={Main}
				/>
				<Route
					exact
					path={`${props.match.path}/new`}
					component={NewPoll}
				/>
				<Route
					exact
					path={`${props.match.path}/followings`}
					component={Followings}
				/>
				<Route
					exact
					path={`${props.match.path}/notifications`}
					component={Notifications}
				/>
				<Route
					exact
					path={`${props.match.path}/profile`}
					component={Profile}
				/>
				<Route render={() => <Redirect to="/d/main" />} />
			</Switch>
		</div>
	);
};

export default Dashboard;
