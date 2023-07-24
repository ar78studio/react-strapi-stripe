import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import axios from 'axios';

import { useCookies } from 'react-cookie';
// from hooks folder to capture UTMs and FPRs
import { useUrlParams } from '../../hooks/useUrlParams';
// Country Options are difined in CountryOptions.js
import { countryOptions } from './CountryOptions';
import Select from 'react-select';

// Multilanguage support
import { useTranslation, Trans } from 'react-i18next';

// SETTING RULES FOR YUP FORM VALIDATION
const pinRegExp = /^\d{5}$/;
const emailRule = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const nameRule = /^[A-Za-z\s]{0,25}$/;
const mobileNumberRule = /^\d+$/;

// Initialise Formik form with empty fields=values
const initialValues = {
	firstName: '',
	lastName: '',
	clientEmail: '',
	phoneNumber: '',
	verificationCode: '',
};

// const resetForm = () => {
// 	resetForm({ values: '' });
// };
const resetForm = (resetForm) => {
	resetForm();
};

const validationSchema = Yup.object({
	firstName: Yup.string().max(40, 'Too Long!').matches(nameRule).required('First Name is required'),
	lastName: Yup.string().max(40, 'Too Long!').matches(nameRule).required('Last Name is required'),
	clientEmail: Yup.string().matches(emailRule, 'Verify Email Format').required('Email is required'),
	phoneNumber: Yup.string().max(20, 'Too Long!').matches(mobileNumberRule, 'Use Numbers').required('Phone is required'),
});

const verificationSchema = Yup.object({
	verificationCode: Yup.string().matches(pinRegExp, 'Verification Code must be 5 digits').required('Verification code is required'),
});

// Custom Styles for the Country Dropdown box (npm react-select)
const customStyles = {
	control: (base, state) => ({
		...base,
		backgroundColor: '#E9D5FF',
		border: 'none',
		width: '270px', // Add your desired background color here
		// You can also add other custom styles here
	}),
};

// ================================
// ================================
// START OF VerifyAxios FUNCTION
// ================================
// ================================
const VerifyAxios = () => {
	const { t, i18n } = useTranslation();

	// capture UTMs and FPRs
	const { searchParams } = useUrlParams();
	// linkParams is difined in useUrlParams.js in the hooks folder
	const [cookies] = useCookies(['linkParams']);

	// Parse linkParams from cookies (if exists)
	// const linkParams = cookies.linkParams ? JSON.parse(cookies.linkParams) : {};
	const linkParams = cookies.linkParams ? cookies.linkParams : {};

	// console.log(linkParams);

	const [verificationCode, setVerificationCode] = useState('');
	const [submitError, setSubmitError] = useState(null);
	const [sentCode, setSentCode] = useState(null);

	// CREATE STATE FOR USER DATA
	const [formValues, setFormValues] = useState({});

	// State for passing props into PaymentForm.jsx
	const [clientData, setClientData] = useState({
		firstName: '',
		lastName: '',
		clientEmail: '',
		countryCode: '',
		phoneNumber: '',
		// get couponCode from the cookie, in case of users coming from a discounted links
		// couponCode: '',
	});

	// Create a new state variable to store the selected country code.
	// const [selectedCountry, setSelectedCountry] = useState(countryOptions[0]);
	const [selectedCountry, setSelectedCountry] = useState(null);
	// Add a new state variable for country code
	// const [countryOption, setCountryOptions] = useState('34');

	// AUTHORIZATION FOR RIPTEC SERVER
	const bauth = {
		auth: {
			// username: 'mobile_api_client',
			username: `${import.meta.env.VITE_RIPTEC_API_USERNAME}`,
			// password: 'aeb70f59-fa5e-4efc-b1d5-487368ad0607',
			password: `${import.meta.env.VITE_RIPTEC_API_PASSWORD}`,
		},
	};

	// GET URL PARAMS AND UTMS
	const createLead = async (values) => {
		const dataCreateLead = {
			cusFirstName: values.firstName,
			cusLastName: values.lastName,
			cusEmail: values.clientEmail,
			cusSimNumber: values.phoneNumber,
			// cusCountryISO3: 'ESP',
			// cusCountryISO3: values.countryCode,
			cusCountryISO3: selectedCountry.code,
			getParams: searchParams.toString(),
			// Add this line to include all form values
			postParams: JSON.stringify(values),
			cookies: cookies,
			...linkParams,
		};
		// console.log(linkParams);
		// console.log('This is postParams value:', dataCreateLead.postParams);

		try {
			// const responseLead = await axios.post('http://api-m-dev.riptec.host:8082/anton.o/api1/1.2.0/createLead', dataCreateLead);
			const responseLead = await axios.post(`${import.meta.env.VITE_RIPTEC_API_URL}/anton.o/api1/1.2.0/createLead`, dataCreateLead, bauth);

			console.log('Create Lead response:', responseLead.data);
		} catch (error) {
			console.log('Create Lead error:', error.message);
		}
	};

	// PHONE NUMBER VERIFICATION
	const handlePhoneNumberSubmit = async (values, { setSubmitting }) => {
		// setClientData sets the data for transfer into PaymentForm.jsx into const initialValues
		setClientData({
			firstName: values.firstName,
			lastName: values.lastName,
			clientEmail: values.clientEmail,
			countryCode: selectedCountry.code,
			phoneNumber: values.phoneNumber,
		});

		try {
			// REQUEST PIN NUMBER
			const dataRequestPin = {
				imsi: '000702735808142',
				phoneNumber: values.phoneNumber,
				countryCode: selectedCountry.code,
			};

			// console.log('This is dataRequestPin:', dataRequestPin.countryCode);

			// RECEIVE CREATE LEAD
			// CREATE LEAD - ADD USER TO THE CONXHUB PORTAL
			await createLead(values);

			// const responseCode = await axios.post('https://api-m-dev.riptec.host:8443/anton.o/api1/1.2.0/requestSimCode', dataRequestPin, bauth);

			// SIM CODE VERIFICATION ENDPOINT
			const responseCode = await axios.post(`${import.meta.env.VITE_RIPTEC_API_URL}/anton.o/api1/1.2.0/requestSimCode`, dataRequestPin, bauth);

			setSubmitting(false);

			if (responseCode.dataRequestPin && responseLead.dataCreateLead && responseCode.dataRequestPin.verifCode) {
				setVerificationCode(responseCode.dataRequestPin.verifCode);
				// console.log(`Response Data verifCode: ${responseCode.dataRequestPin.verifCode}`);
				setSubmitError(null);
				setSentCode(responseCode.dataRequestPin.verifCode);
				// console.log(setSentCode(responseCode.dataRequestPin.verifCode));
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
			if (error.responseCode) {
				// Response not in the 200 range
				setSubmitting(false);
				setVerificationCode('');
				setSubmitError(error.message);
				setSentCode(null);
				// console.log(error.responseCode.dataRequestPin);
				// console.log(error.responseCode.dataCreateUser);
				// console.log(error.responseCode.status);
				// console.log(error.responseCode.headers);
			} else {
				// No Response at all or 404 or something else occured
				console.log(`Error: ${error.message}`);
			}
		}
		setFormValues(values);
	};

	// REDIRECT TO APPROPRIATE
	const navigate = useNavigate();

	const handleVerificationCodeSubmit = async (values, { setSubmitting, resetForm }) => {
		try {
			const data = {
				verifCode: values.verificationCode,
			};

			const clientData = {
				...formValues,
			};
			// console.log(`These are Values from CodeSubmit function: ${JSON.stringify(clientData)}`);

			const response = await axios.post(`${import.meta.env.VITE_RIPTEC_API_URL}/anton.o/api1/1.2.0/verifySimCode`, data, bauth);

			// console.log('This is the PIN number: ', value.verificationCode);
			// console.log('Server response is:', response.status);
			// The purpose of setSubmitting is to manage the submit button state while the form is being submitted. By setting the state to false, the submit button is re-enabled after the submission is complete.
			setSubmitting(false);
			// setSubmitError is used to manage any submission errors that may occur while the form is being submitted. By setting the state to null, any previously set error state is cleared, and the component is reset to its initial state.
			setSubmitError(null);

			if (response.status === 200) {
				alert('Success, your number is verified');
				console.log('The status is 200');
				setSubmitError(null);
				setVerificationCode('');
				resetForm();
				// REDIRECT TO STRIPE CHECKOUT IF VERIFICATION CODE IS ACCEPTED and carry clientData (firstName, lastName, clientEmail)

				navigate('/signup/subscribe/payment', { state: { clientData } });
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
			<h1 className='text-buttonColor text-2xl lg:text-3xl pb-4'>
				{/* Create your VIP Experience */}
				<Trans i18nKey='signupTitle'></Trans>
			</h1>
			<h3 className='text-buttonColor text-xl lg:text-xl pb-4'>
				{/* Lets start with verifying your mobile phone */}
				<Trans i18nKey='signupMobileText'></Trans>
			</h3>
			{submitError && <div className='error-message'>{submitError}</div>}

			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlePhoneNumberSubmit}>
				{(formikProps) => {
					const { isSubmitting, setFieldValue } = formikProps;
					return (
						<Form id='phoneNumberForm' className='block flex flex-col max-w-full gap-2 '>
							<div className='flex flex-col gap-6'>
								{/* FIRST NAME  */}
								<div className='flex flex-col'>
									<label className='text-buttonColor' htmlFor='firstName'>
										{/* First Name: */}
										<Trans i18nKey='signupFields.first'></Trans>
									</label>
									<Field autoComplete='off' className='bg-purple-200 h-10 w-60 min-w-full rounded-md pl-2' id='firstName' name='firstName' type='text' />
									<ErrorMessage name='firstName' />
								</div>
								{/* LAST NAME  */}
								<div className='flex flex-col'>
									<label className='text-buttonColor' htmlFor='lastName'>
										{/* Last Name: */}
										<Trans i18nKey='signupFields.last'></Trans>
									</label>
									<Field autoComplete='off' className='bg-purple-200 h-10 w-60 min-w-full rounded-md pl-2' id='lastName' name='lastName' type='text' />
									<ErrorMessage name='lastName' />
								</div>
								{/* EMAIL  */}
								<div className='flex flex-col'>
									<label className='text-buttonColor' htmlFor='clientEmail'>
										{/* Email: */}
										<Trans i18nKey='signupFields.email'></Trans>
									</label>
									<Field autoComplete='off' className='bg-purple-200 h-10 w-60 min-w-full rounded-md pl-2' id='clientEmail' name='clientEmail' type='clientEmail' />
									<ErrorMessage name='clientEmail' />
								</div>

								{/* DROP DOWN WITH COUNTRY CODES  */}
								<div id='selectCountryPhone'>
									<label className='text-buttonColor' htmlFor='countryCode'>
										{/* Country: */}
										<Trans i18nKey='signupFields.country'></Trans>
									</label>

									<div className='flex w-full items-center'>
										{/* DROP DOWN LIST  */}
										<div className='flex rounded-md'>
											<Select
												className='basic-single'
												// classNamePrefix='select'
												styles={customStyles}
												defaultValue={countryOptions[0]}
												isSearchable={true}
												name='countryCode'
												options={countryOptions}
												// value={selectedCountry}
												value={selectedCountry}
												onChange={(option) => {
													setSelectedCountry(option);
													setFieldValue('countryCode', option.code);
												}}
											/>
										</div>
									</div>

									{/* PHONE NUMBER INPUT FIELD  */}
									<div className='flex flex-col w-full pt-4'>
										<label className='text-buttonColor' htmlFor='phoneNumber'>
											{/* Your Number: */}
											<Trans i18nKey='signupFields.number'></Trans>
										</label>
										<Field autoComplete='off' className='bg-purple-200 h-10 w-full rounded-md pl-2' id='phoneNumber' name='phoneNumber' type='tel' />
										<ErrorMessage name='phoneNumber' />
									</div>
								</div>

								{Object.keys(linkParams).map((key) => (
									<Field key={key} type='hidden' name={key} value={linkParams[key]} />
								))}
							</div>
							<button id='verifyButton' className='bg-purple-500 hover:bg-purple-400 text-white font-semibold h-10 rounded-md mt-10' type='submit' disabled={isSubmitting}>
								{isSubmitting ? 'Submitting...' : <Trans i18nKey='signupButton'></Trans>}
							</button>
							<div>
								<h4 className='text-base text-buttonColor'>
									{/* You will receive an SMS with a verification code to validate next... */}
									<Trans i18nKey='signupSMS'></Trans>
								</h4>
							</div>
						</Form>
					);
				}}
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
								{/* Verification Code: */}
								<Trans i18nKey='verifCode'></Trans>
							</label>
							<Field autoComplete='off' className='bg-purple-200 h-10 w-60 min-w-full rounded-md p-2' id='verificationCode' name='verificationCode' type='text' />
							<ErrorMessage name='verificationCode' />

							<button className='bg-purple-500 hover:bg-purple-400 h-10 rounded-md mt-2 text-white font-semibold' type='submit' disabled={isSubmitting}>
								{isSubmitting ? 'Submitting...' : <Trans i18nKey='verifButton'></Trans>}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default VerifyAxios;
