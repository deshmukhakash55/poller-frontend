import { put, select, takeEvery } from 'redux-saga/effects';

import * as profileActionTypes from '../actions/actionTypes/profile.actionTypes';
import * as profileActions from '../actions/profile.actions';
import axios from '../../configs/axios';

import {
	LOAD_PROFILE_URL,
	UPDATE_PROFILE_URL,
	UPLOAD_AVATAR_URL
} from '../../configs/endpoints';

function* loadProfileStart() {
	yield put(profileActions.loadProfileProgress());
	try {
		const response = yield sendLoadProfileRequestFor();
		if (response.status === 200) {
			const { profile } = response.data;
			yield put(profileActions.loadProfileSuccess(profile));
		}
	} catch (error) {
		if (error.response.status === 500 || error.response.status === 422) {
			yield put(
				profileActions.loadProfileFailure(error.response.data.message)
			);
		}
	}
	yield put(profileActions.loadProfileEnd());
}

const sendLoadProfileRequestFor = () => {
	return axios.get(LOAD_PROFILE_URL);
};

function* updateProfileStart(action) {
	yield put(profileActions.updateProfileProgress());
	try {
		const userId = yield select(loggedInUserId);
		const response = yield uploadAvatarIfExists(
			action.payload.profile.avatar,
			userId
		);
		if (response.status === 200 && !!action.payload.profile.interests) {
			const updatedProfile = {
				interests: action.payload.profile.interests
			};
			yield sendUpdateProfileRequest(updatedProfile);
		}
		yield put(profileActions.updateProfileSuccess());
		yield put(profileActions.loadProfileStart());
	} catch (error) {
		if (error.response.status === 500 || error.response.status === 422) {
			yield put(
				profileActions.updateProfileFailure(error.response.data.message)
			);
		}
	}
	yield put(profileActions.updateProfileEnd());
}

const loggedInUserId = (state) => state.auth.loggedInUserId;

const uploadAvatarIfExists = (avatar, userId) => {
	if (!avatar) {
		return Promise.resolve({ status: 200 });
	}
	const formData = new FormData();
	formData.append('avatar', avatar);
	return axios.post(UPLOAD_AVATAR_URL + userId, formData, {
		headers: {
			'Content-Type': 'multipart/form-data'
		}
	});
};

const sendUpdateProfileRequest = (profile) => {
	return axios.post(UPDATE_PROFILE_URL, { profile });
};

function* profileSaga() {
	yield takeEvery(profileActionTypes.LOAD_PROFILE_START, loadProfileStart);
	yield takeEvery(
		profileActionTypes.UPDATE_PROFILE_START,
		updateProfileStart
	);
}

export default profileSaga;
