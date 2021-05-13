class Validators {
	static required(control) {
		if (control.value == null || control.value === '') {
			return {
				message: `${control.inputLabel} is required. Please fill in value`
			};
		}
		return null;
	}

	static email(control) {
		const regex =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		const isEmail = regex.test(String(control.value).toLowerCase());
		if (!isEmail) {
			return { message: 'Invalid email' };
		}
		return null;
	}

	static password(control) {
		const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/gm;
		const isPassword = regex.test(String(control.value));
		if (!isPassword) {
			return {
				message:
					'Password should have atleast one uppercase, one lowercase, one numeric, one special character and should have more than 7 characters'
			};
		}
		return null;
	}
}

export default Validators;
