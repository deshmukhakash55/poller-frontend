import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import {
	loadRecommendedFollowingsStart,
	addNewFollowingStart,
	clearAddNewFollowingSuccess
} from '../../store/actions/following.actions';

import * as classes from './RecommendedUsers.module.css';

const RecommendedUsers = (props) => {
	const [pageNo, setPageNo] = useState(1);

	const handleShowMoreClick = () => {
		props.loadRecommendedFollowingsStart(pageNo + 1);
		setPageNo(pageNo + 1);
	};

	const { recommendedFollowings, isAddNewFollowingSuccess } = props;

	useEffect(() => {
		if (recommendedFollowings.length < 3 && isAddNewFollowingSuccess) {
			props.loadRecommendedFollowingsStart(pageNo + 1);
			setPageNo(pageNo + 1);
		}
		props.clearAddNewFollowingSuccess();
		// eslint-disable-next-line
	}, [recommendedFollowings, isAddNewFollowingSuccess]);

	useEffect(() => {
		if (recommendedFollowings.length === 0) {
			props.loadRecommendedFollowingsStart(pageNo);
		}
		// eslint-disable-next-line
	}, []);

	const handleFollowClick = (followeeId) => {
		props.addNewFollowingStart(followeeId);
	};

	const recommendedFollowingsContent = props.recommendedFollowings.map(
		(recommendedFollowing, index) => (
			<React.Fragment key={index}>
				<ListItem alignItems="flex-start">
					<ListItemAvatar className={classes.AvatarBlock}>
						<div
							className={classes.Avatar}
							style={{
								background: `url(${recommendedFollowing.avatar})`
							}}
						></div>
					</ListItemAvatar>
					<ListItemText
						primary={
							<div className={classes.User}>
								<div className={classes.UserName}>
									{recommendedFollowing.name}
								</div>
								<Button
									onClick={() =>
										handleFollowClick(
											recommendedFollowing.userId
										)
									}
									variant="outlined"
									color="primary"
								>
									Follow
								</Button>
							</div>
						}
					/>
				</ListItem>
				{index < props.recommendedFollowings.length - 1 ||
				props.hasMoreRecommendedFollowings ? (
					<Divider variant="fullWidth" component="li" />
				) : null}
			</React.Fragment>
		)
	);

	const recommendedFollowingsBlock = props.recommendedFollowings.length ? (
		<Paper elevation={3} className={classes.RecommendedUsers}>
			<List className={classes.root}>
				<ListItem alignItems="flex-start">
					<ListItemText
						primary={
							<div className={classes.RecommendedUsersTitle}>
								<PeopleAltIcon color="primary" />
								<div>Recommended Users</div>
							</div>
						}
					/>
				</ListItem>
				<Divider variant="fullWidth" />
				{recommendedFollowingsContent}
				{props.hasMoreRecommendedFollowings ? (
					<ListItem alignItems="flex-start">
						<ListItemText
							primary={
								<div
									onClick={handleShowMoreClick}
									className={classes.ShowMore}
								>
									Show more...
								</div>
							}
						/>
					</ListItem>
				) : null}
			</List>
		</Paper>
	) : null;

	return (
		<div className={classes.RecommendedUsers}>
			{recommendedFollowingsBlock}
		</div>
	);
};

const mapStateToProps = (state) => ({
	recommendedFollowings: state.following.recommendedFollowings,
	hasMoreRecommendedFollowings: state.following.hasMoreRecommendedFollowings,
	isAddNewFollowingSuccess: state.following.isAddNewFollowingSuccess
});

const mapDispatchToProps = (dispatch) => ({
	loadRecommendedFollowingsStart: (pageNo) =>
		dispatch(loadRecommendedFollowingsStart(pageNo)),
	addNewFollowingStart: (followee) =>
		dispatch(addNewFollowingStart(followee)),
	clearAddNewFollowingSuccess: () => dispatch(clearAddNewFollowingSuccess())
});

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedUsers);
