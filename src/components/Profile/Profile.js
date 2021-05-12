import React, { useReducer, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Snackbar from '@material-ui/core/Snackbar';
import NewPollButton from '../NewPollButton/NewPollButton';
import AccountBox from '@material-ui/icons/AccountBox';
import DeleteIcon from '@material-ui/icons/Delete';

import * as classes from './Profile.module.css';
import {
	loadProfileStart,
	updateProfileStart
} from '../../store/actions/profile.actions';

const Profile = (props) => {
	const [shouldShowSnackbar, setShouldShowSnackbar] = useState(false);
	useEffect(() => {
		props.loadProfileStart();
		// eslint-disable-next-line
	}, []);

	const [avatar, setAvatar] = useState('');
	const [avatarFileSource, setAvatarFileSource] = useState('');

	const { isUpdateProfileSuccess, isUpdateProfileFailure } = props;

	useEffect(() => {
		if (isUpdateProfileFailure || isUpdateProfileSuccess) {
			setShouldShowSnackbar(true);
		}
	}, [isUpdateProfileSuccess, isUpdateProfileFailure]);

	const { profile } = props;

	useEffect(() => {
		if (!profile) {
			return;
		}
		dispatch({
			type: 'INITIALIZE_INTERESTS',
			payload: { interests: profile.interests || [] }
		});
	}, [profile]);

	const [isProfileUpdated, setIsProfileUpdated] = useState(false);

	const [interests, dispatch] = useReducer(
		(interestsState, action) => {
			switch (action.type) {
				case 'UPDATE_CURRENT_INTEREST':
					return {
						...interestsState,
						currentInterest: action.payload.currentInterest
					};
				case 'ADD_INTEREST':
					setIsProfileUpdated(true);
					if (action.payload.interest === '') {
						return {
							...interestsState,
							currentInterest: ''
						};
					}
					return {
						...interestsState,
						currentInterest: '',
						interests: [
							...interestsState.interests,
							action.payload.interest.trim()
						]
					};
				case 'DELETE_INTEREST':
					setIsProfileUpdated(true);
					const updatedInterests = interestsState.interests.filter(
						(interest, index) =>
							index !== action.payload.interestIndex
					);
					return {
						...interestsState,
						currentInterest: '',
						interests: [...updatedInterests]
					};
				case 'INITIALIZE_INTERESTS':
					return {
						...interestsState,
						interests: [...action.payload.interests]
					};
				default:
					return { ...interestsState };
			}
		},
		{ currentInterest: '', interests: [] }
	);

	const handleProfileUpdateClick = () => {
		const updatedProfile = { avatar, interests: interests.interests };
		props.updateProfileStart(updatedProfile);
		setAvatar('');
		setAvatarFileSource('');
	};

	const handleCancelClick = () => {
		setAvatar('');
		setAvatarFileSource('');
		dispatch({
			type: 'INITIALIZE_INTERESTS',
			payload: { interests: profile.interests }
		});
	};

	const getProfileAvatar = () => {
		if (!!avatarFileSource) {
			return avatarFileSource;
		}
		return profile ? profile.avatar : null;
	};

	return (
		<React.Fragment>
			<div className={classes.ProfileContent}>
				<Paper className={classes.ProfilePaper} elevation={3}>
					<div className={classes.ProfileTitle}>
						<AccountBox color="primary" />
						<div className={classes.ProfileTitleText}>Profile</div>
					</div>
					<Divider
						variant="fullWidth"
						className={classes.ProfileDivider}
					/>
					<div
						className={classes.Avatar}
						style={{ background: `url(${getProfileAvatar()})` }}
					></div>
					<div className={classes.ProfileImageInput}>
						<input
							accept="image/*"
							className={classes.ProfileFileInput}
							id="profile-input"
							multiple={false}
							onChange={(event) => {
								setAvatar(event.target.files[0]);
								if (event.target.files.length > 0) {
									setIsProfileUpdated(true);
									const reader = new FileReader();
									reader.readAsDataURL(event.target.files[0]);
									reader.onloadend = function (e) {
										setAvatarFileSource(reader.result);
									};
								}
							}}
							type="file"
						/>
						{avatar.name ? (
							<div className={classes.UploadFileNameBlock}>
								<div>{avatar.name}</div>
								<DeleteIcon
									className={classes.UploadFileDeleteIcon}
									onClick={() => {
										setAvatar('');
										setAvatarFileSource('');
									}}
								/>
							</div>
						) : null}
						<label
							className={classes.UploadButton}
							htmlFor="profile-input"
						>
							<Button
								variant="contained"
								color="primary"
								component="span"
								disabled={props.isUpdateProfileProgress}
							>
								Upload new avatar
							</Button>
						</label>
					</div>
					<Divider
						className={classes.ProfileDivider}
						variant="fullWidth"
					/>
					<div className={classes.ProfileNameInput}>
						<TextField
							className={classes.ProfileTextFields}
							label="Name"
							variant="outlined"
							required
							disabled
							value={profile ? profile.name : ''}
							type="text"
						/>
					</div>
					<Divider
						className={classes.ProfileDivider}
						variant="fullWidth"
					/>
					<div className={classes.ProfileEmailInput}>
						<TextField
							className={classes.ProfileTextFields}
							label="Email"
							variant="outlined"
							required
							disabled
							value={profile ? profile.email : ''}
							type="email"
						/>
					</div>
					<Divider
						className={classes.ProfileDivider}
						variant="fullWidth"
					/>
					<div className={classes.ProfileInterestsInput}>
						<TextField
							label="Interests"
							variant="outlined"
							className={classes.ProfileTextFields}
							multiline
							disabled={props.isUpdateProfileProgress}
							value={interests.currentInterest}
							type="text"
							onChange={(event) =>
								dispatch({
									type: 'UPDATE_CURRENT_INTEREST',
									payload: {
										currentInterest: event.target.value
									}
								})
							}
							onBlur={(event) =>
								dispatch({
									type: 'ADD_INTEREST',
									payload: { interest: event.target.value }
								})
							}
							onKeyUp={(event) => {
								if (event.keyCode === 13) {
									dispatch({
										type: 'ADD_INTEREST',
										payload: {
											interest: event.target.value
										}
									});
								}
							}}
						/>
					</div>
					<div className={classes.Interests}>
						<ul className={classes.InterestsList}>
							{interests.interests.map((interest, index) => (
								<li key={index}>
									<Chip
										label={interest}
										onDelete={() =>
											dispatch({
												type: 'DELETE_INTEREST',
												payload: {
													interestIndex: index
												}
											})
										}
									/>
								</li>
							))}
						</ul>
					</div>
					<div className={classes.ProfileActions}>
						<Button
							disabled={
								!isProfileUpdated ||
								props.isUpdateProfileProgress
							}
							variant="outlined"
							color="primary"
							onClick={handleProfileUpdateClick}
						>
							Update
						</Button>
						<Button
							disabled={
								!isProfileUpdated ||
								props.isUpdateProfileProgress
							}
							variant="outlined"
							onClick={handleCancelClick}
							color="secondary"
						>
							Cancel
						</Button>
					</div>
				</Paper>
			</div>
			<NewPollButton />

			<Snackbar
				open={shouldShowSnackbar}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				onClose={() => setShouldShowSnackbar(false)}
				ContentProps={{
					className: props.isUpdateProfileFailure
						? classes.UpdateProfileFailure
						: classes.UpdateProfileSuccess
				}}
				autoHideDuration={6000}
				message={
					props.isUpdateProfileFailure
						? 'Updating failed. Try again.'
						: 'Profile updated successfully'
				}
			></Snackbar>
		</React.Fragment>
	);
};

const mapStateToProps = (state) => ({
	profile: state.profile.profile,
	isUpdateProfileProgress: state.profile.isUpdateProfileProgress,
	isUpdateProfileSuccess: state.profile.isUpdateProfileSuccess,
	isUpdateProfileFailure: state.profile.isUpdateProfileFailure
});

const mapDispatchToProps = (dispatch) => ({
	loadProfileStart: () => dispatch(loadProfileStart()),
	updateProfileStart: (profile) => dispatch(updateProfileStart(profile))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
