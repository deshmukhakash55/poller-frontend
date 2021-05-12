import * as notificationActionTypes from './actionTypes/notification.actionTypes';

export const loadNotificationsStart = () => ({
	type: notificationActionTypes.LOAD_NOTIFICATIONS_START
});

export const loadNotificationsProgress = () => ({
	type: notificationActionTypes.LOAD_NOTIFICATIONS_PROGRESS
});

export const loadNotificationsEnd = () => ({
	type: notificationActionTypes.LOAD_NOTIFICATIONS_END
});

export const loadNotificationsSuccess = (notifications) => ({
	type: notificationActionTypes.LOAD_NOTIFICATIONS_SUCCESS,
	payload: { notifications }
});

export const loadNotificationsFailure = () => ({
	type: notificationActionTypes.LOAD_NOTIFICATIONS_FAILURE
});

export const readAllNotificationsStart = () => ({
	type: notificationActionTypes.READ_ALL_NOTIFICATIONS_START
});

export const readAllNotificationsProgress = () => ({
	type: notificationActionTypes.READ_ALL_NOTIFICATIONS_PROGRESS
});

export const readAllNotificationsEnd = () => ({
	type: notificationActionTypes.READ_ALL_NOTIFICATIONS_END
});

export const readAllNotificationsSuccess = (notifications) => ({
	type: notificationActionTypes.READ_ALL_NOTIFICATIONS_SUCCESS,
	payload: { notifications }
});

export const readAllNotificationsFailure = () => ({
	type: notificationActionTypes.READ_ALL_NOTIFICATIONS_FAILURE
});

export const addNewNotification = (notification) => ({
	type: notificationActionTypes.ADD_NEW_NOTIFICATION,
	payload: { notification }
});

export const loadAllNotificationsStart = () => ({
	type: notificationActionTypes.LOAD_ALL_NOTIFICATIONS_START
});

export const loadAllNotificationsProgress = () => ({
	type: notificationActionTypes.LOAD_ALL_NOTIFICATIONS_PROGRESS
});

export const loadAllNotificationsEnd = () => ({
	type: notificationActionTypes.LOAD_ALL_NOTIFICATIONS_END
});

export const loadAllNotificationsSuccess = (allNotifications) => ({
	type: notificationActionTypes.LOAD_ALL_NOTIFICATIONS_SUCCESS,
	payload: { allNotifications }
});

export const loadAllNotificationsFailure = () => ({
	type: notificationActionTypes.LOAD_ALL_NOTIFICATIONS_FAILURE
});
