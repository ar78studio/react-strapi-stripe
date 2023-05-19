import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';

import * as Yup from 'yup';
import axios from 'axios';

const pinRegExp = /^\d{5}$/;
const emailRule = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const nameRule = /^[A-Za-z\s]{0,30}$/;
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
	name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').matches(nameRule).required('Name is required'),
	email: Yup.string().matches(emailRule, 'Verify Email Format').required('Email is required'),
	phoneNumber: Yup.string().matches(mobileNumberRule, 'Wrong format. 9 digits only, no country code!').required('Phone number is required'),
});

// START OF VERIFY FUNCTION
const VerifyPhone = () => {
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
			// PRODUCTION SERVER
			const response = await axios.post('http://api-m-dev.riptec.host:8082/anton.o/api1/1.2.0/requestSimCode', data);

			// DUMMY TEST SERVER
			// const response = await axios.post('http://api-m-test.riptec.host:8085/test.o/api1/1.2.0/requestTestTest', data);

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

	return (
		<div>
			<h1 className='text-buttonColor text-2xl lg:text-3xl pb-4'>Create your VIP Experience</h1>
			{submitError && <div className='error-message'>{submitError}</div>}

			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlePhoneNumberSubmit}>
				{({ isSubmitting }) => (
					<Form id='phoneNumberForm' className='block flex flex-col max-w-full gap-4 '>
						<div className='flex flex-col gap-6'>
							{/* NAME  */}
							<div className='flex flex-col'>
								<label className='text-buttonColor' htmlFor='name'>
									Name:
								</label>
								<Field className='bg-purple-200 h-10 w-60 min-w-full rounded-md p-2' id='name' name='name' type='text' />
								<ErrorMessage name='name' />
							</div>
							{/* EMAIL  */}
							<div className='flex flex-col'>
								<label className='text-buttonColor' htmlFor='email'>
									Email:
								</label>
								<Field className='bg-purple-200 h-10 w-60 min-w-full rounded-md p-2' id='email' name='email' type='email' />
								<ErrorMessage name='email' />
							</div>
							{/* MOBILE NUMBER  */}
							<div className='flex flex-col'>
								<label className='text-buttonColor' htmlFor='phoneNumber'>
									Your Mobile Number:
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
		</div>
	);
};

export default VerifyPhone;
