import * as networkActionTypes from './actionTypes/network.actionTypes';

export const showNetworkError = () => ({
	type: networkActionTypes.SHOW_NETWORK_ERROR
});

export const clearNetworkError = () => ({
	type: networkActionTypes.CLEAR_NETWORK_ERROR
});
