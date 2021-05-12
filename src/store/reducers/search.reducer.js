import * as searchActionTypes from '../actions/actionTypes/search.actionTypes';

const initialSearchState = {
	searchedPolls: [],
	searchedUsers: [],
	searchText: '',
	isSearchProgress: false,
	isSearchSuccess: false,
	isSearchFailure: false,
	searchError: ''
};

export const searchReducer = (state = initialSearchState, action) => {
	switch (action.type) {
		case searchActionTypes.SEARCH_PROGRESS:
			return {
				...state,
				isSearchProgress: true,
				isSearchSuccess: false,
				isSearchFailure: false,
				searchError: ''
			};
		case searchActionTypes.SEARCH_END:
			return {
				...state,
				isSearchProgress: false
			};
		case searchActionTypes.SEARCH_SUCCESS:
			return {
				...state,
				isSearchSuccess: true,
				isSearchFailure: false,
				searchError: '',
				searchText: action.payload.searchText,
				searchedPolls: [...action.payload.searchedPolls],
				searchedUsers: [...action.payload.searchedUsers]
			};
		case searchActionTypes.SEARCH_FAILURE:
			return {
				...state,
				isSearchSuccess: false,
				isSearchFailure: true,
				searchError: action.payload.reason
			};
		case searchActionTypes.BOOKMARK_SEARCHED_POLL:
			const bookmarkedPollId = action.payload.pollId;
			const searchedPolls = state.searchedPolls.map((searchedPoll) => {
				if (searchedPoll.id !== bookmarkedPollId) {
					return searchedPoll;
				}
				return { ...searchedPoll, hasUserBookmarkedPoll: true };
			});
			return {
				...state,
				searchedPolls
			};
		case searchActionTypes.UNBOOKMARK_SEARCHED_POLL:
			const unbookmarkedPollId = action.payload.pollId;
			const updatedSearchedPolls = state.searchedPolls.map(
				(searchedPoll) => {
					if (searchedPoll.id !== unbookmarkedPollId) {
						return searchedPoll;
					}
					return { ...searchedPoll, hasUserBookmarkedPoll: false };
				}
			);
			return {
				...state,
				searchedPolls: updatedSearchedPolls
			};
		case searchActionTypes.REPORT_SEARCHED_POLL:
			const reportedPollId = action.payload.pollId;
			const reUpdatedSearchedPolls = state.searchedPolls.map(
				(searchedPoll) => {
					if (searchedPoll.id !== reportedPollId) {
						return searchedPoll;
					}
					return { ...searchedPoll, hasUserReportedPoll: true };
				}
			);
			return {
				...state,
				searchedPolls: reUpdatedSearchedPolls
			};
		case searchActionTypes.ADD_SEARCHED_POLL_RESPONSE:
			const searchedPollsWithUpdatedResponse =
				getPollsWithUpdateResponseOfPollIn(
					state.searchedPolls,
					action.payload
				);
			return {
				...state,
				searchedPolls: searchedPollsWithUpdatedResponse
			};
		case searchActionTypes.INITIALIZE_SEARCH:
			return {
				...initialSearchState
			};
		default:
			return {
				...state
			};
	}
};

const getPollsWithUpdateResponseOfPollIn = (polls, payload) => {
	const respondedToPollIndex = polls.findIndex(
		(poll) => poll.id === payload.pollId
	);
	const respondedToPoll = {
		...polls[respondedToPollIndex],
		pollResponseStats: payload.pollResponseStats,
		userResponse: payload.userResponse,
		totalResponses: payload.totalResponses
	};
	const updatedPolls = [...polls];
	updatedPolls[respondedToPollIndex] = respondedToPoll;
	return [...updatedPolls];
};
