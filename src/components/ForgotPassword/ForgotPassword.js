import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Validators from '../../utility/validators';
import {
	executeValidationFor as _executeValidationFor,
	isFormValid,
	isFormControlInvalid,
	getHelperTextFor
} from '../../utility/forms';
import { resetPasswordStart } from '../../store/actions/auth.actions';

import * as classes from './ForgotPassword.module.css';

const ForgotPassword = (props) => {
	const validateConfirmedPassword = (control, form) => {
		const confirmedPasswordValue = control.value;
		if (confirmedPasswordValue !== form.password.value) {
			return {
				message: 'Confirmed password does not match with password'
			};
		}
		return null;
	};

	const [form, setForm] = useState({
		password: {
			id: 'password',
			inputLabel: 'Password',
			value: '',
			validators: [Validators.required, Validators.password],
			errors: [],
			touched: false,
			type: 'password'
		},
		confirmPassword: {
			id: 'confirmPassword',
			inputLabel: 'Confirm Password',
			value: '',
			errors: [],
			validators: [Validators.required, validateConfirmedPassword],
			touched: false,
			type: 'password'
		}
	});

	useEffect(() => {
		const controlKeys = Object.keys(form);
		controlKeys.forEach((controlKey) => {
			const controlErrors = executeValidationFor(form[controlKey]);
			const control = { ...form[controlKey] };
			control.errors = [...controlErrors];
			setForm({ ...form, [controlKey]: control });
		});
		// eslint-disable-next-line
	}, []);

	const executeValidationFor = (control) => {
		const validatedControl = _executeValidationFor(control, form);
		setForm({ ...form, [control.id]: validatedControl });
		return validatedControl.errors;
	};

	const handleInputForControl = (event, control) => {
		const value = event.target.value;
		control.value = value;
		control.touched = true;
		executeValidationFor(control);
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();
		const { passwordResetToken, userId } = props.match.params;
		props.resetPasswordStart(
			userId,
			form.password.value,
			passwordResetToken
		);
	};
	const formControlsContent = Object.values(form).map((control) => (
		<div key={control.id} className={classes.FormControl}>
			<FormControl fullWidth variant="outlined">
				<TextField
					onChange={(event) => handleInputForControl(event, control)}
					label={control.inputLabel}
					variant="outlined"
					required
					type={control.type}
					helperText={getHelperTextFor(control)}
					error={isFormControlInvalid(control)}
				/>
			</FormControl>
		</div>
	));

	const resetPasswordFormContent = (
		<React.Fragment>
			<div className={classes.ResetPasswordTitle}>Reset Password</div>
			<div className={classes.ResetPasswordForm}>
				{formControlsContent}
				<div className={classes.FormAction}>
					<Button
						disabled={
							!isFormValid(form) || props.isRegisterProgress
						}
						onClick={handleFormSubmit}
						color="primary"
						variant="contained"
						disableElevation
					>
						{props.isRegisterProgress ? (
							<CircularProgress size="30px" />
						) : (
							<span>Reset</span>
						)}
					</Button>
				</div>
			</div>
		</React.Fragment>
	);

	const resetPasswordProgressContent = (
		<div className={classes.ResetPasswordProgressBlock}>
			<CircularProgress />
			<div>Reseting your password...</div>
		</div>
	);

	const resetPasswordSuccessContent = (
		<div className={classes.ResetPasswordSuccessBlock}>
			<div>
				🎉 Your password has been reset successfully. Try logging in
				now.
			</div>
		</div>
	);

	let forgotPasswordContent = resetPasswordFormContent;
	if (props.isResetPasswordProgress) {
		forgotPasswordContent = resetPasswordProgressContent;
	}
	if (props.isResetPasswordSuccess) {
		forgotPasswordContent = resetPasswordSuccessContent;
	}

	return (
		<div className={classes.ForgotPasswordBlock}>
			<Paper className={classes.ForgotPasswordPaper} elevation={3}>
				{forgotPasswordContent}
			</Paper>
		</div>
	);
};

const mapStateToProps = (state) => ({
	isResetPasswordProgress: state.auth.isResetPasswordProgress,
	isResetPasswordSuccess: state.auth.isResetPasswordSuccess
});

const mapDispatchToProps = (dispatch) => ({
	resetPasswordStart: (userId, password, passwordResetToken) =>
		dispatch(resetPasswordStart(userId, password, passwordResetToken))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(ForgotPassword));
