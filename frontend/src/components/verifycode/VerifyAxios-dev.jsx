import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';

import * as Yup from 'yup';
import axios from 'axios';

import { useCookies } from 'react-cookie';
// from hooks folder to capture UTMs and FPRs
import { useUrlParams } from '../../hooks/useUrlParams';
// import CountryOptions from './CountryOptions';
import Select from 'react-select';

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

const resetForm = () => {
	console.log(values);
	resetForm({ values: '' });
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
		width: '300px', // Add your desired background color here
		// You can also add other custom styles here
	}),
};

// ================================
// ================================
// START OF VerifyAxios FUNCTION
// ================================
// ================================
const VerifyAxios = () => {
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
	});

	// Define country codes
	const countryOptions = [
		// { label: 'Search for Your Country:' },
		{ value: 'AR', label: '🇦🇷 Argentina (AR) +54', code: '54' },
		{ value: 'AU', label: '🇦🇺 Australia (AU) +61', code: '61' },
		{ value: 'BE', label: '🇧🇪 Belgium (BE) +32', code: '32' },
		{ value: 'BR', label: '🇧🇷 Brazil (BR) +55', code: '55' },
		{ value: 'CA', label: '🇨🇦 Canada (CA) +1', code: '1' },
		{ value: 'CO', label: '🇨🇴 Colombia (CO) +57', code: '57' },
		{ value: 'CY', label: '🇨🇾 Cyprus (CY) +357', code: '357' },
		{ value: 'CZ', label: '🇨🇿 Czech Republic (CZ) +420', code: '420' },
		{ value: 'FR', label: '🇫🇷 France (FR) +33', code: '33' },
		{ value: 'DE', label: '🇩🇪 Germany (DE) +49', code: '49' },
		{ value: 'IE', label: '🇮🇪 Ireland (IE) +353', code: '353' },
		{ value: 'IL', label: '🇮🇱 Israel (IL) +972', code: '972' },
		{ value: 'IT', label: '🇮🇹 Italy (IT) +39', code: '39' },
		{ value: 'LU', label: '🇱🇺 Luxembourg (LU) +352', code: '352' },
		{ value: 'MT', label: '🇲🇹 Malta (MT) +356', code: '356' },
		{ value: 'MX', label: '🇲🇽 Mexico (MX) +52', code: '52' },
		{ value: 'NL', label: '🇳🇱 Netherlands (NL) +31', code: '31' },
		{ value: 'NZ', label: '🇳🇿 New Zealand (NZ) +64', code: '64' },
		{ value: 'NO', label: '🇳🇴 Norway (NO) +47', code: '47' },
		{ value: 'PH', label: '🇵🇭 Philippines (PH) +63', code: '63' },
		{ value: 'PT', label: '🇵🇹 Portugal (PT) +351', code: '351' },
		{ value: 'SG', label: '🇸🇬 Singapore (SG) +65', code: '65' },
		{ value: 'SK', label: '🇸🇰 Slovakia (SK) +421', code: '421' },
		{ value: 'ZA', label: '🇿🇦 South Africa (ZA) +27', code: '27' },
		{ value: 'ES', label: '🇪🇸 Spain (ES) +34', code: '34' },
		{ value: 'SE', label: '🇸🇪 Sweden (SE) +46', code: '46' },
		{ value: 'CH', label: '🇨🇭 Switzerland (CH) +41', code: '41' },
		{ value: 'GB', label: '🇬🇧 United Kingdom (GB) +44', code: '44' },
		{ value: 'US', label: '🇺🇸 United States (US) +1', code: '1' },
	];

	// Create a new state variable to store the selected country code.
	// const [selectedCountry, setSelectedCountry] = useState(countryOptions[0]);
	const [selectedCountry, setSelectedCountry] = useState('');
	// Add a new state variable for country code
	// const [countryOption, setCountryOptions] = useState('34');

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
		console.log(linkParams);
		console.log('This is postParams value:', dataCreateLead.postParams);

		try {
			const responseLead = await axios.post('http://api-m-dev.riptec.host:8082/anton.o/api1/1.2.0/createLead', dataCreateLead);

			console.log('Create Lead response:', responseLead.data);
		} catch (error) {
			console.log('Create Lead error:', error.message);
		}
	};

	// PHONE NUMBER VERIFICATION
	const handlePhoneNumberSubmit = async (values, { setSubmitting }) => {
		// setClientData
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

			console.log('This is dataRequestPin:', dataRequestPin.countryCode);

			// RECEIVE CREATE LEAD
			// CREATE LEAD - ADD USER TO THE CONXHUB PORTAL
			await createLead(values);

			// SIM CODE VERIFICATION ENDPOINT
			const responseCode = await axios.post('http://api-m-dev.riptec.host:8082/anton.o/api1/1.2.0/requestSimCode', dataRequestPin);

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

			const response = await axios.post('http://api-m-dev.riptec.host:8082/anton.o/api1/1.2.0/verifySimCode', data);

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
			<h1 className='text-buttonColor text-2xl lg:text-3xl pb-4'>Create your VIP Experience</h1>
			<h3 className='text-buttonColor text-xl lg:text-xl pb-4'>Lets start with verifying your mobile phone</h3>
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
										First Name:
									</label>
									<Field autoComplete='off' className='bg-purple-200 h-10 w-60 min-w-full rounded-md pl-2' id='firstName' name='firstName' type='text' />
									<ErrorMessage name='firstName' />
								</div>
								{/* LAST NAME  */}
								<div className='flex flex-col'>
									<label className='text-buttonColor' htmlFor='lastName'>
										Last Name:
									</label>
									<Field autoComplete='off' className='bg-purple-200 h-10 w-60 min-w-full rounded-md pl-2' id='lastName' name='lastName' type='text' />
									<ErrorMessage name='lastName' />
								</div>
								{/* EMAIL  */}
								<div className='flex flex-col'>
									<label className='text-buttonColor' htmlFor='clientEmail'>
										Email:
									</label>
									<Field autoComplete='off' className='bg-purple-200 h-10 w-60 min-w-full rounded-md pl-2' id='clientEmail' name='clientEmail' type='clientEmail' />
									<ErrorMessage name='clientEmail' />
								</div>

								{/* DROP DOWN WITH COUNTRY CODES  */}
								{/* Add a select element for country selection */}
								{/* COUNTRY SELECT */}
								<div id='selectCountryPhone'>
									<label className='text-buttonColor' htmlFor='countryCode'>
										Country:
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
											{/* <CountryOptions /> */}
											{/* </select> */}
										</div>
										{/* COUNTRY FLAG  */}
										{/* <div className='flex bg-purple-200 rounded-r-md h-10 items-center px-2'>
											<ReactCountryFlag countryCode={selectedCountry} style={{ fontSize: '1.5em' }} />
										</div> */}
									</div>

									{/* PHONE NUMBER INPUT FIELD  */}
									<div className='flex flex-col w-full pt-4'>
										<label className='text-buttonColor' htmlFor='phoneNumber'>
											Your Number:
										</label>
										<Field autoComplete='off' className='bg-purple-200 h-10 w-full rounded-md pl-2' id='phoneNumber' name='phoneNumber' type='tel' />
										<ErrorMessage name='phoneNumber' />
									</div>
								</div>
								{/* PHONE INPUT FIELD ERRORS  */}
								{/* <div className='flex pl-[9em] mt-[-24px]'>
									<ErrorMessage name='phoneNumber' />
								</div> */}

								{Object.keys(linkParams).map((key) => (
									<Field key={key} type='hidden' name={key} value={linkParams[key]} />
								))}
							</div>
							<button id='verifyButton' className='bg-purple-500 hover:bg-purple-400 text-white font-semibold h-10 rounded-md mt-10' type='submit' disabled={isSubmitting}>
								{isSubmitting ? 'Submitting...' : 'Verify your Mobile Number'}
							</button>
							<div>
								<h4 className='text-base text-buttonColor'>You will receive an SMS with a verification code to validate next...</h4>
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
								Verification Code:
							</label>
							<Field autoComplete='off' className='bg-purple-200 h-10 w-60 min-w-full rounded-md p-2' id='verificationCode' name='verificationCode' type='text' />
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
