import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Polls from '../Polls/Polls';
import { loadYourPollsStart } from '../../store/actions/polls.actions';

const YourPolls = (props) => {
	useEffect(() => {
		props.loadYourPollsStart();
		//eslint-disable-next-line
	}, []);

	return (
		<Polls
			isLoadingPolls={props.isLoadYourPollsProgress}
			polls={props.yourPolls}
		/>
	);
};

const mapStateToProps = (state) => ({
	yourPolls: state.poll.yourPolls,
	isLoadYourPollsProgress: state.poll.isLoadYourPollsProgress
});

const mapDispatchToProps = (dispatch) => ({
	loadYourPollsStart: () => dispatch(loadYourPollsStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(YourPolls);
