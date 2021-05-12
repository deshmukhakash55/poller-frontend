import { io } from 'socket.io-client';
import { SOCKETIO_URL } from './endpoints';
import { store } from '../index';
import { addNewNotification } from '../store/actions/notification.action';

export let socket = null;

export let connectionId = null;

const initializeSocket = () => {
	socket = io(SOCKETIO_URL, { autoConnect: false });

	socket.on('new_notification', ({ message, isRead, createdDate }) => {
		store.dispatch(addNewNotification({ message, isRead, createdDate }));
	});
};

export default initializeSocket;
