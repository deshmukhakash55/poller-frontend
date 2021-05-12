import { socket } from '../../configs/socketio';
import * as authActionTypes from '../actions/actionTypes/auth.actionTypes';

const initialAuthState = {
	loggedInUserId: null,
	isLoginProgress: false,
	isLoginSuccess: false,
	isLoginFailure: false,
	loginError: '',
	isRegisterProgress: false,
	isRegisterSuccess: false,
	isRegisterFailure: false,
	registerError: '',
	isVerifyEmailProgress: false,
	isVerifyEmailSuccess: false,
	isVerifyEmailFailure: false,
	verifyEmailError: '',
	isResetPasswordProgress: false,
	isResetPasswordSuccess: false,
	isResetPasswordFailure: false,
	resetPasswordError: '',
	isSendResetPasswordLinkProgress: false,
	isSendResetPasswordLinkSuccess: false,
	isSendResetPasswordLinkFailure: false,
	sendResetPasswordLinkError: '',
	isLogoutProgress: false,
	isLogoutSuccess: false,
	isLogoutFailure: false,
	logoutError: '',
	isCheckLoginStatusProgress: false,
	isCheckLoginStatusSuccess: false
};

export const authReducer = (state = initialAuthState, action) => {
	switch (action.type) {
		case authActionTypes.LOGIN_PROGRESS:
			return {
				...state,
				isLoginProgress: true,
				isLoginSuccess: false,
				isLoginFailure: false,
				loginError: ''
			};
		case authActionTypes.LOGIN_END:
			return {
				...state,
				isLoginProgress: false
			};
		case authActionTypes.LOGIN_SUCCESS:
			socket.auth = { uid: action.payload._uid };
			socket.connect();
			return {
				...state,
				isLoginSuccess: true,
				isLoginFailure: false,
				isLogoutSuccess: false,
				loginError: '',
				loggedInUserId: action.payload._uid
			};
		case authActionTypes.LOGIN_FAILURE:
			return {
				...state,
				isLoginSuccess: false,
				isLoginFailure: true,
				loginError: action.payload.reason
			};
		case authActionTypes.REGISTER_PROGRESS:
			return {
				...state,
				isRegisterProgress: true,
				isRegisterSuccess: false,
				isRegisterFailure: false,
				registerError: ''
			};
		case authActionTypes.REGISTER_END:
			return {
				...state,
				isRegisterProgress: false
			};
		case authActionTypes.REGISTER_SUCCESS:
			return {
				...state,
				isRegisterSuccess: true,
				isRegisterFailure: false,
				registerError: ''
			};
		case authActionTypes.REGISTER_FAILURE:
			return {
				...state,
				isRegisterSuccess: false,
				isRegisterFailure: true,
				registerError: action.payload.reason
			};
		case authActionTypes.VERIFY_EMAIL_PROGRESS:
			return {
				...state,
				isVerifyEmailProgress: true,
				isVerifyEmailSuccess: false,
				isVerifyEmailFailure: false,
				verifyEmailError: ''
			};
		case authActionTypes.VERIFY_EMAIL_END:
			return {
				...state,
				isVerifyEmailProgress: false
			};
		case authActionTypes.VERIFY_EMAIL_SUCCESS:
			return {
				...state,
				isVerifyEmailSuccess: true,
				isVerifyEmailFailure: false,
				verifyEmailError: ''
			};
		case authActionTypes.VERIFY_EMAIL_FAILURE:
			return {
				...state,
				isVerifyEmailSuccess: false,
				isVerifyEmailFailure: true,
				verifyEmailError: action.payload.reason
			};
		case authActionTypes.RESET_PASSWORD_PROGRESS:
			return {
				...state,
				isVerifyEmailProgress: true,
				isVerifyEmailSuccess: false,
				isVerifyEmailFailure: false,
				resetPasswordError: ''
			};
		case authActionTypes.RESET_PASSWORD_END:
			return {
				...state,
				isResetPasswordProgress: false
			};
		case authActionTypes.RESET_PASSWORD_SUCCESS:
			return {
				...state,
				isResetPasswordSuccess: true,
				isResetPasswordFailure: false,
				resetPasswordError: ''
			};
		case authActionTypes.RESET_PASSWORD_FAILURE:
			return {
				...state,
				isResetPasswordSuccess: false,
				isResetPasswordFailure: true,
				resetPasswordError: action.payload.reason
			};
		case authActionTypes.SEND_RESET_PASSWORD_LINK_PROGRESS:
			return {
				...state,
				isSendResetPasswordLinkProgress: true,
				isSendResetPasswordLinkSuccess: false,
				isSendResetPasswordLinkFailure: false,
				sendResetPasswordLinkError: ''
			};
		case authActionTypes.SEND_RESET_PASSWORD_LINK_END:
			return {
				...state,
				isSendResetPasswordLinkProgress: false
			};
		case authActionTypes.SEND_RESET_PASSWORD_LINK_SUCCESS:
			return {
				...state,
				isSendResetPasswordLinkSuccess: true,
				isSendResetPasswordLinkFailure: false,
				sendResetPasswordLinkError: ''
			};
		case authActionTypes.SEND_RESET_PASSWORD_LINK_FAILURE:
			return {
				...state,
				isSendResetPasswordLinkSuccess: false,
				isSendResetPasswordLinkFailure: true,
				sendResetPasswordLinkError: action.payload.reason
			};
		case authActionTypes.LOGOUT_PROGRESS:
			return {
				...state,
				isLogoutProgress: true,
				isLogoutSuccess: false,
				isLogoutFailure: false,
				logoutError: ''
			};
		case authActionTypes.LOGOUT_END:
			return {
				...state,
				isLogoutProgress: false
			};
		case authActionTypes.LOGOUT_SUCCESS:
			socket.disconnect();
			return {
				...state,
				isLogoutSuccess: true,
				isLogoutFailure: false,
				logoutError: '',
				loggedInUserId: null
			};
		case authActionTypes.LOGOUT_FAILURE:
			return {
				...state,
				isLogoutSuccess: false,
				isLogoutFailure: true,
				logoutError: action.payload.reason
			};
		case authActionTypes.CHECK_LOGIN_STATUS_PROGRESS:
			return {
				...state,
				isCheckLoginStatusProgress: true,
				isCheckLoginStatusSuccess: false
			};
		case authActionTypes.CHECK_LOGIN_STATUS_END:
			return {
				...state,
				isCheckLoginStatusProgress: false
			};
		case authActionTypes.CHECK_LOGIN_STATUS_SUCCESS:
			socket.auth = { uid: action.payload._uid };
			socket.connect();
			return {
				...state,
				isCheckLoginStatusSuccess: true,
				loggedInUserId: action.payload._uid
			};
		case authActionTypes.CLEAR_REGISTER_SUCCESS:
			return {
				...state,
				isRegisterSuccess: false
			};
		default:
			return { ...state };
	}
};
