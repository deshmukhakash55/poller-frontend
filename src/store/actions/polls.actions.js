import * as pollsActionTypes from './actionTypes/polls.actionTypes';

export const loadRecommendedPollsStart = () => ({
	type: pollsActionTypes.LOAD_RECOMMENDED_POLLS_START
});

export const loadRecommendedPollsProgress = () => ({
	type: pollsActionTypes.LOAD_RECOMMENDED_POLLS_PROGRESS
});

export const loadRecommendedPollsEnd = () => ({
	type: pollsActionTypes.LOAD_RECOMMENDED_POLLS_END
});

export const loadRecommendedPollsSuccess = (recommendedPolls) => ({
	type: pollsActionTypes.LOAD_RECOMMENDED_POLLS_SUCCESS,
	payload: { recommendedPolls }
});

export const loadRecommendedPollsFailure = (reason) => ({
	type: pollsActionTypes.LOAD_RECOMMENDED_POLLS_FAILURE,
	payload: { reason }
});

export const addNewPollStart = (poll) => ({
	type: pollsActionTypes.ADD_NEW_POLL_START,
	payload: { poll }
});

export const addNewPollProgress = () => ({
	type: pollsActionTypes.ADD_NEW_POLL_PROGRESS
});

export const addNewPollEnd = () => ({
	type: pollsActionTypes.ADD_NEW_POLL_END
});

export const addNewPollSuccess = () => ({
	type: pollsActionTypes.ADD_NEW_POLL_SUCCESS
});

export const addNewPollFailure = (reason) => ({
	type: pollsActionTypes.ADD_NEW_POLL_FAILURE,
	payload: { reason }
});

export const addPollResponseStart = (pollId, selectedOptionIndex) => ({
	type: pollsActionTypes.ADD_POLL_RESPONSE_START,
	payload: { pollId, selectedOptionIndex }
});

export const addPollResponseProgress = () => ({
	type: pollsActionTypes.ADD_POLL_RESPONSE_PROGRESS
});

export const addPollResponseEnd = () => ({
	type: pollsActionTypes.ADD_POLL_RESPONSE_END
});

export const addPollResponseSuccess = ({
	pollId,
	pollResponseStats,
	userResponse,
	totalResponses
}) => ({
	type: pollsActionTypes.ADD_POLL_RESPONSE_SUCCESS,
	payload: { pollId, pollResponseStats, userResponse, totalResponses }
});

export const addPollResponseFailure = (reason) => ({
	type: pollsActionTypes.ADD_POLL_RESPONSE_FAILURE,
	payload: { reason }
});

export const loadTrendingPollsStart = () => ({
	type: pollsActionTypes.LOAD_TRENDING_POLLS_START
});

export const loadTrendingPollsProgress = () => ({
	type: pollsActionTypes.LOAD_TRENDING_POLLS_PROGRESS
});

export const loadTrendingPollsEnd = () => ({
	type: pollsActionTypes.LOAD_TRENDING_POLLS_END
});

export const loadTrendingPollsSuccess = (trendingPolls) => ({
	type: pollsActionTypes.LOAD_TRENDING_POLLS_SUCCESS,
	payload: { trendingPolls }
});

export const loadTrendingPollsFailure = (reason) => ({
	type: pollsActionTypes.LOAD_TRENDING_POLLS_FAILURE,
	payload: { reason }
});

export const loadYourPollsStart = () => ({
	type: pollsActionTypes.LOAD_YOUR_POLLS_START
});

export const loadYourPollsProgress = () => ({
	type: pollsActionTypes.LOAD_YOUR_POLLS_PROGRESS
});

export const loadYourPollsEnd = () => ({
	type: pollsActionTypes.LOAD_YOUR_POLLS_END
});

export const loadYourPollsSuccess = (yourPolls) => ({
	type: pollsActionTypes.LOAD_YOUR_POLLS_SUCCESS,
	payload: { yourPolls }
});

export const loadYourPollsFailure = (reason) => ({
	type: pollsActionTypes.LOAD_YOUR_POLLS_FAILURE,
	payload: { reason }
});

export const loadFollowingsPollsStart = () => ({
	type: pollsActionTypes.LOAD_FOLLOWINGS_POLLS_START
});

export const loadFollowingsPollsProgress = () => ({
	type: pollsActionTypes.LOAD_FOLLOWINGS_POLLS_PROGRESS
});

export const loadFollowingsPollsEnd = () => ({
	type: pollsActionTypes.LOAD_FOLLOWINGS_POLLS_END
});

export const loadFollowingsPollsSuccess = (followingsPolls) => ({
	type: pollsActionTypes.LOAD_FOLLOWINGS_POLLS_SUCCESS,
	payload: { followingsPolls }
});

export const loadFollowingsPollsFailure = (reason) => ({
	type: pollsActionTypes.LOAD_FOLLOWINGS_POLLS_FAILURE,
	payload: { reason }
});

export const loadRespondedPollsStart = () => ({
	type: pollsActionTypes.LOAD_RESPONDED_POLLS_START
});

export const loadRespondedPollsProgress = () => ({
	type: pollsActionTypes.LOAD_RESPONDED_POLLS_PROGRESS
});

export const loadRespondedPollsEnd = () => ({
	type: pollsActionTypes.LOAD_RESPONDED_POLLS_END
});

export const loadRespondedPollsSuccess = (respondedPolls) => ({
	type: pollsActionTypes.LOAD_RESPONDED_POLLS_SUCCESS,
	payload: { respondedPolls }
});

export const loadRespondedPollsFailure = (reason) => ({
	type: pollsActionTypes.LOAD_RESPONDED_POLLS_FAILURE,
	payload: { reason }
});

export const loadEndedPollsStart = () => ({
	type: pollsActionTypes.LOAD_ENDED_POLLS_START
});

export const loadEndedPollsProgress = () => ({
	type: pollsActionTypes.LOAD_ENDED_POLLS_PROGRESS
});

export const loadEndedPollsEnd = () => ({
	type: pollsActionTypes.LOAD_ENDED_POLLS_END
});

export const loadEndedPollsSuccess = (endedPolls) => ({
	type: pollsActionTypes.LOAD_ENDED_POLLS_SUCCESS,
	payload: { endedPolls }
});

export const loadEndedPollsFailure = (reason) => ({
	type: pollsActionTypes.LOAD_ENDED_POLLS_FAILURE,
	payload: { reason }
});

export const loadBookmarkedPollsStart = () => ({
	type: pollsActionTypes.LOAD_BOOKMARKED_POLLS_START
});

export const loadBookmarkedPollsProgress = () => ({
	type: pollsActionTypes.LOAD_BOOKMARKED_POLLS_PROGRESS
});

export const loadBookmarkedPollsEnd = () => ({
	type: pollsActionTypes.LOAD_BOOKMARKED_POLLS_END
});

export const loadBookmarkedPollsSuccess = (bookmarkedPolls) => ({
	type: pollsActionTypes.LOAD_BOOKMARKED_POLLS_SUCCESS,
	payload: { bookmarkedPolls }
});

export const loadBookmarkedPollsFailure = (reason) => ({
	type: pollsActionTypes.LOAD_BOOKMARKED_POLLS_FAILURE,
	payload: { reason }
});

export const bookmarkPollStart = (pollId) => ({
	type: pollsActionTypes.BOOKMARK_POLL_START,
	payload: { pollId }
});

export const bookmarkPollProgress = () => ({
	type: pollsActionTypes.BOOKMARK_POLL_PROGRESS
});

export const bookmarkPollEnd = () => ({
	type: pollsActionTypes.BOOKMARK_POLL_END
});

export const bookmarkPollSuccess = (pollId) => ({
	type: pollsActionTypes.BOOKMARK_POLL_SUCCESS,
	payload: { pollId }
});

export const bookmarkPollFailure = (reason) => ({
	type: pollsActionTypes.BOOKMARK_POLL_FAILURE,
	payload: { reason }
});

export const unbookmarkPollStart = (pollId) => ({
	type: pollsActionTypes.UNBOOKMARK_POLL_START,
	payload: { pollId }
});

export const unbookmarkPollProgress = () => ({
	type: pollsActionTypes.UNBOOKMARK_POLL_PROGRESS
});

export const unbookmarkPollEnd = () => ({
	type: pollsActionTypes.UNBOOKMARK_POLL_END
});

export const unbookmarkPollSuccess = (pollId) => ({
	type: pollsActionTypes.UNBOOKMARK_POLL_SUCCESS,
	payload: { pollId }
});

export const unbookmarkPollFailure = (reason) => ({
	type: pollsActionTypes.UNBOOKMARK_POLL_FAILURE,
	payload: { reason }
});

export const reportPollStart = (pollId, reason) => ({
	type: pollsActionTypes.REPORT_POLL_START,
	payload: { pollId, reason }
});

export const reportPollProgress = () => ({
	type: pollsActionTypes.REPORT_POLL_PROGRESS
});

export const reportPollEnd = () => ({
	type: pollsActionTypes.REPORT_POLL_END
});

export const reportPollSuccess = (pollId) => ({
	type: pollsActionTypes.REPORT_POLL_SUCCESS,
	payload: { pollId }
});

export const reportPollFailure = (reason) => ({
	type: pollsActionTypes.REPORT_POLL_FAILURE,
	payload: { reason }
});

export const initializePolls = () => ({
	type: pollsActionTypes.INITIALIZE_POLLS
});
