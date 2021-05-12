import React, { useState } from 'react';
import { connect } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchedUsers from '../SearchedUsers/SearchedUsers';
import SearchedPolls from '../SearchedPolls/SearchedPolls';
import { searchAgain } from '../../store/actions/search.actions';

import * as classes from './SearchResults.module.css';

const SearchResults = (props) => {
	const [tabIndex, setTabIndex] = useState(0);

	const handleChange = (event, newValue) => {
		setTabIndex(newValue);
	};

	const handleReloadSearchResults = () => props.searchAgain();

	const tabContent =
		tabIndex === 0 ? (
			<SearchedPolls />
		) : (
			<SearchedUsers reloadSearchResults={handleReloadSearchResults} />
		);

	if (props.isSearchProgress) {
		return (
			<div className={classes.SearchResultsLoadingSpinner}>
				<CircularProgress />
				<div className={classes.SearchResultsLoadingMessage}>
					Searching...
				</div>
			</div>
		);
	}

	return (
		<div className={classes.SearchResults}>
			<Tabs
				value={tabIndex}
				onChange={handleChange}
				indicatorColor="primary"
				textColor="primary"
				variant="fullWidth"
			>
				<Tab label="Polls" />
				<Tab label="Users" />
			</Tabs>
			{tabContent}
		</div>
	);
};

const mapStateToProps = (state) => ({
	isSearchProgress: state.search.isSearchProgress
});

const mapDispatchToProps = (dispatch) => ({
	searchAgain: () => dispatch(searchAgain())
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
