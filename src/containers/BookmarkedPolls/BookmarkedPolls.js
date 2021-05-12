import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Polls from '../Polls/Polls';
import { loadBookmarkedPollsStart } from '../../store/actions/polls.actions';

const BookmarkedPolls = (props) => {
	useEffect(() => {
		props.loadBookmarkedPollsStart();
		//eslint-disable-next-line
	}, []);

	return (
		<Polls
			isLoadingPolls={props.isLoadBookmarkedPollsProgress}
			polls={props.bookmarkedPolls}
		/>
	);
};

const mapStateToProps = (state) => ({
	bookmarkedPolls: state.poll.bookmarkedPolls,
	isLoadBookmarkedPollsProgress: state.poll.isLoadBookmarkedPollsProgress
});

const mapDispatchToProps = (dispatch) => ({
	loadBookmarkedPollsStart: () => dispatch(loadBookmarkedPollsStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkedPolls);
