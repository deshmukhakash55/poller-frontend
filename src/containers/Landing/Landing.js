import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { clearRegisterSuccess } from '../../store/actions/auth.actions';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import LandingDetail from '../../components/LandingDetail/LandingDetail';

import * as classes from './Landing.module.css';

const Landing = (props) => {
	const [selectedTabIndex, setSelectedTabIndex] = React.useState(0);

	const handleSelectedTabChange = (event, tabIndex) => {
		setSelectedTabIndex(tabIndex);
	};

	const handleJoinNowActionClick = () => {
		setSelectedTabIndex(1);
	};

	const switchToLoginTab = () => {
		setSelectedTabIndex(0);
	};

	const { isUserLoggedIn, history } = props;

	useEffect(() => {
		if (isUserLoggedIn) {
			history.push('/d/main');
		}
	}, [isUserLoggedIn, history]);

	const tabs = [
		{
			tabIndex: 0,
			tabLabel: 'Login',
			tabComponent: (
				<Login
					onJoinNowActionClick={() => handleJoinNowActionClick()}
				/>
			)
		},
		{
			tabIndex: 1,
			tabLabel: 'Register',
			tabComponent: (
				<Register switchToLoginTab={() => switchToLoginTab()} />
			)
		}
	];

	if (props.isCheckLoginStatusProgress) {
		return (
			<div className={classes.LoginStatusCheckLanding}>
				<CircularProgress />
			</div>
		);
	}

	const getSelectedTabDetails = (tabIndex) =>
		tabs.find((tab) => tab.tabIndex === tabIndex);

	const tabsContent = tabs.map((tab) => (
		<Tab key={tab.tabIndex} label={tab.tabLabel} />
	));
	const selectedTab = getSelectedTabDetails(selectedTabIndex);

	return (
		<div className={classes.Landing}>
			<LandingDetail />
			<Paper className={classes.LandingForm} elevation={3}>
				<div className={classes.LoginAndSignupCard}>
					<Tabs
						value={selectedTabIndex}
						onChange={handleSelectedTabChange}
						indicatorColor="primary"
						textColor="primary"
						variant="fullWidth"
					>
						{tabsContent}
					</Tabs>
					<div>{selectedTab.tabComponent}</div>
				</div>
			</Paper>
			<Dialog
				open={props.isRegisterSuccess}
				onClose={props.clearRegisterSuccess}
			>
				<DialogTitle>{'Registration Successful!'}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						You have been successfully registered. Email has been
						sent to your email addess. Please verify to login.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button
						onClick={props.clearRegisterSuccess}
						color="primary"
						autoFocus
					>
						Ok
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

const mapStateToProps = (state) => ({
	isRegisterSuccess: state.auth.isRegisterSuccess,
	isUserLoggedIn: !!state.auth.loggedInUserId,
	isCheckLoginStatusProgress: state.auth.isCheckLoginStatusProgress
});

const mapDispatchToProps = (dispatch) => ({
	clearRegisterSuccess: () => dispatch(clearRegisterSuccess())
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
