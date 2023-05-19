import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import axios from 'axios';

const pinRegExp = /^\d{5}$/;
// const emailRule = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
// const nameRule = /^[A-Za-z\s]{0,30}$/;
// const nameRule = 'John Smith';
const mobileNumberRule = /^\d{9}$/;

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

const validationSchema = Yup.object({
	// name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').matches(nameRule).required('Name is required'),
	// email: Yup.string().matches(emailRule, 'Verify Email Format').required('Email is required'),
	phoneNumber: Yup.string().matches(mobileNumberRule, 'Wrong format. 9 digits only, no country code!').required('Phone number is required'),
});

const verificationSchema = Yup.object({
	verificationCode: Yup.string().matches(pinRegExp, 'Verification Code must be 5 digits').required('Verification code is required'),
});

// START OF VERIFY FUNCTION
const VerifyAxios = () => {
	const [verificationCode, setVerificationCode] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState(null);
	const [sentCode, setSentCode] = useState(null);

	// PHONE NUMBER VERIFICATION
	const handlePhoneNumberSubmit = async (values, { setSubmitting, resetForm }) => {
		try {
			const data = {
				imsi: '000702735808142',
				countryCode: '34',
				phoneNumber: values.phoneNumber,
			};
			// ANTON BACKEND SERVER
			const response = await axios.post('http://api-m-dev.riptec.host:8082/anton.o/api1/1.2.0/requestSimCode', data);

			setSubmitting(false);

			// Log the entire response object
			console.log('Response:', response);

			if (response.data && response.data.verifCode) {
				setVerificationCode(response.data.verifCode);
				// console.log(`Response Data verifCode: ${response.data.verifCode}`);
				setSubmitError(null);
				setSentCode(response.data.verifCode);
				// console.log(setSentCode(response.data.verifCode));
				initialValues.phoneNumber = values.phoneNumber;
			} else {
				console.log('verifCode is undefined');
			}
			// Hide phoneNumberForm
			document.getElementById('phoneNumberForm').classList.add('hidden');

			// Show verificationCodeForm
			document.getElementById('verificationCodeForm').classList.remove('hidden');
			document.getElementById('verificationCodeForm').classList.add('block');
		} catch (error) {
			if (error.response) {
				// Response not in the 200 range
				setSubmitting(false);
				setVerificationCode('');
				setSubmitError(error.message);
				setSentCode(null);
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			} else {
				// No Response at all or 404 or something else occured
				console.log(`Error: ${error.message}`);
			}
		}
		// Reset Client Input form
		resetForm({ values: '' });
	};

	// HANDLE CUSTOMER INFORMATION COLLECTION AND PASSING IT TO THE SERVER

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
				navigate('/signup/subscribe');
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
			<h1 className='text-buttonColor text-2xl lg:text-3xl pb-4'>Create your VIP Experience</h1>
			<h3 className='text-buttonColor text-xl lg:text-xl pb-4'>Lets start with verifying your phone number</h3>
			{submitError && <div className='error-message'>{submitError}</div>}

			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlePhoneNumberSubmit}>
				{({ isSubmitting }) => (
					<Form id='phoneNumberForm' className='block flex flex-col max-w-full gap-4 '>
						<div className='flex flex-col gap-6'>
							{/* NAME  */}
							{/* <div className='flex flex-col'>
								<label className='text-buttonColor' htmlFor='name'>
									Full Name:
								</label>
								<Field className='bg-purple-200 h-10 w-60 min-w-full rounded-md p-2' id='fullName' name='name' type='text' />
								<ErrorMessage name='name' />
							</div> */}
							{/* EMAIL  */}
							{/* <div className='flex flex-col'>
								<label className='text-buttonColor' htmlFor='email'>
									Email:
								</label>
								<Field className='bg-purple-200 h-10 w-60 min-w-full rounded-md p-2' id='email' name='email' type='email' />
								<ErrorMessage name='email' />
							</div> */}
							{/* MOBILE NUMBER  */}
							<div className='flex flex-col'>
								<label className='text-buttonColor' htmlFor='phoneNumber'>
									Enter Your Current Mobile Number:
								</label>
								<Field className='bg-purple-200 h-10 w-60 min-w-full rounded-md p-2' id='phoneNumber' name='phoneNumber' type='tel' />
								<ErrorMessage name='phoneNumber' />
							</div>
						</div>
						<button className='bg-purple-500 hover:bg-purple-400 text-white font-semibold h-10 rounded-md mt-4' type='submit' disabled={isSubmitting}>
							{isSubmitting ? 'Submitting...' : 'Verify your Mobile Number'}
						</button>
						<div>
							<h4 className='text-base text-buttonColor'>You will receive an SMS with a verification code to validate next...</h4>
						</div>
					</Form>
				)}
			</Formik>

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
