import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import axios from 'axios';

const pinRegExp = /^\d{5}$/;

const initialValues = {
	name: '',
	email: '',
	phoneNumber: '',
	verificationCode: '',
};

const resetForm = () => {
	console.log(values);
	resetForm({ values: '' });
};

const verificationSchema = Yup.object({
	verificationCode: Yup.string().matches(pinRegExp, 'Verification Code must be 5 digits').required('Verification code is required'),
});

// START OF VERIFY FUNCTION
const VerifyAxios = () => {
	const [verificationCode, setVerificationCode] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState(null);
	const [sentCode, setSentCode] = useState(null);

	// VERIFICATION CODE SUBMITION
	const navigate = useNavigate();

	const handleVerificationCodeSubmit = async (values, { setSubmitting, resetForm }) => {
		try {
			const data = {
				verifCode: values.verificationCode,
			};
			const response = await axios.post('http://api-m-dev.riptec.host:8082/anton.o/api1/1.2.0/verifySimCode', data);

			// console.log('This is the PIN number: ', value.verificationCode);
			console.log('Server response is:', response.status);
			// The purpose of setSubmitting is to manage the submit button state while the form is being submitted. By setting the state to false, the submit button is re-enabled after the submission is complete.
			setSubmitting(false);
			// setSubmitError is used to manage any submission errors that may occur while the form is being submitted. By setting the state to null, any previously set error state is cleared, and the component is reset to its initial state.
			setSubmitError(null);
			// && sentCode == values.verificationCode
			if (response.status === 200) {
				alert('Success, your number is verified');
				console.log('The status is 200');
				setSubmitError(null);
				setVerificationCode('');
				resetForm();
				// REDIRECT TO STRIPE CHECKOUT
				navigate('/checkout/Payment');
			} else {
				alert('Invalid Verification Code');
				console.log('There was an error');
				setSubmitError('Verification Failed');
				setVerificationCode('');
				resetForm();
			}
		} catch (error) {
			setSubmitting(false);
			setSubmitError(error.message);
			alert('Wrong phone number or verification code');
		}
		// Reset Client Input form
		resetForm({ values: '' });
	};

	return (
		<div>
			{submitError && <div className='error-message'>{submitError}</div>}

			<Formik
				initialValues={initialValues}
				validationSchema={verificationSchema}
				onSubmit={handleVerificationCodeSubmit} // Add this line
			>
				{({ isSubmitting }) => (
					<Form id='verificationCodeForm' className=' hidden flex justify-center items-center flex-col max-w-full gap-2 mt-10 '>
						<div className='flex flex-col gap-4'>
							<label className='text-buttonColor text-2xl text-center' htmlFor='verificationCode'>
								Verification Code:
							</label>
							<Field className='bg-purple-200 h-10 w-60 min-w-full rounded-md p-2' id='verificationCode' name='verificationCode' type='text' />
							<ErrorMessage name='verificationCode' />

							<button className='bg-purple-500 hover:bg-purple-400 h-10 rounded-md mt-2 text-white font-semibold' type='submit' disabled={isSubmitting}>
								{isSubmitting ? 'Submitting...' : 'Submit'}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default VerifyAxios;
