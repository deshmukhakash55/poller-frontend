import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import Poller from './Poller';
import reportWebVitals from './reportWebVitals';
import { checkLoginStatusStart } from './store/actions/auth.actions';
import { authReducer } from './store/reducers/auth.reducer';
import { pollsReducer } from './store/reducers/polls.reducer';
import { followingReducer } from './store/reducers/following.reducer';
import { notificationReducer } from './store/reducers/notification.reducer';
import { profileReducer } from './store/reducers/profile.reducer';
import { searchReducer } from './store/reducers/search.reducer';
import { networkReducer } from './store/reducers/network.reducer';
import authSaga from './store/sagas/auth.saga';
import pollsSaga from './store/sagas/polls.saga';
import followingSaga from './store/sagas/following.saga';
import notificationSaga from './store/sagas/notification.saga';
import searchSaga from './store/sagas/search.saga';
import profileSaga from './store/sagas/profile.saga';
import initializeSocket from './configs/socketio';
import { watchNetworkStatus } from './configs/network';

import './index.css';

const prod = false;

const reducers = combineReducers({
	auth: authReducer,
	poll: pollsReducer,
	following: followingReducer,
	notification: notificationReducer,
	search: searchReducer,
	profile: profileReducer,
	network: networkReducer
});

let composeEnhancers;
if (prod) {
	composeEnhancers = compose;
} else {
	composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
	reducers,
	composeEnhancers(applyMiddleware(sagaMiddleware))
);

ReactDOM.render(
	<Provider store={store}>
		<Poller />
	</Provider>,
	document.getElementById('root')
);

sagaMiddleware.run(authSaga);
sagaMiddleware.run(pollsSaga);
sagaMiddleware.run(followingSaga);
sagaMiddleware.run(notificationSaga);
sagaMiddleware.run(searchSaga);
sagaMiddleware.run(profileSaga);

store.dispatch(checkLoginStatusStart());

watchNetworkStatus(store);

initializeSocket();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
