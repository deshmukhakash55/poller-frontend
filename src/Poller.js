import Landing from './containers/Landing/Landing';
import { connect } from 'react-redux';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';

import * as classes from './Poller.module.css';
import UserVerify from './components/UserVerify/UserVerify';
import Dashboard from './containers/Dashboard/Dashboard';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';

const theme = createMuiTheme({
	palette: {
		primary: { main: '#264c77' },
		secondary: { main: '#c20808' }
	}
});

function Poller(props) {
	const protectedRoutes = [<Route key="d" path="/d" component={Dashboard} />];
	return (
		<ThemeProvider theme={theme}>
			<Snackbar
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
				open={props.shouldShowNetworkError}
				ContentProps={{
					className: classes.NetworkErrorBlock
				}}
				key="topcenter"
				message="Looks like you're offline"
			></Snackbar>
			<div className={classes.Poller}>
				<BrowserRouter>
					<Switch>
						<Route
							exact
							path="/verify/:token"
							component={UserVerify}
						/>
						<Route
							exact
							path="/resetPassword/:passwordResetToken/:userId"
							component={ForgotPassword}
						/>
						{props.isUserLoggedIn ? (
							protectedRoutes
						) : (
							<Route path="/" exact component={Landing} />
						)}
						<Route path="/*" exact component={Landing} />
					</Switch>
				</BrowserRouter>
			</div>
		</ThemeProvider>
	);
}

const mapStateToProps = (state) => ({
	isUserLoggedIn: !!state.auth.loggedInUserId,
	isCheckLoginStatusProgress: state.auth.isCheckLoginStatusProgress,
	shouldShowNetworkError: state.network.shouldShowNetworkError
});

export default connect(mapStateToProps)(Poller);
