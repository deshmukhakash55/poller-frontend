import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Polls from '../Polls/Polls';
import { loadTrendingPollsStart } from '../../store/actions/polls.actions';

const TrendingPolls = (props) => {
	useEffect(() => {
		props.loadTrendingPollsStart();
		//eslint-disable-next-line
	}, []);

	return (
		<Polls
			isLoadingPolls={props.isLoadTrendingPollsProgress}
			polls={props.trendingPolls}
		/>
	);
};

const mapStateToProps = (state) => ({
	trendingPolls: state.poll.trendingPolls,
	isLoadTrendingPollsProgress: state.poll.isLoadTrendingPollsProgress
});

const mapDispatchToProps = (dispatch) => ({
	loadTrendingPollsStart: () => dispatch(loadTrendingPollsStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(TrendingPolls);
