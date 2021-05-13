import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { humanizeTime } from '../../utility/date';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import ReportIcon from '@material-ui/icons/Report';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

import {
	addPollResponseStart,
	bookmarkPollStart,
	reloadPollStart,
	reportPollStart,
	unbookmarkPollStart
} from '../../store/actions/polls.actions';

import * as classes from './Poll.module.css';

const Poll = (props) => {
	const optionBorderColors = [
		'#606060',
		'#ED2B33',
		'#2C5F2D',
		'#FC766A',
		'#5F4B8B',
		'#000000',
		'#F95700',
		'#00203F',
		'#00539C',
		'#B1624E'
	];

	const [shouldOpenReportModal, setShouldOpenReportModal] = useState(false);

	const handleReportClick = () => {
		setShouldOpenReportModal(true);
	};

	const handleReportModalClose = () => {
		setShouldOpenReportModal(false);
	};

	useEffect(() => {
		const endDateTimer = setTimeout(() => {
			props.reloadPollStart(props.poll.id);
		}, new Date(props.poll.endDate).getTime() - new Date().getTime());
		return () => {
			clearTimeout(endDateTimer);
		};
		// eslint-disable-next-line
	}, []);

	const [reason, setReason] = useState('');

	const [anchorEl, setAnchorEl] = useState(null);

	const handlePollOptionsButtonClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePollOptionsClose = () => {
		setAnchorEl(null);
	};

	const handlePollOptionButtonClick = (selectedOptionIndex) => {
		const pollId = props.poll.id;
		props.addPollResponseStart(pollId, selectedOptionIndex);
	};

	const handleReportPollClick = () => {
		props.reportPollStart(props.poll.id, reason);
		setShouldOpenReportModal(false);
	};

	const ifPollIsDisabled = () =>
		props.respondingPollIds.includes(props.poll.id);

	const optionsContent = props.poll.options.map((option, index) => (
		<div key={index} className={classes.PollOption}>
			<Button
				className={classes.PollOptionButton}
				onClick={() => handlePollOptionButtonClick(index)}
				disabled={ifPollIsDisabled()}
				style={{
					borderColor: `${
						optionBorderColors[index % optionBorderColors.length]
					}`
				}}
			>
				{option}
			</Button>
		</div>
	));

	let optionsStatsContent = null;
	if (!!props.poll.pollResponseStats) {
		optionsStatsContent = (
			<React.Fragment>
				{props.poll.pollResponseStats.map((pollResponseStat, index) => (
					<div key={index} className={classes.OptionsStat}>
						<div className={classes.OptionStatResponseNotifier}>
							{pollResponseStat.optionIndex ===
							props.poll.userResponse ? (
								<RadioButtonCheckedIcon color="primary" />
							) : (
								<RadioButtonUncheckedIcon color="primary" />
							)}
						</div>
						<div
							className={[
								classes.OptionStatText,
								pollResponseStat.optionIndex !==
								props.poll.userResponse
									? classes.UnselectedOptionText
									: null
							].join(' ')}
						>
							{props.poll.options[pollResponseStat.optionIndex]}
						</div>
						<div
							className={classes.OptionStat}
							style={{
								borderColor: `${
									optionBorderColors[
										index % optionBorderColors.length
									]
								}`
							}}
						>
							<div
								className={classes.OptionStatHighlight}
								style={{
									backgroundColor: `${
										optionBorderColors[
											pollResponseStat.optionIndex %
												optionBorderColors.length
										]
									}`,
									width: `${pollResponseStat.percentage}%`
								}}
							></div>
						</div>
						<div className={classes.OptionStatPercentage}>
							{pollResponseStat.percentage.toFixed(1)} %
						</div>
					</div>
				))}
				<div className={classes.OptionStatTotalResponsesAndEndDate}>
					<div className={classes.OptionStatTotalResponses}>
						Total Responses : {props.poll.totalResponses}
					</div>
					{new Date(props.poll.endDate) < new Date() ? (
						<div className={classes.OptionStatEndDate}>
							Ended {humanizeTime(new Date(props.poll.endDate))}
						</div>
					) : null}
				</div>
			</React.Fragment>
		);
	}

	let dialogContent = (
		<DialogContent>
			<DialogContentText>
				Please specify the reason why you want to report the poll.
			</DialogContentText>
			<TextField
				variant="outlined"
				label="Reason"
				type="text"
				fullWidth
				value={reason}
				onChange={(event) => setReason(event.target.value)}
				multiline
			/>
		</DialogContent>
	);

	if (props.isReportPollFailure) {
		dialogContent = (
			<DialogContent className={classes.ReportDialogContent}>
				<DialogContentText color="secondary">
					Error reporting poll.
				</DialogContentText>
			</DialogContent>
		);
	}

	if (props.isReportPollSuccess) {
		dialogContent = (
			<DialogContent className={classes.ReportDialogContent}>
				<DialogContentText className={classes.SuccessReportPollText}>
					Successfully reported poll.
				</DialogContentText>
			</DialogContent>
		);
	}

	if (props.isReportPollProgress) {
		dialogContent = (
			<DialogContent className={classes.ReportDialogContent}>
				<DialogContentText className={classes.ProgressReportPollText}>
					<CircularProgress color="primary" />
					<div>Reporting Poll...</div>
				</DialogContentText>
			</DialogContent>
		);
	}

	let dialogActionsContent = (
		<DialogActions>
			<Button onClick={handleReportModalClose} color="secondary">
				Cancel
			</Button>
			<Button onClick={handleReportPollClick} color="primary">
				Report
			</Button>
		</DialogActions>
	);

	if (props.isReportPollFailure || props.isReportPollSuccess) {
		dialogActionsContent = (
			<DialogActions>
				<Button onClick={handleReportModalClose} color="primary">
					Ok
				</Button>
			</DialogActions>
		);
	}

	if (props.isReportPollProgress) {
		dialogActionsContent = null;
	}

	const handleBookmarkClick = () => {
		props.bookmarkPollStart(props.poll.id);
	};

	const handleUnbookmarkClick = () => {
		props.unbookmarkPollStart(props.poll.id);
	};

	return (
		<Paper className={classes.PollPaper} elevation={3}>
			<div className={classes.PollInfo}>
				<div
					className={classes.PolleeAvatar}
					style={{ background: `url(${props.poll.avatar})` }}
				></div>
				<div className={classes.PolleeNameAndPollStartDate}>
					<div className={classes.PolleeName}>
						{props.poll.pollee}
					</div>
					<div className={classes.StartDate}>
						Started {humanizeTime(new Date(props.poll.startDate))}
					</div>
				</div>
				<div className={classes.PollMenuOptions}>
					<IconButton onClick={handlePollOptionsButtonClick}>
						<MoreVertIcon />
					</IconButton>
				</div>
			</div>
			<Divider variant="middle" />
			<div className={classes.PollBlock}>
				<div className={classes.PollQuestion}>
					<HelpIcon color="primary" />
					<span>{props.poll.question}</span>
				</div>
				{!!props.poll.pollResponseStats ? (
					<div className={classes.OptionsStatBlock}>
						{optionsStatsContent}
					</div>
				) : (
					<div className={classes.PollOptions}>{optionsContent}</div>
				)}
			</div>
			<Menu
				anchorEl={anchorEl}
				keepMounted
				open={!!anchorEl}
				onClose={handlePollOptionsClose}
				getContentAnchorEl={null}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
			>
				{!props.poll.hasUserBookmarkedPoll ? (
					<MenuItem
						onClick={handleBookmarkClick}
						className={classes.PollMenuOption}
					>
						<BookmarkIcon color="primary" />
						<span>Bookmark</span>
					</MenuItem>
				) : (
					<MenuItem
						onClick={handleUnbookmarkClick}
						className={classes.PollMenuOption}
					>
						<BookmarkIcon color="secondary" />
						<span>Remove Bookmark</span>
					</MenuItem>
				)}
				{props.poll.hasUserReportedPoll ? null : (
					<MenuItem
						onClick={handleReportClick}
						className={classes.PollMenuOption}
					>
						<ReportIcon color="secondary" />
						<span>Report</span>
					</MenuItem>
				)}
			</Menu>
			<Dialog
				open={shouldOpenReportModal}
				onClose={handleReportModalClose}
			>
				<DialogTitle>Report Poll</DialogTitle>
				{dialogContent}
				{dialogActionsContent}
			</Dialog>
		</Paper>
	);
};

const mapStateToProps = (state) => ({
	isAddPollResponseProgress: state.poll.isAddPollResponseProgress,
	isReportPollProgress: state.poll.isReportPollProgress,
	isReportPollSuccess: state.poll.isReportPollSuccess,
	isReportPollFailure: state.poll.isReportPollFailure,
	respondingPollIds: state.poll.respondingPollIds
});

const mapDispatchToProps = (dispatch) => ({
	addPollResponseStart: (pollId, selectedOptionIndex) =>
		dispatch(addPollResponseStart(pollId, selectedOptionIndex)),
	bookmarkPollStart: (pollId) => dispatch(bookmarkPollStart(pollId)),
	unbookmarkPollStart: (pollId) => dispatch(unbookmarkPollStart(pollId)),
	reportPollStart: (pollId, reason) =>
		dispatch(reportPollStart(pollId, reason)),
	reloadPollStart: (pollId) => dispatch(reloadPollStart(pollId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Poll);
