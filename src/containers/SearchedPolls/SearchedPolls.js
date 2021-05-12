import React from 'react';
import { connect } from 'react-redux';
import Polls from '../Polls/Polls';

const SearchedPolls = (props) => {
	return <Polls polls={props.searchedPolls} />;
};

const mapStateToProps = (state) => ({
	searchedPolls: state.search.searchedPolls
});

export default connect(mapStateToProps, null)(SearchedPolls);
