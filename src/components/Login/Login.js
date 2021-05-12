import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Validators from '../../utility/validators';
import {
	isFormValid,
	isFormControlInvalid,
	getHelperTextFor
} from '../../utility/forms';

import * as classes from './Login.module.css';
import {
	loginStart,
	sendResetPasswordLinkStart
} from '../../store/actions/auth.actions';
import { useForm } from '../../utility/hooks';

const Login = (props) => {
	const [
		shouldShowForgotPasswordDialog,
		setShouldShowForgotPasswordDialog
	] = useState(false);

	const [form, handleInputForControl, handleControlBlur] = useForm({
		email: {
			id: 'email',
			inputLabel: 'Email',
			value: '',
			validators: [Validators.required, Validators.email],
			errors: [],
			touched: false,
			type: 'email',
			blurred: false
		},
		password: {
			id: 'password',
			inputLabel: 'Password',
			value: '',
			validators: [Validators.required],
			errors: [],
			touched: false,
			type: 'password',
			blurred: false
		}
	});

	const [
		forgotPasswordForm,
		handleInputForForgotPasswordControl,
		handleForgotPasswordControlBlur
	] = useForm({
		email: {
			id: 'email',
			inputLabel: 'Email',
			value: '',
			validators: [Validators.required, Validators.email],
			errors: [],
			touched: false,
			type: 'email',
			blurred: false
		}
	});

	const { isLoginSuccess, history } = props;

	useEffect(() => {
		if (isLoginSuccess) {
			history.push('/d/main');
		}
	}, [isLoginSuccess, history]);

	const formControlsContent = Object.values(form).map((control) => (
		<div key={control.id} className={classes.FormControl}>
			<FormControl fullWidth variant="outlined">
				<TextField
					onChange={(event) => handleInputForControl(event, control)}
					label={control.inputLabel}
					variant="outlined"
					required
					onBlur={() => handleControlBlur(control)}
					disabled={props.isLoginProgress}
					type={control.type}
					helperText={getHelperTextFor(control)}
					error={isFormControlInvalid(control)}
				/>
			</FormControl>
		</div>
	));

	const forgotPasswordFormControlsContent = Object.values(
		forgotPasswordForm
	).map((control) => (
		<div key={control.id} className={classes.FormControl}>
			<FormControl fullWidth variant="outlined">
				<TextField
					onChange={(event) =>
						handleInputForForgotPasswordControl(event, control)
					}
					onBlur={() => handleForgotPasswordControlBlur(control)}
					label={control.inputLabel}
					variant="outlined"
					required
					disabled={props.isSendResetPasswordLinkProgress}
					type={control.type}
					helperText={getHelperTextFor(control)}
					error={isFormControlInvalid(control)}
				/>
			</FormControl>
		</div>
	));

	const formErrorContent = props.isLoginFailure ? (
		<div className={classes.FormError}>{props.loginError}</div>
	) : null;

	const handleFormSubmit = (event) => {
		event.preventDefault();
		props.loginStart(form.email.value, form.password.value);
	};

	const handleForgotPasswordFormSubmit = (event) => {
		event.preventDefault();
		props.sendResetPasswordLinkStart(forgotPasswordForm.email.value);
	};

	const closeForgotPasswordDialog = () => {
		setShouldShowForgotPasswordDialog(false);
	};

	const openForgotPasswordDialog = () => {
		setShouldShowForgotPasswordDialog(true);
	};

	const sendPasswordResetLinkSuccessContent = (
		<div className={classes.SendResetPasswordLinkSuccessMessage}>
			Password reset link is sent to your verified email.
		</div>
	);

	const sendPasswordResetLinkProgressContent = (
		<div className={classes.SendResetPasswordLinkProgressBlock}>
			<CircularProgress />
			<div className={classes.SendResetPasswordLinkProgressMessage}>
				Sending password reset link
			</div>
		</div>
	);

	return (
		<div className={classes.LoginForm}>
			{formErrorContent}
			{formControlsContent}
			<div className={classes.FormOptions}>
				<div
					className={classes.FormOption}
					onClick={openForgotPasswordDialog}
				>
					Forgot Password ?
				</div>
				OR
				<div
					className={classes.FormOption}
					onClick={props.onJoinNowActionClick}
				>
					Join now!
				</div>
			</div>
			<div className={classes.FormAction}>
				<Button
					onClick={handleFormSubmit}
					color="primary"
					variant="contained"
					disabled={!isFormValid(form) || props.isLoginProgress}
					disableElevation
				>
					{props.isLoginProgress ? (
						<CircularProgress size="30px" />
					) : (
						<span>Login</span>
					)}
				</Button>
			</div>
			<Dialog
				PaperProps={{ className: classes.DialogPaperBlock }}
				open={shouldShowForgotPasswordDialog}
				onClose={closeForgotPasswordDialog}
			>
				<DialogTitle className={classes.ForgotPasswordDialogTitle}>
					{'Forgot Password ?'}
				</DialogTitle>
				<DialogContent>
					{!props.isSendResetPasswordLinkSuccess
						? forgotPasswordFormControlsContent
						: props.isSendResetPasswordLinkProgress
						? sendPasswordResetLinkProgressContent
						: sendPasswordResetLinkSuccessContent}
				</DialogContent>
				<DialogActions>
					{!props.isSendResetPasswordLinkSuccess ? (
						<React.Fragment>
							<Button
								disabled={
									!isFormValid(forgotPasswordForm) ||
									props.isSendResetPasswordLinkProgress
								}
								onClick={handleForgotPasswordFormSubmit}
								color="primary"
							>
								{props.isSendResetPasswordLinkProgress ? (
									<CircularProgress size="30px" />
								) : (
									<span>Send password reset link</span>
								)}
							</Button>
							<Button
								disabled={props.isSendResetPasswordLinkProgress}
								onClick={closeForgotPasswordDialog}
								color="primary"
							>
								<span>Close</span>
							</Button>
						</React.Fragment>
					) : (
						<Button
							onClick={closeForgotPasswordDialog}
							color="primary"
						>
							<span>Ok</span>
						</Button>
					)}
				</DialogActions>
			</Dialog>
		</div>
	);
};

const mapStateToProps = (state) => ({
	isSendResetPasswordLinkSuccess: state.auth.isSendResetPasswordLinkSuccess,
	isSendResetPasswordLinkProgress: state.auth.isSendResetPasswordLinkProgress,
	isLoginSuccess: state.auth.isLoginSuccess,
	isLoginProgress: state.auth.isLoginProgress,
	isLoginFailure: state.auth.isLoginFailure,
	loginError: state.auth.loginError
});

const mapDispatchToProps = (dispatch) => ({
	loginStart: (email, password) => dispatch(loginStart(email, password)),
	sendResetPasswordLinkStart: (email) =>
		dispatch(sendResetPasswordLinkStart(email))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));
