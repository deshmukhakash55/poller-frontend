import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Poll from '../../components/Poll/Poll';

import * as classes from './Polls.module.css';

const Polls = (props) => {
	const pollsContent = props.polls.map((poll, index) => (
		<Poll key={index} poll={poll} />
	));

	if (props.isLoadingPolls) {
		return (
			<div className={classes.PollsLoadingSpinner}>
				<CircularProgress />
				<div className={classes.PollsLoadingMessage}>
					Loading Polls...
				</div>
			</div>
		);
	}

	return pollsContent.length > 0 ? (
		pollsContent
	) : (
		<div className={classes.NoPollsMessage}>No Polls to show...</div>
	);
};

export default Polls;
