import * as notificationActionTypes from './actionTypes/auth.actionTypes';

export const checkLoginStatusStart = () => ({
	type: notificationActionTypes.CHECK_LOGIN_STATUS_START
});

export const checkLoginStatusProgress = () => ({
	type: notificationActionTypes.CHECK_LOGIN_STATUS_PROGRESS
});

export const checkLoginStatusEnd = () => ({
	type: notificationActionTypes.CHECK_LOGIN_STATUS_END
});

export const checkLoginStatusSuccess = (_uid) => ({
	type: notificationActionTypes.CHECK_LOGIN_STATUS_SUCCESS,
	payload: { _uid }
});

export const loginStart = (email, password) => ({
	type: notificationActionTypes.LOGIN_START,
	payload: { email, password }
});

export const loginProgress = () => ({
	type: notificationActionTypes.LOGIN_PROGRESS
});

export const loginEnd = () => ({
	type: notificationActionTypes.LOGIN_END
});

export const loginSuccess = (_uid) => ({
	type: notificationActionTypes.LOGIN_SUCCESS,
	payload: { _uid }
});

export const loginFailure = (reason) => ({
	type: notificationActionTypes.LOGIN_FAILURE,
	payload: { reason }
});

export const registerStart = (name, email, password) => ({
	type: notificationActionTypes.REGISTER_START,
	payload: { name, email, password }
});

export const registerProgress = () => ({
	type: notificationActionTypes.REGISTER_PROGRESS
});

export const registerEnd = () => ({
	type: notificationActionTypes.REGISTER_END
});

export const registerSuccess = () => ({
	type: notificationActionTypes.REGISTER_SUCCESS
});

export const registerFailure = (reason) => ({
	type: notificationActionTypes.REGISTER_FAILURE,
	payload: { reason }
});

export const verifyEmailStart = (token) => ({
	type: notificationActionTypes.VERIFY_EMAIL_START,
	payload: { token }
});

export const verifyEmailProgress = () => ({
	type: notificationActionTypes.VERIFY_EMAIL_PROGRESS
});

export const verifyEmailEnd = () => ({
	type: notificationActionTypes.VERIFY_EMAIL_END
});

export const verifyEmailSuccess = () => ({
	type: notificationActionTypes.VERIFY_EMAIL_SUCCESS
});

export const verifyEmailFailure = (reason) => ({
	type: notificationActionTypes.VERIFY_EMAIL_FAILURE,
	payload: { reason }
});

export const resetPasswordStart = (userId, password, passwordResetToken) => ({
	type: notificationActionTypes.RESET_PASSWORD_START,
	payload: { userId, password, passwordResetToken }
});

export const resetPasswordProgress = () => ({
	type: notificationActionTypes.RESET_PASSWORD_PROGRESS
});

export const resetPasswordEnd = () => ({
	type: notificationActionTypes.RESET_PASSWORD_END
});

export const resetPasswordSuccess = () => ({
	type: notificationActionTypes.RESET_PASSWORD_SUCCESS
});

export const resetPasswordFailure = (reason) => ({
	type: notificationActionTypes.RESET_PASSWORD_FAILURE,
	payload: { reason }
});

export const sendResetPasswordLinkStart = (email) => ({
	type: notificationActionTypes.SEND_RESET_PASSWORD_LINK_START,
	payload: { email }
});

export const sendResetPasswordLinkProgress = () => ({
	type: notificationActionTypes.SEND_RESET_PASSWORD_LINK_PROGRESS
});

export const sendResetPasswordLinkEnd = () => ({
	type: notificationActionTypes.SEND_RESET_PASSWORD_LINK_END
});

export const sendResetPasswordLinkSuccess = () => ({
	type: notificationActionTypes.SEND_RESET_PASSWORD_LINK_SUCCESS
});

export const sendResetPasswordLinkFailure = (reason) => ({
	type: notificationActionTypes.SEND_RESET_PASSWORD_LINK_FAILURE,
	payload: { reason }
});

export const logoutStart = () => ({
	type: notificationActionTypes.LOGOUT_START
});

export const logoutProgress = () => ({
	type: notificationActionTypes.LOGOUT_PROGRESS
});

export const logoutEnd = () => ({
	type: notificationActionTypes.LOGOUT_END
});

export const logoutSuccess = () => ({
	type: notificationActionTypes.LOGOUT_SUCCESS
});

export const logoutFailure = (reason) => ({
	type: notificationActionTypes.LOGOUT_FAILURE,
	payload: { reason }
});

export const clearRegisterSuccess = () => ({
	type: notificationActionTypes.CLEAR_REGISTER_SUCCESS
});
