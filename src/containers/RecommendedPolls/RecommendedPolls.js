import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Polls from '../Polls/Polls';
import { loadRecommendedPollsStart } from '../../store/actions/polls.actions';

const RecommendedPolls = (props) => {
	useEffect(() => {
		props.loadRecommendedPollsStart();
		//eslint-disable-next-line
	}, []);

	return (
		<Polls
			isLoadingPolls={props.isLoadRecommendedPollsProgress}
			polls={props.recommendedPolls}
		/>
	);
};

const mapStateToProps = (state) => ({
	recommendedPolls: state.poll.recommendedPolls,
	isLoadRecommendedPollsProgress: state.poll.isLoadRecommendedPollsProgress
});

const mapDispatchToProps = (dispatch) => ({
	loadRecommendedPollsStart: () => dispatch(loadRecommendedPollsStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedPolls);
