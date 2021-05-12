import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import Validators from '../../utility/validators';
import {
	isFormValid,
	isFormControlInvalid,
	getHelperTextFor
} from '../../utility/forms';

import * as classes from './Register.module.css';
import { registerStart } from '../../store/actions/auth.actions';
import { CircularProgress } from '@material-ui/core';
import { useForm } from '../../utility/hooks';

const Register = (props) => {
	const validateConfirmedPassword = (control, form) => {
		const confirmedPasswordValue = control.value;
		if (confirmedPasswordValue !== form.password.value) {
			return {
				message: 'Confirmed password does not match with password'
			};
		}
		return null;
	};

	const [form, handleInputForControl, handleControlBlur] = useForm({
		name: {
			id: 'name',
			inputLabel: 'Name',
			value: '',
			validators: [Validators.required],
			errors: [],
			touched: false,
			type: 'text'
		},
		email: {
			id: 'email',
			inputLabel: 'Email',
			value: '',
			validators: [Validators.required, Validators.email],
			errors: [],
			touched: false,
			type: 'email'
		},
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
	const { isRegisterSuccess, switchToLoginTab } = props;

	useEffect(() => {
		if (isRegisterSuccess) {
			switchToLoginTab();
		}
	}, [isRegisterSuccess, switchToLoginTab]);

	const formControlsContent = Object.values(form).map((control) => (
		<div key={control.id} className={classes.FormControl}>
			<FormControl fullWidth variant="outlined">
				<TextField
					onChange={(event) => handleInputForControl(event, control)}
					label={control.inputLabel}
					variant="outlined"
					required
					onBlur={() => handleControlBlur(control)}
					type={control.type}
					helperText={getHelperTextFor(control)}
					error={isFormControlInvalid(control)}
				/>
			</FormControl>
		</div>
	));

	const formErrorContent = props.isRegisterFailure ? (
		<div className={classes.FormError}>{props.registerError}</div>
	) : null;

	const handleFormSubmit = (event) => {
		event.preventDefault();
		props.registerStart(
			form.name.value,
			form.email.value,
			form.password.value
		);
	};

	return (
		<div className={classes.RegisterForm}>
			{formErrorContent}
			{formControlsContent}
			<div className={classes.FormOptions}>
				<div
					className={classes.AlreadyAMember}
					onClick={switchToLoginTab}
				>
					Already a member ?
				</div>
			</div>
			<div className={classes.FormAction}>
				<Button
					disabled={!isFormValid(form) || props.isRegisterProgress}
					onClick={handleFormSubmit}
					color="primary"
					variant="contained"
					disableElevation
				>
					{props.isRegisterProgress ? (
						<CircularProgress size="30px" />
					) : (
						<span>Register</span>
					)}
				</Button>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	isRegisterProgress: state.auth.isRegisterProgress,
	isRegisterSuccess: state.auth.isRegisterSuccess,
	isRegisterFailure: state.auth.isRegisterFailure,
	registerError: state.auth.registerError
});

const mapDispatchToProps = (dispatch) => ({
	registerStart: (name, email, password) =>
		dispatch(registerStart(name, email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
