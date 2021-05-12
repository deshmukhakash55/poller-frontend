import * as profileActionTypes from '../actions/actionTypes/profile.actionTypes';

const initialProfileState = {
	profile: null,
	isLoadProfileSuccess: false,
	isLoadProfileEnd: false,
	isLoadProfileFailure: false,
	loadProfileError: '',
	isUpdateProfileSuccess: false,
	isUpdateProfileEnd: false,
	isUpdateProfileFailure: false,
	updateProfileError: ''
};

export const profileReducer = (state = initialProfileState, action) => {
	switch (action.type) {
		case profileActionTypes.LOAD_PROFILE_PROGRESS:
			return {
				...state,
				isLoadProfileProgress: true,
				isLoadProfileSuccess: false,
				isLoadProfileFailure: false,
				loadProfileError: ''
			};
		case profileActionTypes.LOAD_PROFILE_END:
			return {
				...state,
				isLoadProfileProgress: false
			};
		case profileActionTypes.LOAD_PROFILE_SUCCESS:
			return {
				...state,
				isLoadProfileSuccess: true,
				isLoadProfileFailure: false,
				loadProfileError: '',
				profile: { ...action.payload.profile }
			};
		case profileActionTypes.LOAD_PROFILE_FAILURE:
			return {
				...state,
				isLoadProfileSuccess: false,
				isLoadProfileFailure: true,
				loadProfileError: action.payload.reason
			};
		case profileActionTypes.UPDATE_PROFILE_PROGRESS:
			return {
				...state,
				isUpdateProfileProgress: true,
				isUpdateProfileSuccess: false,
				isUpdateProfileFailure: false,
				updateProfileError: ''
			};
		case profileActionTypes.UPDATE_PROFILE_END:
			return {
				...state,
				isUpdateProfileProgress: false
			};
		case profileActionTypes.UPDATE_PROFILE_SUCCESS:
			return {
				...state,
				isUpdateProfileSuccess: true,
				isUpdateProfileFailure: false,
				updateProfileError: ''
			};
		case profileActionTypes.UPDATE_PROFILE_FAILURE:
			return {
				...state,
				isUpdateProfileSuccess: false,
				isUpdateProfileFailure: true,
				updateProfileError: action.payload.reason
			};
		case profileActionTypes.INITIALIZE_PROFILE:
			return {
				...initialProfileState
			};
		default:
			return {
				...state
			};
	}
};
