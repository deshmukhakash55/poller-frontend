import React from 'react';
import { withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';
import Tooltip from '@material-ui/core/Tooltip';

import * as classes from './NewPollButton.module.css';

const NewPollButton = (props) => {
	const handleNewPollButtonClick = () => {
		props.history.push('/d/new');
	};

	return (
		<Tooltip title="Start new poll" placement="top" arrow={true}>
			<IconButton
				size="medium"
				variant="contained"
				className={classes.NewPollButton}
				onClick={handleNewPollButtonClick}
			>
				<CreateIcon />
			</IconButton>
		</Tooltip>
	);
};

export default withRouter(NewPollButton);
