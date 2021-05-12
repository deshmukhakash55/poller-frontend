import * as profileActionTypes from './actionTypes/profile.actionTypes';

export const loadProfileStart = () => ({
	type: profileActionTypes.LOAD_PROFILE_START
});

export const loadProfileProgress = () => ({
	type: profileActionTypes.LOAD_PROFILE_PROGRESS
});

export const loadProfileEnd = () => ({
	type: profileActionTypes.LOAD_PROFILE_END
});

export const loadProfileSuccess = (profile) => ({
	type: profileActionTypes.LOAD_PROFILE_SUCCESS,
	payload: { profile }
});

export const loadProfileFailure = (reason) => ({
	type: profileActionTypes.LOAD_PROFILE_FAILURE,
	payload: { reason }
});

export const updateProfileStart = (profile) => ({
	type: profileActionTypes.UPDATE_PROFILE_START,
	payload: { profile }
});

export const updateProfileProgress = () => ({
	type: profileActionTypes.UPDATE_PROFILE_PROGRESS
});

export const updateProfileEnd = () => ({
	type: profileActionTypes.UPDATE_PROFILE_END
});

export const updateProfileSuccess = () => ({
	type: profileActionTypes.UPDATE_PROFILE_SUCCESS
});

export const updateProfileFailure = (reason) => ({
	type: profileActionTypes.UPDATE_PROFILE_FAILURE,
	payload: { reason }
});

export const initializeProfile = () => ({
	type: profileActionTypes.INITIALIZE_PROFILE
});
