import { put, takeEvery } from 'redux-saga/effects';

import * as pollsActionTypes from '../actions/actionTypes/polls.actionTypes';
import * as pollsActions from '../actions/polls.actions';
import * as searchActions from '../actions/search.actions';
import axios from '../../configs/axios';

import {
	LOAD_RECOMMENDED_POLLS_URL,
	ADD_NEW_POLL_URL,
	ADD_POLL_RESPONSE_URL,
	LOAD_TRENDING_POLLS_URL,
	LOAD_YOUR_POLLS_URL,
	LOAD_FOLLOWINGS_POLLS_URL,
	LOAD_RESPONDED_POLLS_URL,
	LOAD_ENDED_POLLS_URL,
	BOOKMARK_POLL_URL,
	UNBOOKMARK_POLL_URL,
	LOAD_BOOKMARKED_POLLS_URL,
	REPORT_POLL_URL
} from '../../configs/endpoints';

function* loadRecommendedPollsStart(action) {
	yield put(pollsActions.loadRecommendedPollsProgress());
	try {
		const response = yield sendLoadRecommendedPollsRequestFor();
		if (response.status === 200) {
			const { recommendedPolls } = response.data;
			yield put(
				pollsActions.loadRecommendedPollsSuccess(recommendedPolls)
			);
		}
	} catch (error) {
		if (error.response.status === 500 || error.response.status === 422) {
			yield put(
				pollsActions.loadRecommendedPollsFailure(
					error.response.data.message
				)
			);
		}
	}
	yield put(pollsActions.loadRecommendedPollsEnd());
}

const sendLoadRecommendedPollsRequestFor = () => {
	return axios.get(LOAD_RECOMMENDED_POLLS_URL);
};

function* addNewPollStart(action) {
	yield put(pollsActions.addNewPollProgress());
	try {
		const response = yield sendAddNewPollRequestFor(action.payload.poll);
		if (response.status === 201) {
			yield put(pollsActions.addNewPollSuccess());
		}
	} catch (error) {
		if (error.response.status === 500 || error.response.status === 422) {
			yield put(
				pollsActions.addNewPollFailure(error.response.data.message)
			);
		}
	}
	yield put(pollsActions.addNewPollEnd());
}

const sendAddNewPollRequestFor = (poll) => {
	return axios.post(ADD_NEW_POLL_URL, { ...poll });
};

function* addPollResponseStart(action) {
	yield put(pollsActions.addNewPollProgress());
	try {
		const response = yield sendAddPollResponseRequestFor(action.payload);
		if (response.status === 201) {
			yield put(
				pollsActions.addPollResponseSuccess({
					pollId: response.data.pollId,
					pollResponseStats: response.data.pollResponseStats,
					userResponse: response.data.userResponse,
					totalResponses: response.data.totalResponses
				})
			);
		}
	} catch (error) {
		if (error.response.status === 500 || error.response.status === 422) {
			yield put(
				pollsActions.addPollResponseFailure(error.response.data.message)
			);
		}
	}
	yield put(pollsActions.addPollResponseEnd());
}

const sendAddPollResponseRequestFor = (pollResponseDetails) => {
	return axios.post(ADD_POLL_RESPONSE_URL, { ...pollResponseDetails });
};

function* loadTrendingPollsStart(action) {
	yield put(pollsActions.loadTrendingPollsProgress());
	try {
		const response = yield sendLoadTrendingPollsRequestFor();
		if (response.status === 200) {
			const { trendingPolls } = response.data;
			yield put(pollsActions.loadTrendingPollsSuccess(trendingPolls));
		}
	} catch (error) {
		if (error.response.status === 500 || error.response.status === 422) {
			yield put(
				pollsActions.loadTrendingPollsFailure(
					error.response.data.message
				)
			);
		}
	}
	yield put(pollsActions.loadTrendingPollsEnd());
}

const sendLoadTrendingPollsRequestFor = () => {
	return axios.get(LOAD_TRENDING_POLLS_URL);
};

function* loadYourPollsStart(action) {
	yield put(pollsActions.loadYourPollsProgress());
	try {
		const response = yield sendLoadYourPollsRequestFor();
		if (response.status === 200) {
			const { yourPolls } = response.data;
			yield put(pollsActions.loadYourPollsSuccess(yourPolls));
		}
	} catch (error) {
		if (error.response.status === 500 || error.response.status === 422) {
			yield put(
				pollsActions.loadYourPollsFailure(error.response.data.message)
			);
		}
	}
	yield put(pollsActions.loadYourPollsEnd());
}

const sendLoadYourPollsRequestFor = () => {
	return axios.get(LOAD_YOUR_POLLS_URL);
};

function* loadFollowingsPollsStart(action) {
	yield put(pollsActions.loadFollowingsPollsProgress());
	try {
		const response = yield sendLoadFollowingsPollsRequestFor();
		if (response.status === 200) {
			const { followingsPolls } = response.data;
			yield put(pollsActions.loadFollowingsPollsSuccess(followingsPolls));
		}
	} catch (error) {
		if (error.response.status === 500 || error.response.status === 422) {
			yield put(
				pollsActions.loadFollowingsPollsFailure(
					error.response.data.message
				)
			);
		}
	}
	yield put(pollsActions.loadFollowingsPollsEnd());
}

const sendLoadFollowingsPollsRequestFor = () => {
	return axios.get(LOAD_FOLLOWINGS_POLLS_URL);
};

function* loadRespondedPollsStart(action) {
	yield put(pollsActions.loadRespondedPollsProgress());
	try {
		const response = yield sendLoadRespondedPollsRequestFor();
		if (response.status === 200) {
			const { respondedPolls } = response.data;
			yield put(pollsActions.loadRespondedPollsSuccess(respondedPolls));
		}
	} catch (error) {
		if (error.response.status === 500 || error.response.status === 422) {
			yield put(
				pollsActions.loadRespondedPollsFailure(
					error.response.data.message
				)
			);
		}
	}
	yield put(pollsActions.loadRespondedPollsEnd());
}

const sendLoadRespondedPollsRequestFor = () => {
	return axios.get(LOAD_RESPONDED_POLLS_URL);
};

function* loadEndedPollsStart(action) {
	yield put(pollsActions.loadEndedPollsProgress());
	try {
		const response = yield sendLoadEndedPollsRequestFor();
		if (response.status === 200) {
			const { endedPolls } = response.data;
			yield put(pollsActions.loadEndedPollsSuccess(endedPolls));
		}
	} catch (error) {
		if (error.response.status === 500 || error.response.status === 422) {
			yield put(
				pollsActions.loadEndedPollsFailure(error.response.data.message)
			);
		}
	}
	yield put(pollsActions.loadEndedPollsEnd());
}

const sendLoadEndedPollsRequestFor = () => {
	return axios.get(LOAD_ENDED_POLLS_URL);
};

function* bookmarkPollStart(action) {
	yield put(pollsActions.bookmarkPollProgress());
	try {
		const { pollId } = action.payload;
		const response = yield sendBookmarkPollRequestFor(pollId);
		if (response.status === 201) {
			yield put(pollsActions.bookmarkPollSuccess(pollId));
			yield put(searchActions.bookmarkSearchedPoll(pollId));
		}
	} catch (error) {
		if (error.response.status === 500) {
			yield put(
				pollsActions.bookmarkPollFailure(error.response.data.message)
			);
		}
	}
	yield put(pollsActions.bookmarkPollEnd());
}

const sendBookmarkPollRequestFor = (pollId) => {
	return axios.post(BOOKMARK_POLL_URL, { pollId });
};

function* unbookmarkPollStart(action) {
	yield put(pollsActions.unbookmarkPollProgress());
	try {
		const { pollId } = action.payload;
		const response = yield sendUnbookmarkPollRequestFor(pollId);
		if (response.status === 201) {
			yield put(pollsActions.unbookmarkPollSuccess(pollId));
			yield put(searchActions.unbookmarkSearchedPoll(pollId));
		}
	} catch (error) {
		if (error.response.status === 500) {
			yield put(
				pollsActions.unbookmarkPollFailure(error.response.data.message)
			);
		}
	}
	yield put(pollsActions.unbookmarkPollEnd());
}

const sendUnbookmarkPollRequestFor = (pollId) => {
	return axios.post(UNBOOKMARK_POLL_URL, { pollId });
};

function* loadBookmarkedPollsStart(action) {
	yield put(pollsActions.loadBookmarkedPollsProgress());
	try {
		const response = yield sendLoadBookmarkedPollsRequestFor();
		if (response.status === 200) {
			const { bookmarkedPolls } = response.data;
			yield put(pollsActions.loadBookmarkedPollsSuccess(bookmarkedPolls));
		}
	} catch (error) {
		if (error.response.status === 500 || error.response.status === 422) {
			yield put(
				pollsActions.loadBookmarkedPollsFailure(
					error.response.data.message
				)
			);
		}
	}
	yield put(pollsActions.loadBookmarkedPollsEnd());
}

const sendLoadBookmarkedPollsRequestFor = () => {
	return axios.get(LOAD_BOOKMARKED_POLLS_URL);
};

function* reportPollStart(action) {
	yield put(pollsActions.reportPollProgress());
	try {
		const { pollId, reason } = action.payload;
		const response = yield sendReportRequestFor(pollId, reason);
		if (response.status === 200) {
			yield put(pollsActions.reportPollSuccess(pollId));
			yield put(searchActions.reportSearchedPoll(pollId));
		}
	} catch (error) {
		if (error.response.status === 500) {
			yield put(
				pollsActions.reportPollFailure(error.response.data.message)
			);
		}
	}
	yield put(pollsActions.reportPollEnd());
}

const sendReportRequestFor = (pollId, reason) => {
	return axios.post(REPORT_POLL_URL, { pollId, reason });
};

function* pollsSaga() {
	yield takeEvery(
		pollsActionTypes.LOAD_RECOMMENDED_POLLS_START,
		loadRecommendedPollsStart
	);
	yield takeEvery(pollsActionTypes.ADD_NEW_POLL_START, addNewPollStart);
	yield takeEvery(
		pollsActionTypes.ADD_POLL_RESPONSE_START,
		addPollResponseStart
	);
	yield takeEvery(
		pollsActionTypes.LOAD_TRENDING_POLLS_START,
		loadTrendingPollsStart
	);
	yield takeEvery(pollsActionTypes.LOAD_YOUR_POLLS_START, loadYourPollsStart);
	yield takeEvery(
		pollsActionTypes.LOAD_FOLLOWINGS_POLLS_START,
		loadFollowingsPollsStart
	);
	yield takeEvery(
		pollsActionTypes.LOAD_RESPONDED_POLLS_START,
		loadRespondedPollsStart
	);
	yield takeEvery(
		pollsActionTypes.LOAD_ENDED_POLLS_START,
		loadEndedPollsStart
	);
	yield takeEvery(
		pollsActionTypes.LOAD_BOOKMARKED_POLLS_START,
		loadBookmarkedPollsStart
	);
	yield takeEvery(pollsActionTypes.BOOKMARK_POLL_START, bookmarkPollStart);
	yield takeEvery(
		pollsActionTypes.UNBOOKMARK_POLL_START,
		unbookmarkPollStart
	);
	yield takeEvery(pollsActionTypes.REPORT_POLL_START, reportPollStart);
}

export default pollsSaga;
