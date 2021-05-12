import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Polls from '../Polls/Polls';
import { loadEndedPollsStart } from '../../store/actions/polls.actions';

const EndedPolls = (props) => {
	useEffect(() => {
		props.loadEndedPollsStart();
		//eslint-disable-next-line
	}, []);

	return (
		<Polls
			isLoadingPolls={props.isLoadEndedPollsProgress}
			polls={props.endedPolls}
		/>
	);
};

const mapStateToProps = (state) => ({
	endedPolls: state.poll.endedPolls,
	isLoadEndedPollsProgress: state.poll.isLoadEndedPollsProgress
});

const mapDispatchToProps = (dispatch) => ({
	loadEndedPollsStart: () => dispatch(loadEndedPollsStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(EndedPolls);
