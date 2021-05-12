export const getNormalizedErrorsFor = (control) => {
	return control.errors.map((error) => error.message).join('. ');
};

export const isFormControlValueValid = (control) => control.errors.length === 0;

export const isFormControlInvalid = (control) =>
	control.blurred && control.touched && !isFormControlValueValid(control);

export const isFormControlUntouched = (control) => !control.touched;

export const isFormControlUnBlurred = (control) => !control.blurred;

export const getHelperTextFor = (control) => {
	if (
		isFormControlValueValid(control) ||
		isFormControlUntouched(control) ||
		isFormControlUnBlurred(control)
	) {
		return '';
	}
	return getNormalizedErrorsFor(control);
};

export const isFormValid = (form) => {
	const controls = Object.values(form);
	let formErrors = [];
	controls.forEach((control) => {
		const controlErrors = control.errors;
		formErrors = [...formErrors, ...controlErrors];
	});
	return formErrors.length === 0;
};

export const executeValidationFor = (control, form) => {
	const errors = control.validators
		.map((validator) => validator(control, form))
		.filter((error) => error != null && error !== '');
	const newControl = { ...control, errors };
	return newControl;
};
