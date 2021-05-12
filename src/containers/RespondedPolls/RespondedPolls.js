import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Polls from '../Polls/Polls';
import { loadRespondedPollsStart } from '../../store/actions/polls.actions';

const RespondedPolls = (props) => {
	useEffect(() => {
		props.loadRespondedPollsStart();
		//eslint-disable-next-line
	}, []);

	return (
		<Polls
			isLoadingPolls={props.isLoadRespondedPollsProgress}
			polls={props.respondedPolls}
		/>
	);
};

const mapStateToProps = (state) => ({
	respondedPolls: state.poll.respondedPolls,
	isLoadRespondedPollsProgress: state.poll.isLoadRespondedPollsProgress
});

const mapDispatchToProps = (dispatch) => ({
	loadRespondedPollsStart: () => dispatch(loadRespondedPollsStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(RespondedPolls);
