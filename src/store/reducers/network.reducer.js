import * as networkActionTypes from '../actions/actionTypes/network.actionTypes';

const initialNetworkState = {
	shouldShowNetworkError: false
};

export const networkReducer = (state = initialNetworkState, action) => {
	switch (action.type) {
		case networkActionTypes.SHOW_NETWORK_ERROR:
			return {
				...state,
				shouldShowNetworkError: true
			};
		case networkActionTypes.CLEAR_NETWORK_ERROR:
			return {
				...state,
				shouldShowNetworkError: false
			};
		default:
			return { ...state };
	}
};
