import * as searchActionTypes from './actionTypes/search.actionTypes';

export const searchStart = (searchText) => ({
	type: searchActionTypes.SEARCH_START,
	payload: { searchText }
});

export const searchProgress = () => ({
	type: searchActionTypes.SEARCH_PROGRESS
});

export const searchEnd = () => ({
	type: searchActionTypes.SEARCH_END
});

export const searchSuccess = (searchedPolls, searchedUsers, searchText) => ({
	type: searchActionTypes.SEARCH_SUCCESS,
	payload: { searchedPolls, searchedUsers, searchText }
});

export const searchFailure = (reason) => ({
	type: searchActionTypes.SEARCH_FAILURE,
	payload: { reason }
});

export const searchAgain = () => ({
	type: searchActionTypes.SEARCH_AGAIN
});

export const bookmarkSearchedPoll = (pollId) => ({
	type: searchActionTypes.BOOKMARK_SEARCHED_POLL,
	payload: { pollId }
});

export const unbookmarkSearchedPoll = (pollId) => ({
	type: searchActionTypes.UNBOOKMARK_SEARCHED_POLL,
	payload: { pollId }
});

export const reportSearchedPoll = (pollId) => ({
	type: searchActionTypes.REPORT_SEARCHED_POLL,
	payload: { pollId }
});

export const addSearchedPollResponse = ({
	pollId,
	pollResponseStats,
	userResponse,
	totalResponses
}) => ({
	type: searchActionTypes.ADD_SEARCHED_POLL_RESPONSE,
	payload: { pollId, pollResponseStats, userResponse, totalResponses }
});

export const initializeSearch = () => ({
	type: searchActionTypes.INITIALIZE_SEARCH
});
