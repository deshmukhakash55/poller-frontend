import React from 'react';
import { connect } from 'react-redux';
import Users from '../Users/Users';

const SearchedUsers = (props) => {
	return (
		<Users
			onReloadUsers={props.reloadSearchResults}
			users={props.searchedUsers}
		/>
	);
};

const mapStateToProps = (state) => ({
	searchedUsers: state.search.searchedUsers
});

export default connect(mapStateToProps, null)(SearchedUsers);
