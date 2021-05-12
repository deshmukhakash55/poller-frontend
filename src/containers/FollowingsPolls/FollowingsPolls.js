import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Polls from '../Polls/Polls';
import { loadFollowingsPollsStart } from '../../store/actions/polls.actions';

const FollowingsPolls = (props) => {
	useEffect(() => {
		props.loadFollowingsPollsStart();
		//eslint-disable-next-line
	}, []);

	return (
		<Polls
			isLoadingPolls={props.isLoadFollowingsPollsProgress}
			polls={props.followingsPolls}
		/>
	);
};

const mapStateToProps = (state) => ({
	followingsPolls: state.poll.followingsPolls,
	isLoadFollowingsPollsProgress: state.poll.isLoadFollowingsPollsProgress
});

const mapDispatchToProps = (dispatch) => ({
	loadFollowingsPollsStart: () => dispatch(loadFollowingsPollsStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(FollowingsPolls);
