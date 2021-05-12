import { put, takeEvery } from 'redux-saga/effects';

import * as followingActionTypes from '../actions/actionTypes/following.actionTypes';
import * as followingActions from '../actions/following.actions';
import axios from '../../configs/axios';

import {
	RECOMMENDED_FOLLOWINGS_URL,
	ADD_NEW_FOLLOWING_URL,
	REMOVE_FOLLOWING_URL,
	FOLLOWINGS_URL
} from '../../configs/endpoints';

function* loadRecommendedFollowingsStart(action) {
	yield put(followingActions.loadRecommendedFollowingsProgress());
	try {
		const response = yield sendLoadRecommendedFollowingsRequestFor(
			action.payload.pageNo
		);
		if (response.status === 200) {
			const {
				recommendedFollowings,
				hasMoreRecommendedFollowings
			} = response.data;
			yield put(
				followingActions.loadRecommendedFollowingsSuccess(
					recommendedFollowings,
					hasMoreRecommendedFollowings
				)
			);
		}
	} catch (error) {
		if (error.response.status === 500 || error.response.status === 422) {
			yield put(
				followingActions.loadRecommendedFollowingsFailure(
					error.response.data.message
				)
			);
		}
	}
	yield put(followingActions.loadRecommendedFollowingsEnd());
}

const sendLoadRecommendedFollowingsRequestFor = (pageNo) => {
	return axios.get(RECOMMENDED_FOLLOWINGS_URL + pageNo);
};

function* addNewFollowingStart(action) {
	yield put(followingActions.addNewFollowingProgress());
	try {
		const { followee } = action.payload;
		const response = yield sendAddNewFollowingRequest(followee);
		if (response.status === 201) {
			yield put(followingActions.addNewFollowingSuccess(followee));
		}
	} catch (error) {
		if (error.response.status === 500) {
			yield put(
				followingActions.addNewFollowingFailure(
					error.response.data.message
				)
			);
		}
	}
	yield put(followingActions.addNewFollowingEnd());
}

const sendAddNewFollowingRequest = (followee) => {
	return axios.post(ADD_NEW_FOLLOWING_URL, { followee });
};

function* removeFollowingStart(action) {
	yield put(followingActions.removeFollowingProgress());
	try {
		const { followee } = action.payload;
		const response = yield sendRemoveFollowingRequest(followee);
		if (response.status === 201) {
			yield put(followingActions.removeFollowingSuccess(followee));
		}
	} catch (error) {
		if (error.response.status === 500) {
			yield put(
				followingActions.removeFollowingFailure(
					error.response.data.message
				)
			);
		}
	}
	yield put(followingActions.removeFollowingEnd());
}

const sendRemoveFollowingRequest = (followee) => {
	return axios.post(REMOVE_FOLLOWING_URL, { followee });
};

function* loadFollowingsStart(action) {
	yield put(followingActions.loadFollowingsProgress());
	try {
		const response = yield sendLoadFollowingsRequestFor();
		if (response.status === 200) {
			const { followings, followers } = response.data;
			yield put(
				followingActions.loadFollowingsSuccess(followings, followers)
			);
		}
	} catch (error) {
		if (error.response.status === 500 || error.response.status === 422) {
			yield put(
				followingActions.loadFollowingsFailure(
					error.response.data.message
				)
			);
		}
	}

	yield put(followingActions.loadFollowingsEnd());
}

const sendLoadFollowingsRequestFor = () => {
	return axios.get(FOLLOWINGS_URL);
};

function* followingSaga() {
	yield takeEvery(
		followingActionTypes.LOAD_RECOMMENDED_FOLLOWINGS_START,
		loadRecommendedFollowingsStart
	);
	yield takeEvery(
		followingActionTypes.ADD_NEW_FOLLOWING_START,
		addNewFollowingStart
	);
	yield takeEvery(
		followingActionTypes.REMOVE_FOLLOWING_START,
		removeFollowingStart
	);
	yield takeEvery(
		followingActionTypes.LOAD_FOLLOWINGS_START,
		loadFollowingsStart
	);
}

export default followingSaga;
