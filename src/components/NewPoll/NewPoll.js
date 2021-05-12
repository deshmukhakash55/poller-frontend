import React, { useReducer, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import HelpIcon from '@material-ui/icons/Help';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import PollIcon from '@material-ui/icons/Poll';
import Snackbar from '@material-ui/core/Snackbar';
import Tooltip from '@material-ui/core/Tooltip';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import DateFnsUtils from '@date-io/date-fns';
import Chip from '@material-ui/core/Chip';
import {
	KeyboardDatePicker,
	MuiPickersUtilsProvider
} from '@material-ui/pickers';
import EventBusyIcon from '@material-ui/icons/EventBusy';

import * as classes from './NewPoll.module.css';
import { Button, Divider } from '@material-ui/core';
import { addNewPollStart } from '../../store/actions/polls.actions';

const NewPoll = (props) => {
	const [shouldShowSnackbar, setShouldShowSnackbar] = useState(false);

	const getAddButtonOptionIndex = (option, optionIndex) => {
		if (option.trim() === '') {
			return null;
		}
		return optionIndex;
	};

	const { isAddNewPollSuccess, isAddNewPollFailure } = props;

	useEffect(() => {
		if (isAddNewPollFailure || isAddNewPollSuccess) {
			setShouldShowSnackbar(true);
		}
	}, [isAddNewPollSuccess, isAddNewPollFailure]);

	const getShouldEnableStartPollButtonStatus = (
		question,
		options,
		endDate
	) => {
		if (question === '') {
			return false;
		}
		if (options.length === 1) {
			return false;
		}
		if (options.length === 2 && options[1].trim() === '') {
			return false;
		}
		if (!endDate) {
			return false;
		}
		return true;
	};

	const getStartPollButtonTooltipText = (question, options, endDate) => {
		if (question === '') {
			return 'Enter the question';
		}
		if (options.length === 1) {
			return 'Poll should have more than 1 option';
		}
		if (options.length === 2 && options[1].trim() === '') {
			return 'Poll should have more than 1 option';
		}
		if (!endDate) {
			return 'Please enter the end date for poll';
		}
		return 'Start Poll';
	};

	const initialNewPollState = {
		question: '',
		options: [''],
		endDate: null,
		addButtonOptionIndex: null,
		shouldEnableStartPollButton: false,
		startPollButtonTooltipText: 'Enter the question',
		currentTag: '',
		tags: []
	};

	const [poll, dispatch] = useReducer(
		(pollState, action) => {
			switch (action.type) {
				case 'ADD_QUESTION':
					return {
						...pollState,
						question: action.payload.question,
						shouldEnableStartPollButton: getShouldEnableStartPollButtonStatus(
							action.payload.question,
							pollState.options,
							pollState.endDate
						),
						startPollButtonTooltipText: getStartPollButtonTooltipText(
							action.payload.question,
							pollState.options,
							pollState.endDate
						)
					};
				case 'ADD_OPTION':
					const pollOptions = [...pollState.options];
					pollOptions[action.payload.optionIndex] =
						action.payload.option;
					let addButtonOptionIndex = getAddButtonOptionIndex(
						action.payload.option,
						pollOptions.length - 1
					);
					return {
						...pollState,
						options: [...pollOptions],
						addButtonOptionIndex,
						shouldEnableStartPollButton: getShouldEnableStartPollButtonStatus(
							pollState.question,
							pollOptions,
							pollState.endDate
						),
						startPollButtonTooltipText: getStartPollButtonTooltipText(
							pollState.question,
							pollOptions,
							pollState.endDate
						)
					};
				case 'REMOVE_OPTION':
					const updatedPollOptions = pollState.options.filter(
						(option, index) => index !== action.payload.optionIndex
					);
					const lastOption =
						updatedPollOptions[updatedPollOptions.length - 1];
					let newAddButtonOptionIndex = getAddButtonOptionIndex(
						lastOption,
						updatedPollOptions.length - 1
					);
					return {
						...pollState,
						options: [...updatedPollOptions],
						addButtonOptionIndex: newAddButtonOptionIndex,
						shouldEnableStartPollButton: getShouldEnableStartPollButtonStatus(
							pollState.question,
							updatedPollOptions,
							pollState.endDate
						),
						startPollButtonTooltipText: getStartPollButtonTooltipText(
							pollState.question,
							updatedPollOptions,
							pollState.endDate
						)
					};
				case 'ADD_END_DATE':
					return {
						...pollState,
						endDate: action.payload.date,
						shouldEnableStartPollButton: getShouldEnableStartPollButtonStatus(
							pollState.question,
							pollState.options,
							action.payload.date
						),
						startPollButtonTooltipText: getStartPollButtonTooltipText(
							pollState.question,
							pollState.options,
							action.payload.date
						)
					};
				case 'UPDATE_CURRENT_TAG':
					return {
						...pollState,
						currentTag: action.payload.currentTag
					};
				case 'ADD_TAG':
					if (action.payload.tag === '') {
						return {
							...pollState,
							currentTag: ''
						};
					}
					return {
						...pollState,
						currentTag: '',
						tags: [...pollState.tags, action.payload.tag.trim()]
					};
				case 'DELETE_TAG':
					const updatedTags = pollState.tags.filter(
						(tag, index) => index !== action.payload.tagIndex
					);
					return {
						...pollState,
						currentTag: '',
						tags: [...updatedTags]
					};
				case 'RESET':
					return { ...initialNewPollState };
				default:
					return { ...pollState };
			}
		},
		{ ...initialNewPollState }
	);

	const optionsContent = poll.options.map((option, index) => (
		<div key={index} className={classes.PollOption}>
			{poll.options.length > 1 ? (
				<CancelIcon
					color="secondary"
					className={classes.CancelPollOptionButton}
					onClick={() =>
						dispatch({
							type: 'REMOVE_OPTION',
							payload: { optionIndex: index }
						})
					}
				/>
			) : null}
			<div className={classes.FormControl}>
				<FormControl fullWidth variant="outlined">
					<TextField
						label="Enter your option here....."
						variant="outlined"
						required
						disabled={props.isAddNewPollProgress}
						multiline
						onChange={(event) =>
							dispatch({
								type: 'ADD_OPTION',
								payload: {
									optionIndex: index,
									option: event.target.value
								}
							})
						}
						value={option}
						type="text"
					/>
				</FormControl>
			</div>
			{index === poll.addButtonOptionIndex ? (
				<AddCircleIcon
					className={classes.AddMoreOptionButton}
					color="primary"
					onClick={() =>
						dispatch({
							type: 'ADD_OPTION',
							payload: {
								optionIndex: poll.options.length,
								option: ''
							}
						})
					}
				/>
			) : null}
		</div>
	));

	const handleStartPollClick = (event) => {
		const newPoll = {
			question: poll.question,
			options: poll.options,
			endDate: poll.endDate,
			tags: poll.tags
		};
		props.addNewPollStart(newPoll);
		dispatch({ type: 'RESET' });
	};

	return (
		<div className={classes.NewPollContent}>
			<Paper className={classes.NewPollBlock} elevation={3}>
				<div className={classes.NewPollTitleBlock}>
					<PollIcon color="primary" />
					<div className={classes.NewPollTitle}>New Poll</div>
				</div>
				<Divider variant="middle" />
				<div
					className={[
						classes.FormControl,
						classes.NewPollQuestion
					].join(' ')}
				>
					<HelpIcon color="primary" />
					<FormControl fullWidth variant="outlined">
						<TextField
							label="Enter your question here....."
							variant="outlined"
							required
							disabled={props.isAddNewPollProgress}
							multiline
							value={poll.question}
							type="text"
							onChange={(event) =>
								dispatch({
									type: 'ADD_QUESTION',
									payload: { question: event.target.value }
								})
							}
						/>
					</FormControl>
				</div>
				<Divider variant="middle" />
				<div className={classes.PollOptions}>{optionsContent}</div>
				<Divider variant="middle" />
				<div className={classes.PollEndDateBlock}>
					<EventBusyIcon
						className={classes.EndDateIcon}
						color="primary"
					/>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<KeyboardDatePicker
							className={classes.PollEndDateInput}
							disableToolbar
							variant="inline"
							format="MM/dd/yyyy"
							margin="normal"
							label="End Date"
							disabled={props.isAddNewPollProgress}
							minDate={new Date().setDate(
								new Date().getDate() + 1
							)}
							minDateMessage="Poll should be active for atleast a day and should be in future"
							value={poll.endDate}
							onChange={(date) =>
								dispatch({
									type: 'ADD_END_DATE',
									payload: { date }
								})
							}
						/>
					</MuiPickersUtilsProvider>
				</div>
				<Divider variant="middle" />
				<div className={classes.TagsInputBlock}>
					<div
						className={[
							classes.FormControl,
							classes.TagsInput
						].join(' ')}
					>
						<LocalOfferIcon color="primary" />
						<FormControl fullWidth variant="outlined">
							<TextField
								label="Tags"
								variant="outlined"
								multiline
								value={poll.currentTag}
								type="text"
								disabled={props.isAddNewPollProgress}
								onChange={(event) =>
									dispatch({
										type: 'UPDATE_CURRENT_TAG',
										payload: {
											currentTag: event.target.value
										}
									})
								}
								onBlur={(event) =>
									dispatch({
										type: 'ADD_TAG',
										payload: { tag: event.target.value }
									})
								}
								onKeyUp={(event) => {
									if (event.keyCode === 13) {
										dispatch({
											type: 'ADD_TAG',
											payload: { tag: event.target.value }
										});
									}
								}}
							/>
						</FormControl>
					</div>
					<div className={classes.Tags}>
						<ul className={classes.TagsList}>
							{poll.tags.map((tag, index) => (
								<li key={index}>
									<Chip
										label={tag}
										onDelete={() =>
											dispatch({
												type: 'DELETE_TAG',
												payload: { tagIndex: index }
											})
										}
									/>
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className={classes.NewPollActions}>
					<Tooltip
						arrow={true}
						placement={'top'}
						title={poll.startPollButtonTooltipText}
					>
						<span>
							<Button
								color="primary"
								onClick={handleStartPollClick}
								disabled={
									!poll.shouldEnableStartPollButton ||
									props.isAddNewPollProgress
								}
							>
								Start Poll
							</Button>
						</span>
					</Tooltip>
					<Button
						color="secondary"
						disabled={props.isAddNewPollProgress}
						onClick={(event) => dispatch({ type: 'RESET' })}
					>
						Reset
					</Button>
				</div>
			</Paper>
			<Snackbar
				open={shouldShowSnackbar}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				onClose={() => setShouldShowSnackbar(false)}
				ContentProps={{
					className: props.isAddNewPollFailure
						? classes.AddNewPollFailure
						: classes.AddNewPollSuccess
				}}
				autoHideDuration={6000}
				message={
					props.isAddNewPollFailure
						? 'Creating new poll failed. Try again.'
						: 'Started new poll successfully'
				}
			></Snackbar>
		</div>
	);
};

const mapStateToProps = (state) => ({
	isAddNewPollProgress: state.poll.isAddNewPollProgress,
	isAddNewPollSuccess: state.poll.isAddNewPollSuccess,
	isAddNewPollFailure: state.poll.isAddNewPollFailure,
	addNewPollError: state.poll.addNewPollError,
	userId: state.auth.loggedInUserId
});

const mapDispatchToProps = (dispatch) => ({
	addNewPollStart: (poll) => dispatch(addNewPollStart(poll))
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPoll);
