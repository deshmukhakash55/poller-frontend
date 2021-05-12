import axios from 'axios';
import { store } from '../index';
import { logoutStart } from '../store/actions/auth.actions';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers.common['Authorization'] = 'Bearer ' + token;
	}
	return config;
});

axiosInstance.interceptors.response.use(
	(response) => response,
	(errorResponse) => {
		if (
			errorResponse.response.status === 401 &&
			errorResponse.response.data.message === 'Invalid token'
		) {
			const refreshToken = localStorage.getItem('refreshToken');
			const userId = localStorage.getItem('_uid');
			store.dispatch(logoutStart(refreshToken, userId));
		}
		return errorResponse;
	}
);

export default axiosInstance;
