import * as notificationActionTypes from '../actions/actionTypes/notification.actionTypes';

const initialNotificationState = {
	notifications: [],
	allNotifications: [],
	isLoadNotificationsProgress: false,
	isLoadNotificationsSuccess: false,
	isLoadNotificationsFailure: false,
	loadNotificationsError: '',
	isReadAllNotificationsProgress: false,
	isReadAllNotificationsSuccess: false,
	isReadAllNotificationsFailure: false,
	readAllNotificationsError: '',
	isAddNewNotificationProgress: false,
	isAddNewNotificationSuccess: false,
	isAddNewNotificationFailure: false,
	addNewNotificationError: '',
	isLoadAllNotificationsProgress: false,
	isLoadAllNotificationsSuccess: false,
	isLoadAllNotificationsFailure: false,
	loadAllNotificationsError: ''
};

export const notificationReducer = (
	state = initialNotificationState,
	action
) => {
	switch (action.type) {
		case notificationActionTypes.LOAD_NOTIFICATIONS_PROGRESS:
			return {
				...state,
				isLoadNotificationsProgress: true,
				isLoadNotificationsSuccess: false,
				isLoadNotificationsFailure: false,
				loadNotificationsError: ''
			};
		case notificationActionTypes.LOAD_NOTIFICATIONS_END:
			return {
				...state,
				isLoadNotificationsProgress: false
			};
		case notificationActionTypes.LOAD_NOTIFICATIONS_SUCCESS:
			return {
				...state,
				isLoadNotificationsSuccess: true,
				isLoadNotificationsFailure: false,
				loadNotificationsError: '',
				notifications: [...action.payload.notifications]
			};
		case notificationActionTypes.LOAD_NOTIFICATIONS_FAILURE:
			return {
				...state,
				unreadNotifications: [],
				hasMoreUnreadNotification: false,
				isLoadNotificationsSuccess: false,
				isLoadNotificationsFailure: true,
				loadNotificationsError: action.payload.reason
			};
		case notificationActionTypes.READ_ALL_NOTIFICATIONS_PROGRESS:
			return {
				...state,
				isReadAllNotificationsProgress: true,
				isReadAllNotificationsSuccess: false,
				isReadAllNotificationsFailure: false,
				readAllNotificationsError: ''
			};
		case notificationActionTypes.READ_ALL_NOTIFICATIONS_END:
			return {
				...state,
				isReadAllNotificationsProgress: false
			};
		case notificationActionTypes.READ_ALL_NOTIFICATIONS_SUCCESS:
			return {
				...state,
				isReadAllNotificationsSuccess: true,
				isReadAllNotificationsFailure: false,
				readAllNotificationsError: '',
				notifications: [...action.payload.notifications]
			};
		case notificationActionTypes.READ_ALL_NOTIFICATIONS_FAILURE:
			return {
				...state,
				notifications: [],
				isReadAllNotificationsSuccess: false,
				isReadAllNotificationsFailure: true,
				readAllNotificationsError: action.payload.reason
			};
		case notificationActionTypes.ADD_NEW_NOTIFICATION:
			const { notification } = action.payload;
			return {
				...state,
				notifications: [notification, ...state.notifications]
			};
		case notificationActionTypes.LOAD_ALL_NOTIFICATIONS_PROGRESS:
			return {
				...state,
				isLoadAllNotificationsProgress: true,
				isLoadAllNotificationsSuccess: false,
				isLoadAllNotificationsFailure: false,
				loadAllNotificationsError: ''
			};
		case notificationActionTypes.LOAD_ALL_NOTIFICATIONS_END:
			return {
				...state,
				isLoadAllNotificationsProgress: false
			};
		case notificationActionTypes.LOAD_ALL_NOTIFICATIONS_SUCCESS:
			return {
				...state,
				isLoadAllNotificationsSuccess: true,
				isLoadAllNotificationsFailure: false,
				loadAllNotificationsError: '',
				allNotifications: [...action.payload.allNotifications]
			};
		case notificationActionTypes.LOAD_ALL_NOTIFICATIONS_FAILURE:
			return {
				...state,
				allNotifications: [...action.payload.allNotifications],
				isLoadAllNotificationsSuccess: false,
				isLoadAllNotificationsFailure: true,
				loadAllNotificationsError: action.payload.reason
			};
		default:
			return {
				...state
			};
	}
};
