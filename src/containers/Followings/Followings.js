import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import NewPollButton from '../../components/NewPollButton/NewPollButton';
import Following from '../../components/Following/Following';
import { loadFollowingsStart } from '../../store/actions/following.actions';

import * as classes from './Followings.module.css';

const Followings = (props) => {
	useEffect(() => {
		props.loadFollowingsStart();
		//eslint-disable-next-line
	}, []);

	const handleReloadFollowings = () => props.loadFollowingsStart();

	const followingsContent = props.followings.map((following, index) => (
		<Following
			key={index}
			reloadFollowings={handleReloadFollowings}
			following={following}
		/>
	));
	const followersContent = props.followers.map((follower, index) => (
		<Following
			key={index}
			reloadFollowings={handleReloadFollowings}
			following={follower}
		/>
	));
	return (
		<React.Fragment>
			<div className={classes.FollowingBlockTitle}>Following</div>
			{followingsContent.length > 0 ? (
				followingsContent
			) : (
				<Paper className={classes.EmptyFollowings} elevation={3}>
					Looks like you're not following any user
				</Paper>
			)}
			<div className={classes.FollowingBlockTitle}>Followed by</div>
			{followersContent.length > 0 ? (
				followersContent
			) : (
				<Paper className={classes.EmptyFollowings} elevation={3}>
					No followers
				</Paper>
			)}

			<NewPollButton />
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	followings: state.following.followings,
	followers: state.following.followers
});

const mapDispatchToProps = (dispatch) => ({
	loadFollowingsStart: () => dispatch(loadFollowingsStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Followings);
