import { takeEvery } from 'redux-saga/effects';
import * as notificationActionTypes from '../actions/actionTypes/notification.actionTypes';
import * as notificationActions from '../actions/notification.action';
import axios from '../../configs/axios';
import {
	GET_NOTIFICATIONS_URL,
	READ_ALL_NOTIFICATIONS_URL,
	GET_ALL_NOTIFICATIONS_URL
} from '../../configs/endpoints';
import { put } from 'redux-saga/effects';

function* loadNotificationsStart() {
	try {
		yield put(notificationActions.loadNotificationsProgress());
		const response = yield sendLoadNotificationsRequest();
		if (response.status === 200) {
			yield put(
				notificationActions.loadNotificationsSuccess(
					response.data.notifications
				)
			);
		}
	} catch (error) {
		if (error.response.status === 500) {
			yield put(
				notificationActions.loadNotificationsFailure(
					error.response.data.message
				)
			);
		}
	}
	yield put(notificationActions.loadNotificationsEnd());
}

const sendLoadNotificationsRequest = () => {
	return axios.get(GET_NOTIFICATIONS_URL);
};

function* readAllNotificationsStart() {
	try {
		yield put(notificationActions.readAllNotificationsProgress());
		const response = yield sendReadAllNotificationsRequest();
		if (response.status === 200) {
			yield put(
				notificationActions.readAllNotificationsSuccess(
					response.data.notifications
				)
			);
		}
	} catch (error) {
		if (error.response.status === 500) {
			yield put(
				notificationActions.readAllNotificationsFailure(
					error.response.data.message
				)
			);
		}
	}
	yield put(notificationActions.readAllNotificationsEnd());
}

const sendReadAllNotificationsRequest = () => {
	return axios.post(READ_ALL_NOTIFICATIONS_URL);
};
function* loadAllNotificationsStart() {
	try {
		yield put(notificationActions.loadAllNotificationsProgress());
		const response = yield sendAllLoadNotificationsRequest();
		if (response.status === 200) {
			yield put(
				notificationActions.loadAllNotificationsSuccess(
					response.data.allNotifications
				)
			);
		}
	} catch (error) {
		if (error.response.status === 500) {
			yield put(
				notificationActions.loadAllNotificationsFailure(
					error.response.data.message
				)
			);
		}
	}
	yield put(notificationActions.loadAllNotificationsEnd());
}

const sendAllLoadNotificationsRequest = () => {
	return axios.get(GET_ALL_NOTIFICATIONS_URL);
};

function* notificationSaga() {
	yield takeEvery(
		notificationActionTypes.LOAD_NOTIFICATIONS_START,
		loadNotificationsStart
	);
	yield takeEvery(
		notificationActionTypes.READ_ALL_NOTIFICATIONS_START,
		readAllNotificationsStart
	);
	yield takeEvery(
		notificationActionTypes.LOAD_ALL_NOTIFICATIONS_START,
		loadAllNotificationsStart
	);
}

export default notificationSaga;
