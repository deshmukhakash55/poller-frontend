import * as followingActionTypes from '../actions/actionTypes/following.actionTypes';

const initialFollowingState = {
	recommendedFollowings: [],
	followings: [],
	followers: [],
	hasMoreRecommendedFollowings: false,
	isLoadRecommendedFollowingsProgress: false,
	isLoadRecommendedFollowingsSuccess: false,
	isLoadRecommendedFollowingsFailure: false,
	loadRecommendedFollowingsError: '',
	isAddNewFollowingProgress: false,
	isAddNewFollowingSuccess: false,
	isAddNewFollowingFailure: false,
	addNewFollowingError: '',
	isRemoveFollowingProgress: false,
	isRemoveFollowingSuccess: false,
	isRemoveFollowingFailure: false,
	removeFollowingError: '',
	isLoadFollowingProgress: false,
	isLoadFollowingSuccess: false,
	isLoadFollowingFailure: false,
	loadFollowingError: ''
};

export const followingReducer = (state = initialFollowingState, action) => {
	switch (action.type) {
		case followingActionTypes.LOAD_RECOMMENDED_FOLLOWINGS_PROGRESS:
			return {
				...state,
				isLoadRecommendedFollowingsProgress: true,
				isLoadRecommendedFollowingsSuccess: false,
				isLoadRecommendedFollowingsFailure: false,
				loadRecommendedFollowingsError: ''
			};
		case followingActionTypes.LOAD_RECOMMENDED_FOLLOWINGS_END:
			return {
				...state,
				isLoadRecommendedFollowingsProgress: false
			};
		case followingActionTypes.LOAD_RECOMMENDED_FOLLOWINGS_SUCCESS:
			const recommendedFollowings = [
				...state.recommendedFollowings,
				...action.payload.recommendedFollowings
			];
			return {
				...state,
				recommendedFollowings,
				hasMoreRecommendedFollowings:
					action.payload.hasMoreRecommendedFollowings,
				isLoadRecommendedFollowingsSuccess: true,
				isLoadRecommendedFollowingsFailure: false,
				loadRecommendedFollowingsError: ''
			};
		case followingActionTypes.LOAD_RECOMMENDED_FOLLOWINGS_FAILURE:
			return {
				...state,
				recommendedFollowings: [],
				isLoadRecommendedFollowingsSuccess: false,
				isLoadRecommendedFollowingsFailure: true,
				loadRecommendedFollowingsError: action.payload.reason
			};
		case followingActionTypes.ADD_NEW_FOLLOWING_PROGRESS:
			return {
				...state,
				isAddNewFollowingProgress: true,
				isAddNewFollowingSuccess: false,
				isAddNewFollowingFailure: false,
				addNewFollowingError: ''
			};
		case followingActionTypes.ADD_NEW_FOLLOWING_END:
			return {
				...state,
				isAddNewFollowingProgress: false
			};
		case followingActionTypes.ADD_NEW_FOLLOWING_SUCCESS:
			const updatedRecommendedFollowingsAfterAddNewFollowing = state.recommendedFollowings.filter(
				(recommendedFollowing) =>
					recommendedFollowing.userId !== action.payload.followee
			);
			return {
				...state,
				recommendedFollowings: [
					...updatedRecommendedFollowingsAfterAddNewFollowing
				],
				isAddNewFollowingSuccess: true,
				isAddNewFollowingFailure: false,
				addNewFollowingError: ''
			};
		case followingActionTypes.ADD_NEW_FOLLOWING_FAILURE:
			return {
				...state,
				isAddNewFollowingSuccess: false,
				isAddNewFollowingFailure: true,
				addNewFollowingError: action.payload.reason
			};
		case followingActionTypes.REMOVE_RECOMMENDED_FOLLOWING_SUCCESS:
			const updatedRecommendedFollowings = state.recommendedFollowings.filter(
				(recommendedFollowing) =>
					recommendedFollowing.userId !== action.payload.followee
			);
			return {
				...state,
				recommendedFollowings: [...updatedRecommendedFollowings]
			};
		case followingActionTypes.REMOVE_FOLLOWING_PROGRESS:
			return {
				...state,
				isRemoveFollowingProgress: true,
				isRemoveFollowingSuccess: false,
				isRemoveFollowingFailure: false,
				removeFollowingError: ''
			};
		case followingActionTypes.REMOVE_FOLLOWING_END:
			return {
				...state,
				isRemoveFollowingProgress: false
			};
		case followingActionTypes.REMOVE_FOLLOWING_SUCCESS:
			return {
				...state,
				isRemoveFollowingSuccess: true,
				isRemoveFollowingFailure: false,
				removeFollowingError: ''
			};
		case followingActionTypes.REMOVE_FOLLOWING_FAILURE:
			return {
				...state,
				isRemoveFollowingSuccess: false,
				isRemoveFollowingFailure: true,
				loadFollowingError: action.payload.reason
			};
		case followingActionTypes.LOAD_FOLLOWINGS_PROGRESS:
			return {
				...state,
				isLoadFollowingProgress: true,
				isLoadFollowingSuccess: false,
				isLoadFollowingFailure: false,
				loadFollowingError: ''
			};
		case followingActionTypes.LOAD_FOLLOWINGS_END:
			return {
				...state,
				isLoadFollowingProgress: false
			};
		case followingActionTypes.LOAD_FOLLOWINGS_SUCCESS:
			return {
				...state,
				isLoadFollowingSuccess: true,
				isLoadFollowingFailure: false,
				loadFollowingError: '',
				followings: [...action.payload.followings],
				followers: [...action.payload.followers]
			};
		case followingActionTypes.LOAD_FOLLOWINGS_FAILURE:
			return {
				...state,
				isLoadFollowingSuccess: false,
				isLoadFollowingFailure: true,
				loadFollowingError: action.payload.reason
			};
		case followingActionTypes.INITIALIZE_FOLLOWINGS:
			return {
				...initialFollowingState
			};
		case followingActionTypes.CLEAR_ADD_NEW_FOLLOWING_SUCCESS:
			return {
				...state,
				isAddNewFollowingSuccess: false
			};
		default:
			return { ...state };
	}
};
