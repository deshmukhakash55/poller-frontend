import { useState, useEffect } from 'react';
import { executeValidationFor as _executeValidationFor } from './forms';

export const useForm = (formControlMap) => {
	const [form, setForm] = useState(formControlMap);

	const executeValidationFor = (control) => {
		const validatedControl = _executeValidationFor(control, form);
		setForm({ ...form, [control.id]: validatedControl });
		return validatedControl.errors;
	};

	useEffect(() => {
		const controlKeys = Object.keys(form);
		const validatedForm = {};
		controlKeys.forEach((controlKey) => {
			const controlErrors = executeValidationFor(form[controlKey]);
			const control = { ...form[controlKey] };
			control.errors = [...controlErrors];
			validatedForm[controlKey] = control;
		});
		setForm({ ...validatedForm });
		// eslint-disable-next-line
	}, []);

	const handleInputForControl = (event, control) => {
		const value = event.target.value;
		control.value = value;
		control.touched = true;
		executeValidationFor(control);
	};

	const handleControlBlur = (control) => {
		control.blurred = true;
		executeValidationFor(control);
	};

	return [form, handleInputForControl, handleControlBlur];
};

export const useWindowDimensions = () => {
	const [windowDimensions, setWindowDimensions] = useState(
		getWindowDimensions()
	);

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return windowDimensions;
};

const getWindowDimensions = () => {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height
	};
};
