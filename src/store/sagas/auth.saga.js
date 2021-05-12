import { put, takeEvery } from 'redux-saga/effects';

import * as authActionTypes from '../actions/actionTypes/auth.actionTypes';
import * as authActions from '../actions/auth.actions';
import { initializePolls } from '../actions/polls.actions';
import { initializeFollowing } from '../actions/following.actions';
import { initializeSearch } from '../actions/search.actions';
import axios from '../../configs/axios';
import {
	LOGIN_URL,
	REFRESH_TOKEN_URL,
	REGISTER_URL,
	VERIFY_EMAIL_URL,
	RESET_PASSWORD_URL,
	SEND_RESET_PASSWORD_URL,
	LOGOUT_URL
} from '../../configs/endpoints';

let setTimeoutRef = null;

function* checkLoginStatusStart() {
	yield put(authActions.checkLoginStatusProgress());
	const { token, refreshToken, _uid } = getTokensIfExists();
	if (!token) {
		yield put(authActions.checkLoginStatusEnd());
		return;
	}
	yield startRefreshTokenProcess({ refreshToken, _uid });
	yield put(authActions.checkLoginStatusEnd());
	const newLoginInformation = getTokensIfExists();
	yield put(authActions.checkLoginStatusSuccess(newLoginInformation._uid));
	yield put(authActions.checkLoginStatusEnd());
}

const getTokensIfExists = () => {
	const token = localStorage.getItem('token') || null;
	const expiryTime = +localStorage.getItem('expiryTime') || null;
	const refreshToken = localStorage.getItem('refreshToken') || null;
	const _uid = localStorage.getItem('_uid') || null;
	return { token, expiryTime, refreshToken, _uid };
};

function* loginStart(action) {
	const { email, password } = action.payload;
	yield put(authActions.loginProgress());
	try {
		const response = yield sendLoginRequest(email, password);
		if (response.status === 200) {
			const { token, expiryTime, refreshToken, _uid } = response.data;
			yield put(authActions.loginSuccess(_uid));
			addToLocalStorage({ token, expiryTime, refreshToken, _uid });
			setTokenRefreshProcess({ token, expiryTime, refreshToken, _uid });
		}
		if (response.response && response.response.status === 422) {
			yield put(authActions.loginFailure(response.response.data.message));
		}
	} catch (error) {
		if (error.response.status === 500 || error.response.status === 422) {
			yield put(authActions.loginFailure(error.response.data.message));
		}
	}
	yield put(authActions.loginEnd());
}

const addToLocalStorage = ({ token, expiryTime, refreshToken, _uid }) => {
	localStorage.setItem('token', token);
	localStorage.setItem('expiryTime', +expiryTime);
	localStorage.setItem('refreshToken', refreshToken);
	localStorage.setItem('_uid', _uid);
};

const setTokenRefreshProcess = ({ expiryTime, refreshToken, _uid }) => {
	const tokenExpiryTime = +expiryTime;
	if (!!setTimeoutRef) {
		clearTimeout(setTimeoutRef);
	}
	setTimeoutRef = setTimeout(
		() => startRefreshTokenProcess({ refreshToken, _uid }),
		tokenExpiryTime
	);
};

const startRefreshTokenProcess = async ({ refreshToken, _uid }) => {
	try {
		const response = await sendRefreshTokenRequest({ refreshToken, _uid });
		if (response.status === 200) {
			const { token, expiryTime } = response.data;
			addToLocalStorage({
				token,
				expiryTime,
				refreshToken: response.data.refreshToken,
				_uid: response.data._uid
			});
			setTokenRefreshProcess({
				expiryTime,
				refreshToken: response.data.refreshToken,
				_uid: response.data._uid
			});
		}
	} catch (error) {}
};

const sendRefreshTokenRequest = ({ refreshToken, _uid }) => {
	return axios.post(REFRESH_TOKEN_URL, { _uid, refreshToken });
};

const sendLoginRequest = (email, password) => {
	return axios.post(LOGIN_URL, { email, password });
};

function* registerStart(action) {
	const { name, email, password } = action.payload;
	yield put(authActions.registerProgress());
	try {
		const response = yield sendRegisterRequest(name, email, password);
		if (response.status === 201) {
			yield put(authActions.registerSuccess(response.data.message));
		}
		if (response.response && response.response.status === 422) {
			yield put(
				authActions.registerFailure(response.response.data.message)
			);
		}
	} catch (error) {
		if (error.response.status === 500 || error.response.status === 422) {
			yield put(authActions.registerFailure(error.response.data.message));
		}
	}
	yield put(authActions.registerEnd());
}

const sendRegisterRequest = (name, email, password) => {
	return axios.post(REGISTER_URL, { name, email, password });
};

function* verifyEmailStart(action) {
	const token = action.payload.token;
	yield put(authActions.verifyEmailProgress());
	let response;
	try {
		response = yield sendVerifyEmailRequest(token);
		if (response.status === 200) {
			yield put(authActions.verifyEmailSuccess());
		}
	} catch (error) {
		if (error.response.status === 500 || error.response.status === 422) {
			yield put(
				authActions.verifyEmailFailure(error.response.data.message)
			);
		}
	}
	yield put(authActions.verifyEmailEnd());
}

const sendVerifyEmailRequest = (token) => {
	return axios.post(VERIFY_EMAIL_URL, { token });
};

function* resetPasswordStart(action) {
	const { userId, password, passwordResetToken } = action.payload;
	yield put(authActions.resetPasswordProgress());
	try {
		yield sendResetPasswordRequest({
			userId,
			password,
			passwordResetToken
		});
		yield put(authActions.resetPasswordSuccess());
	} catch (error) {
		if (error.response.status === 500 || error.response.status === 422) {
			yield put(
				authActions.resetPasswordFailure(error.response.data.message)
			);
		}
	}
}

const sendResetPasswordRequest = ({ userId, password, passwordResetToken }) => {
	return axios.post(RESET_PASSWORD_URL, {
		userId,
		password,
		passwordResetToken
	});
};

function* sendResetPasswordLinkStart(action) {
	const { email } = action.payload;
	yield put(authActions.sendResetPasswordLinkProgress());
	try {
		yield sendResetPasswordLinkRequest(email);
		yield put(authActions.sendResetPasswordLinkSuccess());
	} catch (error) {
		yield put(
			authActions.sendResetPasswordLinkFailure(
				error.response.data.message
			)
		);
	}
}

const sendResetPasswordLinkRequest = (email) => {
	return axios.post(SEND_RESET_PASSWORD_URL, { email });
};

function* logoutStart() {
	const refreshToken = localStorage.getItem('refreshToken');
	const userId = localStorage.getItem('_uid');
	yield put(authActions.logoutProgress());
	try {
		yield sendLogoutRequest({ refreshToken, userId });
		yield put(authActions.logoutSuccess());
		removeTokensFromStorage();
		yield put(initializePolls());
		yield put(initializeFollowing());
		yield put(initializeSearch());
		clearTimeout(setTimeoutRef);
	} catch (error) {
		yield put(authActions.logoutFailure());
	}
	yield put(authActions.logoutEnd());
}

const sendLogoutRequest = ({ refreshToken, userId }) => {
	return axios.post(LOGOUT_URL, { refreshToken, userId });
};

const removeTokensFromStorage = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expiryTime');
	localStorage.removeItem('refreshToken');
	localStorage.removeItem('_uid');
};

function* authSaga() {
	yield takeEvery(
		authActionTypes.CHECK_LOGIN_STATUS_START,
		checkLoginStatusStart
	);
	yield takeEvery(authActionTypes.LOGIN_START, loginStart);
	yield takeEvery(authActionTypes.REGISTER_START, registerStart);
	yield takeEvery(authActionTypes.VERIFY_EMAIL_START, verifyEmailStart);
	yield takeEvery(authActionTypes.RESET_PASSWORD_START, resetPasswordStart);
	yield takeEvery(
		authActionTypes.SEND_RESET_PASSWORD_LINK_START,
		sendResetPasswordLinkStart
	);
	yield takeEvery(authActionTypes.LOGOUT_START, logoutStart);
}

export default authSaga;
