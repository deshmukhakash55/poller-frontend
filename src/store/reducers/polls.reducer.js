import * as pollsActionTypes from '../actions/actionTypes/polls.actionTypes';

const initialPollsState = {
	recommendedPolls: [],
	trendingPolls: [],
	yourPolls: [],
	followingsPolls: [],
	respondedPolls: [],
	endedPolls: [],
	bookmarkedPolls: [],
	isLoadRecommendedPollsProgress: false,
	isLoadRecommendedPollsSuccess: false,
	isLoadRecommendedPollsFailure: false,
	loadRecommendedPollsError: '',
	isAddNewPollProgress: false,
	isAddNewPollSuccess: false,
	isAddNewPollFailure: false,
	addNewPollError: '',
	isAddPollResponseProgress: false,
	isAddPollResponseSuccess: false,
	isAddPollResponseFailure: false,
	addPollResponseError: '',
	isLoadTrendingPollsProgress: false,
	isLoadTrendingPollsSuccess: false,
	isLoadTrendingPollsFailure: false,
	loadTrendingPollsError: '',
	isLoadYourPollsProgress: false,
	isLoadYourPollsSuccess: false,
	isLoadYourPollsFailure: false,
	loadYourPollsError: '',
	isLoadFollowingsPollsProgress: false,
	isLoadFollowingsPollsSuccess: false,
	isLoadFollowingsPollsFailure: false,
	loadFollowingsPollsError: '',
	isLoadRespondedPollsProgress: false,
	isLoadRespondedPollsSuccess: false,
	isLoadRespondedPollsFailure: false,
	loadRespondedPollsError: '',
	isLoadEndedPollsProgress: false,
	isLoadEndedPollsSuccess: false,
	isLoadEndedPollsFailure: false,
	loadEndedPollsError: '',
	isLoadBookmarkedPollsProgress: false,
	isLoadBookmarkedPollsSuccess: false,
	isLoadBookmarkedPollsFailure: false,
	loadBookmarkedPollsError: '',
	isSearchPollsProgress: false,
	isSearchPollsSuccess: false,
	isSearchPollsFailure: false,
	searchPollsError: '',
	isBookmarkPollProgress: false,
	isBookmarkPollSuccess: false,
	isBookmarkPollFailure: false,
	bookmarkPollError: '',
	isUnbookmarkPollProgress: false,
	isUnbookmarkPollSuccess: false,
	isUnbookmarkPollFailure: false,
	unbookmarkPollError: '',
	isReportPollProgress: false,
	isReportPollSuccess: false,
	isReportPollFailure: false,
	reportPollError: ''
};

export const pollsReducer = (state = initialPollsState, action) => {
	switch (action.type) {
		case pollsActionTypes.LOAD_RECOMMENDED_POLLS_PROGRESS:
			return {
				...state,
				isLoadRecommendedPollsProgress: true,
				isLoadRecommendedPollsSuccess: false,
				isLoadRecommendedPollsFailure: false,
				loadRecommendedPollsError: ''
			};
		case pollsActionTypes.LOAD_RECOMMENDED_POLLS_END:
			return {
				...state,
				isLoadRecommendedPollsProgress: false
			};
		case pollsActionTypes.LOAD_RECOMMENDED_POLLS_SUCCESS:
			return {
				...state,
				isLoadRecommendedPollsSuccess: true,
				isLoadRecommendedPollsFailure: false,
				loadRecommendedPollsError: '',
				recommendedPolls: [...action.payload.recommendedPolls]
			};
		case pollsActionTypes.LOAD_RECOMMENDED_POLLS_FAILURE:
			return {
				...state,
				isLoadRecommendedPollsSuccess: false,
				isLoadRecommendedPollsFailure: true,
				loadRecommendedPollsError: action.payload.reason
			};
		case pollsActionTypes.ADD_NEW_POLL_PROGRESS:
			return {
				...state,
				isAddNewPollProgress: true,
				isAddNewPollSuccess: false,
				isAddNewPollFailure: false,
				addNewPollError: ''
			};
		case pollsActionTypes.ADD_NEW_POLL_END:
			return {
				...state,
				isAddNewPollProgress: false
			};
		case pollsActionTypes.ADD_NEW_POLL_SUCCESS:
			return {
				...state,
				isAddNewPollSuccess: true,
				isAddNewPollFailure: false,
				addNewPollError: ''
			};
		case pollsActionTypes.ADD_NEW_POLL_FAILURE:
			return {
				...state,
				isAddNewPollSuccess: false,
				isAddNewPollFailure: true,
				addNewPollError: action.payload.reason
			};
		case pollsActionTypes.ADD_POLL_RESPONSE_PROGRESS:
			return {
				...state,
				isAddPollResponseProgress: true,
				isAddPollResponseSuccess: false,
				isAddPollResponseFailure: false,
				addPollResponseError: ''
			};
		case pollsActionTypes.ADD_POLL_RESPONSE_END:
			return {
				...state,
				isAddPollResponseProgress: false
			};
		case pollsActionTypes.ADD_POLL_RESPONSE_SUCCESS:
			const recommendedPollsWithUpdatedResponse =
				getPollsWithUpdateResponseOfPollIn(
					state.recommendedPolls,
					action.payload
				);
			const yourPollsWithUpdatedResponse =
				getPollsWithUpdateResponseOfPollIn(
					state.yourPolls,
					action.payload
				);
			const respondedToPollsWithUpdatedResponse =
				getPollsWithUpdateResponseOfPollIn(
					state.respondedPolls,
					action.payload
				);
			const bookmarkedPollsWithUpdatedResponse =
				getPollsWithUpdateResponseOfPollIn(
					state.bookmarkedPolls,
					action.payload
				);
			const endedPollsWithUpdatedResponse =
				getPollsWithUpdateResponseOfPollIn(
					state.endedPolls,
					action.payload
				);
			const followingsPollsWithUpdatedResponse =
				getPollsWithUpdateResponseOfPollIn(
					state.followingsPolls,
					action.payload
				);
			const trendingPollsWithUpdatedResponse =
				getPollsWithUpdateResponseOfPollIn(
					state.trendingPolls,
					action.payload
				);
			return {
				...state,
				recommendedPolls: recommendedPollsWithUpdatedResponse,
				yourPolls: yourPollsWithUpdatedResponse,
				respondedPolls: respondedToPollsWithUpdatedResponse,
				bookmarkedPolls: bookmarkedPollsWithUpdatedResponse,
				endedPolls: endedPollsWithUpdatedResponse,
				followingsPolls: followingsPollsWithUpdatedResponse,
				trendingPolls: trendingPollsWithUpdatedResponse,
				isAddPollResponseSuccess: true,
				isAddPollResponseFailure: false,
				addPollResponseError: ''
			};
		case pollsActionTypes.ADD_POLL_RESPONSE_FAILURE:
			return {
				...state,
				isAddPollResponseSuccess: false,
				isAddPollResponseFailure: true,
				addPollResponseError: action.payload.reason
			};
		case pollsActionTypes.LOAD_TRENDING_POLLS_PROGRESS:
			return {
				...state,
				isLoadTrendingPollsProgress: true,
				isLoadTrendingPollsSuccess: false,
				isLoadTrendingPollsFailure: false,
				loadTrendingPollsError: ''
			};
		case pollsActionTypes.LOAD_TRENDING_POLLS_END:
			return {
				...state,
				isLoadTrendingPollsProgress: false
			};
		case pollsActionTypes.LOAD_TRENDING_POLLS_SUCCESS:
			return {
				...state,
				isLoadTrendingPollsSuccess: true,
				isLoadTrendingPollsFailure: false,
				loadTrendingPollsError: '',
				trendingPolls: [...action.payload.trendingPolls]
			};
		case pollsActionTypes.LOAD_TRENDING_POLLS_FAILURE:
			return {
				...state,
				isLoadTrendingPollsSuccess: false,
				isLoadTrendingPollsFailure: true,
				loadTrendingPollsError: action.payload.reason
			};
		case pollsActionTypes.LOAD_YOUR_POLLS_PROGRESS:
			return {
				...state,
				isLoadYourPollsProgress: true,
				isLoadYourPollsSuccess: false,
				isLoadYourPollsFailure: false,
				loadYourPollsError: ''
			};
		case pollsActionTypes.LOAD_YOUR_POLLS_END:
			return {
				...state,
				isLoadYourPollsProgress: false
			};
		case pollsActionTypes.LOAD_YOUR_POLLS_SUCCESS:
			return {
				...state,
				isLoadYourPollsSuccess: true,
				isLoadYourPollsFailure: false,
				loadYourPollsError: '',
				yourPolls: [...action.payload.yourPolls]
			};
		case pollsActionTypes.LOAD_YOUR_POLLS_FAILURE:
			return {
				...state,
				isLoadYourPollsSuccess: false,
				isLoadYourPollsFailure: true,
				loadYourPollsError: action.payload.reason
			};
		case pollsActionTypes.LOAD_FOLLOWINGS_POLLS_PROGRESS:
			return {
				...state,
				isLoadFollowingsPollsProgress: true,
				isLoadFollowingsPollsSuccess: false,
				isLoadFollowingsPollsFailure: false,
				loadFollowingsPollsError: ''
			};
		case pollsActionTypes.LOAD_FOLLOWINGS_POLLS_END:
			return {
				...state,
				isLoadFollowingsPollsProgress: false
			};
		case pollsActionTypes.LOAD_FOLLOWINGS_POLLS_SUCCESS:
			return {
				...state,
				isLoadFollowingsPollsSuccess: true,
				isLoadFollowingsPollsFailure: false,
				loadFollowingsPollsError: '',
				followingsPolls: [...action.payload.followingsPolls]
			};
		case pollsActionTypes.LOAD_FOLLOWINGS_POLLS_FAILURE:
			return {
				...state,
				isLoadFollowingsPollsSuccess: false,
				isLoadFollowingsPollsFailure: true,
				loadFollowingsPollsError: action.payload.reason
			};
		case pollsActionTypes.LOAD_RESPONDED_POLLS_PROGRESS:
			return {
				...state,
				isLoadRespondedPollsProgress: true,
				isLoadRespondedPollsSuccess: false,
				isLoadRespondedPollsFailure: false,
				loadRespondedPollsError: ''
			};
		case pollsActionTypes.LOAD_RESPONDED_POLLS_END:
			return {
				...state,
				isLoadRespondedPollsProgress: false
			};
		case pollsActionTypes.LOAD_RESPONDED_POLLS_SUCCESS:
			return {
				...state,
				isLoadRespondedPollsSuccess: true,
				isLoadRespondedPollsFailure: false,
				loadRespondedPollsError: '',
				respondedPolls: [...action.payload.respondedPolls]
			};
		case pollsActionTypes.LOAD_RESPONDED_POLLS_FAILURE:
			return {
				...state,
				isLoadRespondedPollsSuccess: false,
				isLoadRespondedPollsFailure: true,
				loadRespondedPollsError: action.payload.reason
			};
		case pollsActionTypes.LOAD_ENDED_POLLS_PROGRESS:
			return {
				...state,
				isLoadEndedPollsProgress: true,
				isLoadEndedPollsSuccess: false,
				isLoadEndedPollsFailure: false,
				loadEndedPollsError: ''
			};
		case pollsActionTypes.LOAD_ENDED_POLLS_END:
			return {
				...state,
				isLoadEndedPollsProgress: false
			};
		case pollsActionTypes.LOAD_ENDED_POLLS_SUCCESS:
			return {
				...state,
				isLoadEndedPollsSuccess: true,
				isLoadEndedPollsFailure: false,
				loadEndedPollsError: '',
				endedPolls: [...action.payload.endedPolls]
			};
		case pollsActionTypes.LOAD_ENDED_POLLS_FAILURE:
			return {
				...state,
				isLoadEndedPollsSuccess: false,
				isLoadEndedPollsFailure: true,
				loadEndedPollsError: action.payload.reason
			};
		case pollsActionTypes.LOAD_BOOKMARKED_POLLS_PROGRESS:
			return {
				...state,
				isLoadBookmarkedPollsProgress: true,
				isLoadBookmarkedPollsSuccess: false,
				isLoadBookmarkedPollsFailure: false,
				loadBookmarkedPollsError: ''
			};
		case pollsActionTypes.LOAD_BOOKMARKED_POLLS_END:
			return {
				...state,
				isLoadBookmarkedPollsProgress: false
			};
		case pollsActionTypes.LOAD_BOOKMARKED_POLLS_SUCCESS:
			return {
				...state,
				isLoadBookmarkedPollsSuccess: true,
				isLoadBookmarkedPollsFailure: false,
				loadBookmarkedPollsError: '',
				bookmarkedPolls: [...action.payload.bookmarkedPolls]
			};
		case pollsActionTypes.LOAD_BOOKMARKED_POLLS_FAILURE:
			return {
				...state,
				isLoadBookmarkedPollsSuccess: false,
				isLoadBookmarkedPollsFailure: true,
				loadBookmarkedPollsError: action.payload.reason
			};
		case pollsActionTypes.BOOKMARK_POLL_PROGRESS:
			return {
				...state,
				isBookmarkPollProgress: true,
				isBookmarkPollSuccess: false,
				isBookmarkPollFailure: false,
				bookmarkPollError: ''
			};
		case pollsActionTypes.BOOKMARK_POLL_END:
			return {
				...state,
				isBookmarkPollProgress: false
			};
		case pollsActionTypes.BOOKMARK_POLL_SUCCESS:
			const bookmarkedPollId = action.payload.pollId;
			const recommendedPolls = markPollAsBookmarkedIn(
				state.recommendedPolls,
				bookmarkedPollId
			);
			const trendingPolls = markPollAsBookmarkedIn(
				state.trendingPolls,
				bookmarkedPollId
			);
			const yourPolls = markPollAsBookmarkedIn(
				state.yourPolls,
				bookmarkedPollId
			);
			const followingsPolls = markPollAsBookmarkedIn(
				state.followingsPolls,
				bookmarkedPollId
			);
			const respondedPolls = markPollAsBookmarkedIn(
				state.respondedPolls,
				bookmarkedPollId
			);
			const endedPolls = markPollAsBookmarkedIn(
				state.endedPolls,
				bookmarkedPollId
			);
			const bookmarkedPolls = markPollAsBookmarkedIn(
				state.bookmarkedPolls,
				bookmarkedPollId
			);
			return {
				...state,
				recommendedPolls,
				trendingPolls,
				yourPolls,
				followingsPolls,
				respondedPolls,
				endedPolls,
				bookmarkedPolls,
				isBookmarkPollSuccess: true,
				isBookmarkPollFailure: false,
				bookmarkPollError: ''
			};
		case pollsActionTypes.BOOKMARK_POLL_FAILURE:
			return {
				...state,
				isBookmarkPollSuccess: false,
				isBookmarkPollFailure: true,
				bookmarkPollError: action.payload.reason
			};
		case pollsActionTypes.UNBOOKMARK_POLL_PROGRESS:
			return {
				...state,
				isUnbookmarkPollProgress: true,
				isUnbookmarkPollSuccess: false,
				isUnbookmarkPollFailure: false,
				unbookmarkPollError: ''
			};
		case pollsActionTypes.UNBOOKMARK_POLL_END:
			return {
				...state,
				isUnbookmarkPollProgress: false
			};
		case pollsActionTypes.UNBOOKMARK_POLL_SUCCESS:
			const unbookmarkedPollId = action.payload.pollId;
			const updatedRecommendedPolls = markPollAsUnbookmarkedIn(
				state.recommendedPolls,
				unbookmarkedPollId
			);
			const updatedTrendingPolls = markPollAsUnbookmarkedIn(
				state.trendingPolls,
				unbookmarkedPollId
			);
			const updatedYourPolls = markPollAsUnbookmarkedIn(
				state.yourPolls,
				unbookmarkedPollId
			);
			const updatedFollowingsPolls = markPollAsUnbookmarkedIn(
				state.followingsPolls,
				unbookmarkedPollId
			);
			const updatedRespondedPolls = markPollAsUnbookmarkedIn(
				state.respondedPolls,
				unbookmarkedPollId
			);
			const updatedEndedPolls = markPollAsUnbookmarkedIn(
				state.endedPolls,
				unbookmarkedPollId
			);
			const updatedBookmarkedPolls = state.bookmarkedPolls.filter(
				(bookmarkedPoll) => bookmarkedPoll.id !== unbookmarkedPollId
			);
			return {
				...state,
				recommendedPolls: updatedRecommendedPolls,
				trendingPolls: updatedTrendingPolls,
				yourPolls: updatedYourPolls,
				followingsPolls: updatedFollowingsPolls,
				respondedPolls: updatedRespondedPolls,
				endedPolls: updatedEndedPolls,
				bookmarkedPolls: updatedBookmarkedPolls,
				isUnbookmarkPollSuccess: true,
				isUnbookmarkPollFailure: false,
				unbookmarkPollError: ''
			};
		case pollsActionTypes.UNBOOKMARK_POLL_FAILURE:
			return {
				...state,
				isUnbookmarkPollSuccess: false,
				isUnbookmarkPollFailure: true,
				unbookmarkPollError: action.payload.reason
			};
		case pollsActionTypes.REPORT_POLL_PROGRESS:
			return {
				...state,
				isReportPollProgress: true,
				isReportPollSuccess: false,
				isReportPollFailure: false,
				reportPollError: ''
			};
		case pollsActionTypes.REPORT_POLL_END:
			return {
				...state,
				isReportPollProgress: false
			};
		case pollsActionTypes.REPORT_POLL_SUCCESS:
			const reportedPollId = action.payload.pollId;
			const reUpdatedRecommendedPolls = markPollAsReportedIn(
				state.recommendedPolls,
				reportedPollId
			);
			const reUpdatedTrendingPolls = markPollAsReportedIn(
				state.trendingPolls,
				reportedPollId
			);
			const reUpdatedYourPolls = markPollAsReportedIn(
				state.yourPolls,
				reportedPollId
			);
			const reUpdatedFollowingsPolls = markPollAsReportedIn(
				state.followingsPolls,
				reportedPollId
			);
			const reUpdatedRespondedPolls = markPollAsReportedIn(
				state.respondedPolls,
				reportedPollId
			);
			const reUpdatedEndedPolls = markPollAsReportedIn(
				state.endedPolls,
				reportedPollId
			);
			const reUpdatedBookmarkedPolls = markPollAsReportedIn(
				state.bookmarkedPolls,
				reportedPollId
			);
			return {
				...state,
				recommendedPolls: reUpdatedRecommendedPolls,
				trendingPolls: reUpdatedTrendingPolls,
				yourPolls: reUpdatedYourPolls,
				followingsPolls: reUpdatedFollowingsPolls,
				respondedPolls: reUpdatedRespondedPolls,
				endedPolls: reUpdatedEndedPolls,
				bookmarkedPolls: reUpdatedBookmarkedPolls,
				isReportPollSuccess: true,
				isReportPollFailure: false,
				reportPollError: ''
			};
		case pollsActionTypes.REPORT_POLL_FAILURE:
			return {
				...state,
				isReportPollSuccess: false,
				isReportPollFailure: true,
				reportPollError: action.payload.reason
			};
		case pollsActionTypes.INITIALIZE_POLLS:
			return {
				...initialPollsState
			};
		default:
			return {
				...state
			};
	}
};

const markPollAsBookmarkedIn = (polls, bookmarkedPollId) =>
	polls.map((poll) => {
		if (poll.id !== bookmarkedPollId) {
			return poll;
		}
		return { ...poll, hasUserBookmarkedPoll: true };
	});

const markPollAsUnbookmarkedIn = (polls, unbookmarkedPollId) =>
	polls.map((poll) => {
		if (poll.id !== unbookmarkedPollId) {
			return poll;
		}
		return { ...poll, hasUserBookmarkedPoll: false };
	});

const markPollAsReportedIn = (polls, reportedPollId) =>
	polls.map((poll) => {
		if (poll.id !== reportedPollId) {
			return poll;
		}
		return { ...poll, hasUserReportedPoll: true };
	});

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
