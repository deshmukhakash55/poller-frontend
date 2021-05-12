import * as followingActionTypes from './actionTypes/following.actionTypes';

export const loadRecommendedFollowingsStart = (pageNo) => ({
	type: followingActionTypes.LOAD_RECOMMENDED_FOLLOWINGS_START,
	payload: { pageNo }
});

export const loadRecommendedFollowingsProgress = () => ({
	type: followingActionTypes.LOAD_RECOMMENDED_FOLLOWINGS_PROGRESS
});

export const loadRecommendedFollowingsEnd = () => ({
	type: followingActionTypes.LOAD_RECOMMENDED_FOLLOWINGS_END
});

export const loadRecommendedFollowingsSuccess = (
	recommendedFollowings,
	hasMoreRecommendedFollowings
) => ({
	type: followingActionTypes.LOAD_RECOMMENDED_FOLLOWINGS_SUCCESS,
	payload: { recommendedFollowings, hasMoreRecommendedFollowings }
});

export const loadRecommendedFollowingsFailure = (reason) => ({
	type: followingActionTypes.LOAD_RECOMMENDED_FOLLOWINGS_FAILURE,
	payload: { reason }
});

export const addNewFollowingStart = (followee) => ({
	type: followingActionTypes.ADD_NEW_FOLLOWING_START,
	payload: { followee }
});

export const addNewFollowingProgress = () => ({
	type: followingActionTypes.ADD_NEW_FOLLOWING_PROGRESS
});

export const addNewFollowingEnd = () => ({
	type: followingActionTypes.ADD_NEW_FOLLOWING_END
});

export const addNewFollowingSuccess = (followee) => ({
	type: followingActionTypes.ADD_NEW_FOLLOWING_SUCCESS,
	payload: { followee }
});

export const addNewFollowingFailure = (reason) => ({
	type: followingActionTypes.ADD_NEW_FOLLOWING_FAILURE,
	payload: { reason }
});

export const removeRecommendedFollowingStart = (followee) => ({
	type: followingActionTypes.REMOVE_RECOMMENDED_FOLLOWING_START,
	payload: { followee }
});

export const removeRecommendedFollowingProgress = () => ({
	type: followingActionTypes.REMOVE_RECOMMENDED_FOLLOWING_PROGRESS
});

export const removeRecommendedFollowingEnd = () => ({
	type: followingActionTypes.REMOVE_RECOMMENDED_FOLLOWING_END
});

export const removeRecommendedFollowingSuccess = () => ({
	type: followingActionTypes.REMOVE_RECOMMENDED_FOLLOWING_SUCCESS
});

export const removeRecommendedFollowingFailure = (reason) => ({
	type: followingActionTypes.REMOVE_RECOMMENDED_FOLLOWING_FAILURE,
	payload: { reason }
});

export const removeFollowingStart = (followee) => ({
	type: followingActionTypes.REMOVE_FOLLOWING_START,
	payload: { followee }
});

export const removeFollowingProgress = () => ({
	type: followingActionTypes.REMOVE_FOLLOWING_PROGRESS
});

export const removeFollowingEnd = () => ({
	type: followingActionTypes.REMOVE_FOLLOWING_END
});

export const removeFollowingSuccess = () => ({
	type: followingActionTypes.REMOVE_FOLLOWING_SUCCESS
});

export const removeFollowingFailure = (reason) => ({
	type: followingActionTypes.REMOVE_FOLLOWING_FAILURE,
	payload: { reason }
});

export const loadFollowingsStart = () => ({
	type: followingActionTypes.LOAD_FOLLOWINGS_START
});

export const loadFollowingsProgress = () => ({
	type: followingActionTypes.LOAD_FOLLOWINGS_PROGRESS
});

export const loadFollowingsEnd = () => ({
	type: followingActionTypes.LOAD_FOLLOWINGS_END
});

export const loadFollowingsSuccess = (followings, followers) => ({
	type: followingActionTypes.LOAD_FOLLOWINGS_SUCCESS,
	payload: { followings, followers }
});

export const loadFollowingsFailure = (reason) => ({
	type: followingActionTypes.LOAD_FOLLOWINGS_FAILURE,
	payload: { reason }
});

export const initializeFollowing = () => ({
	type: followingActionTypes.INITIALIZE_FOLLOWINGS
});

export const clearAddNewFollowingSuccess = () => ({
	type: followingActionTypes.CLEAR_ADD_NEW_FOLLOWING_SUCCESS
});
