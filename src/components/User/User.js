import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import {
	addNewFollowingStart,
	removeFollowingStart
} from '../../store/actions/following.actions';

import * as classes from './User.module.css';
import { humanizeTime } from '../../utility/date';

const User = (props) => {
	const [
		shouldReloadAfterOperationSuccess,
		setShouldReloadAfterOperationSuccess
	] = useState(false);

	const interestsContent = props.user.interests.map((interest, index) => (
		<Chip key={index} label={interest} />
	));

	const { isAddNewFollowingSuccess, isRemoveFollowingSuccess } = props;

	useEffect(() => {
		if (
			shouldReloadAfterOperationSuccess &&
			(isAddNewFollowingSuccess || isRemoveFollowingSuccess)
		) {
			props.reloadUser();
			setShouldReloadAfterOperationSuccess(false);
		}
		// eslint-disable-next-line
	}, [
		isAddNewFollowingSuccess,
		isRemoveFollowingSuccess,
		shouldReloadAfterOperationSuccess
	]);

	const handleFollowClick = () => {
		props.addNewFollowingStart(props.user.id);
		setShouldReloadAfterOperationSuccess(true);
	};

	const handleUnfollowClick = () => {
		props.removeFollowingStart(props.user.id);
		setShouldReloadAfterOperationSuccess(true);
	};

	return (
		<Paper className={classes.UserPaper} elevation={3}>
			<div className={classes.UserAvatarNameAndJoinedOn}>
				<div
					className={classes.UserAvatar}
					style={{ background: `url(${props.user.avatar})` }}
				></div>
				<div className={classes.UserNameAndJoinedOn}>
					<div className={classes.UserName}>{props.user.name}</div>
					<div className={classes.UserJoinedOn}>
						Joined {humanizeTime(new Date(props.user.joinedOn))}
					</div>
				</div>
			</div>
			<div className={classes.Interests}>{interestsContent}</div>
			<div className={classes.Follow}>
				{!props.user.followingId ? (
					<Button
						onClick={handleFollowClick}
						variant="outlined"
						color="primary"
					>
						Follow
					</Button>
				) : (
					<Button
						onClick={handleUnfollowClick}
						variant="outlined"
						color="secondary"
					>
						Unfollow
					</Button>
				)}
			</div>
		</Paper>
	);
};

const mapStateToProps = (state) => ({
	isAddNewFollowingSuccess: state.following.isAddNewFollowingSuccess,
	isRemoveFollowingSuccess: state.following.isRemoveFollowingSuccess
});

const mapDispatchToProps = (dispatch) => ({
	addNewFollowingStart: (followee) =>
		dispatch(addNewFollowingStart(followee)),
	removeFollowingStart: (followee) => dispatch(removeFollowingStart(followee))
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
