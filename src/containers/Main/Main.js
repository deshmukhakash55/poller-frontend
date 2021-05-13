import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import RecommendedUsers from '../../components/RecommendedUsers/RecommendedUsers';
import RecommendedPolls from '../RecommendedPolls/RecommendedPolls';
import { withStyles } from '@material-ui/core';
import TrendingPolls from '../TrendingPolls/TrendingPolls';
import YourPolls from '../YourPolls/YourPolls';
import FollowingsPolls from '../FollowingsPolls/FollowingsPolls';
import RespondedPolls from '../RespondedPolls/RespondedPolls';
import EndedPolls from '../EndedPolls/EndedPolls';
import BookmarkedPolls from '../BookmarkedPolls/BookmarkedPolls';
import SearchResults from '../SearchResults/SearchResults';
import NewPollButton from '../../components/NewPollButton/NewPollButton';
import { useWindowDimensions } from '../../utility/hooks';

import * as classes from './Main.module.css';

const CssTabs = withStyles({
	root: {
		'& .MuiTabs-scroller': {
			backgroundColor: '#fbfbf8',
			width: '100%'
		}
	}
})(Tabs);

const Main = (props) => {
	const [tabs, setTabs] = useState([
		'recommended',
		'trending',
		'followings',
		'your',
		'bookmarked',
		'responded',
		'ended'
	]);

	const [selectedTab, setSelectedTab] = useState('recommended');
	const [tabsOrientation, setTabsOrientation] = useState('vertical');

	const { width } = useWindowDimensions();

	useEffect(() => {
		if (width <= 600) {
			setTabsOrientation('horizontal');
		} else {
			setTabsOrientation('vertical');
		}
	}, [width]);

	const handleTabChange = (event, tabIndex) => {
		setSelectedTab(tabs[tabIndex]);
	};

	const { isSearchProgress, isSearchSuccess } = props;

	useEffect(() => {
		if (isSearchProgress && !tabs.includes('searched')) {
			setTabs(['searched', ...tabs]);
		}
		if (isSearchSuccess && !tabs.includes('searched')) {
			setTabs(['searched', ...tabs]);
		}
		if (isSearchProgress || isSearchSuccess) {
			setSelectedTab('searched');
		}
		// eslint-disable-next-line
	}, [isSearchProgress, isSearchSuccess]);

	let tabContent = null;
	switch (selectedTab) {
		case 'recommended':
			tabContent = <RecommendedPolls />;
			break;
		case 'trending':
			tabContent = <TrendingPolls />;
			break;
		case 'followings':
			tabContent = <FollowingsPolls />;
			break;
		case 'your':
			tabContent = <YourPolls />;
			break;
		case 'bookmarked':
			tabContent = <BookmarkedPolls />;
			break;
		case 'responded':
			tabContent = <RespondedPolls />;
			break;
		case 'ended':
			tabContent = <EndedPolls />;
			break;
		case 'searched':
			tabContent = <SearchResults />;
			break;
		default:
			break;
	}

	const getSelectedTabIndex = () => {
		return tabs.findIndex((tab) => tab === selectedTab);
	};

	return (
		<div className={classes.MainContent}>
			<CssTabs
				orientation={tabsOrientation}
				variant="scrollable"
				value={getSelectedTabIndex()}
				onChange={handleTabChange}
				className={classes.MainTabs}
			>
				{props.isSearchSuccess ? <Tab label="Search Results" /> : null}
				<Tab label="Recommended Polls" />
				<Tab label="Trending Polls" />
				<Tab label="Polls by your followings" />
				<Tab label="Your Polls" />
				<Tab label="Bookmarked Polls" />
				<Tab label="Responded Polls" />
				<Tab label="Ended Polls" />
			</CssTabs>
			<div className={classes.TabContent}>
				<div className={classes.Polls}>{tabContent}</div>
				{width > 600 ? <RecommendedUsers /> : null}
			</div>
			<NewPollButton />
		</div>
	);
};

const mapStateToProps = (state) => ({
	searchedPolls: state.search.searchedPolls,
	searchedUsers: state.search.searchedPolls,
	isSearchProgress: state.search.isSearchProgress,
	isSearchSuccess: state.search.isSearchSuccess
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
