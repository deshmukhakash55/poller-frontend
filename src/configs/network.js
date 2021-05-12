import * as networkActions from '../store/actions/network.action';

export const watchNetworkStatus = (store) => {
	if (navigator.onLine) {
		store.dispatch(networkActions.clearNetworkError());
	} else {
		store.dispatch(networkActions.showNetworkError());
	}

	window.addEventListener('online', () => {
		store.dispatch(networkActions.clearNetworkError());
	});

	window.addEventListener('offline', () => {
		store.dispatch(networkActions.showNetworkError());
	});
};
