import { put, select, takeEvery } from 'redux-saga/effects';

import * as searchActionTypes from '../actions/actionTypes/search.actionTypes';
import * as searchActions from '../actions/search.actions';
import axios from '../../configs/axios';

import { SEARCH_URL } from '../../configs/endpoints';

function* searchStart(action) {
	yield put(searchActions.searchProgress());
	try {
		const { searchText } = action.payload;
		const response = yield sendSearchRequestFor(searchText);
		if (response.status === 200) {
			const { searchedPolls, searchedUsers } = response.data;
			yield put(
				searchActions.searchSuccess(
					searchedPolls,
					searchedUsers,
					searchText
				)
			);
		}
	} catch (error) {
		if (error.response.status === 500 || error.response.status === 422) {
			yield put(searchActions.searchFailure(error.response.data.message));
		}
	}
	yield put(searchActions.searchEnd());
}

const sendSearchRequestFor = (searchText) => {
	return axios.post(SEARCH_URL, { searchText });
};

function* searchAgain() {
	const searchText = yield select(getSearchText);
	yield put(searchActions.searchStart(searchText));
}

const getSearchText = (state) => state.search.searchText;

function* searchSaga() {
	yield takeEvery(searchActionTypes.SEARCH_START, searchStart);
	yield takeEvery(searchActionTypes.SEARCH_AGAIN, searchAgain);
}

export default searchSaga;
