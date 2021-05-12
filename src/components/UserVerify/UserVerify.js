import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { verifyEmailStart } from '../../store/actions/auth.actions';

import * as classes from './UserVerify.module.css';

const UserVerify = (props) => {
	const token = props.match.params.token;
	// eslint-disable-next-line
	useEffect(() => props.verifyEmailStart(token), []);

	return (
		<div className={classes.UserVerify}>
			<Paper className={classes.MessageBlock} elevation={3}>
				{props.isVerifyEmailProgress ? (
					<div className={classes.Progress}>
						<CircularProgress />
						<div>Verifying email...</div>
					</div>
				) : (
					<div className={classes.Message}>
						{props.isVerifyEmailFailure ? (
							<p className={classes.MessageText}>
								{props.verifyEmailError}
							</p>
						) : props.isVerifyEmailSuccess ? (
							<p className={classes.MessageText}>
								🎉 Email verification is successful. You can
								login now.
							</p>
						) : null}
					</div>
				)}
			</Paper>
		</div>
	);
};
const mapStateToProps = (state) => ({
	isVerifyEmailProgress: state.auth.isVerifyEmailProgress,
	isVerifyEmailSuccess: state.auth.isVerifyEmailSuccess,
	isVerifyEmailFailure: state.auth.isVerifyEmailFailure,
	verifyEmailError: state.auth.verifyEmailError
});

const mapDispatchToProps = (dispatch) => ({
	verifyEmailStart: (token) => dispatch(verifyEmailStart(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(UserVerify);
