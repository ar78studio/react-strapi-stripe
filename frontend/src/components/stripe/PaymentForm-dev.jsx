import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { locatedError } from 'graphql';

// Multilanguage support
import { useTranslation, Trans } from 'react-i18next';

const emailRule = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const nameRule = /^[A-Za-z\s]{0,50}$/;

const PaymentForm = ({ clientData }) => {
	const { t, i18n } = useTranslation();

	const location = useLocation();
	// console.log(clientData);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	const stripe = useStripe();
	const elements = useElements();

	// INITIAL VALUES AND VALUES CARRIED FROM VerifyAxios.jsx
	const initialValues = {
		firstName: location.state?.firstName || clientData.firstName || '',
		lastName: location.state?.lastName || clientData.lastName || '',
		email: location.state?.email || clientData.clientEmail || '',
		countryCode: locatedError.state?.countryCode || clientData.countryCode || '',
		phone: location.state?.phoneNumber || clientData.phoneNumber || '',
		couponCode: '',
	};

	// console.log(initialValues);

	// Reset Formik form values in case of existing Customer
	// const resetInitialValues = {
	// 	firstName: '',
	// 	lastName: '',
	// 	email: '',
	// 	phone: '',
	// };

	// console.log(initialValues);

	const validationSchema = Yup.object({
		// name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').matches(nameRule).required('Name is required'),
		name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').matches(nameRule),
		// email: Yup.string().matches(emailRule, 'Verify Email Format').required('Email is required'),
		email: Yup.string().matches(emailRule, 'Verify Email Format'),
	});

	// REDIRECT TO THE CONFIRMATION PAGE
	const navigate = useNavigate();

	// CHECK IF CUSTOMER ALREADY EXISTS via email only
	const checkExistingClient = async (formValues, resetForm) => {
		try {
			const response = await fetch(`${import.meta.env.VITE_STRIPE_SERVER}/check-existing-client`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					// email: clientData.clientEmail,
					email: formValues.email,
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to check existing client');
			}

			const data = await response.json();

			if (data.clientExists) {
				// IF CLIENT EXISTS - RESET FORM
				// resetForm({ values: resetInitialValues }); // reset form values if client exists
				// navigate('/signup');
				// throw new Error('Client is already subscribed');
				//
				// We decided not to limit multiple sign-ups for existing clients, thus return true
				return true;
			}

			return true;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	// CREATE NEW CUSTOMER SUBSCRIPTION
	const createSubscription = async (formValues, resetForm) => {
		try {
			// CHECKING IF CUSTOMER IS ALREADY SIBSCRIBED and reset the form
			const isExistingClient = await checkExistingClient(formValues, resetForm);

			if (!isExistingClient) {
				return;
			}

			// CREATE STRIPE PAYMENT METHOD
			const paymentMethod = await stripe.createPaymentMethod({
				type: 'card',
				card: elements.getElement('card'),
			});

			// This will log the coupon code to the console
			console.log(`Coupon Code: ${formValues.couponCode}`);

			const response = await fetch(`${import.meta.env.VITE_STRIPE_SERVER}/create-subscription`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},

				body: JSON.stringify({
					firstName: formValues.firstName,
					lastName: formValues.lastName,
					email: formValues.email,
					paymentMethod: paymentMethod.paymentMethod.id,
					couponCode: formValues.couponCode,
				}),
			});

			if (!response.ok) return alert('Payment unsuccessful!');

			// const data = await response.json();

			// const confirm = await stripe.confirmCardPayment(data.clientSecret);
			if (confirm.error) {
				return alert('Payment unsuccessful!');
			}
			alert('Payment successful! Subscription is active');

			// Only call createRiptecCustomer if customer is not already in Stripe system
			if (isExistingClient) {
				await createRiptecCustomer();
			}

			// REDIRECT TO STRIPE CONFIRMATION PAGE
			// navigate('/signup/subscribe/confirmation');
		} catch (error) {
			console.error(error);
			alert('Payment failed, ' + error.message);
			// resetForm({ values: resetInitialValues }); // Reset the form in case of an error.
		}
	};

	// SAVING THE profileNumber received from Riptec backend into the state
	// REDIRECT TO STRIPE CONFIRMATION PAGE
	const [profileNumber, setProfileNumber] = useState('');

	useEffect(() => {
		if (profileNumber) {
			// console.log('Navigating with profileNumber: ', profileNumber);
			navigate('/signup/subscribe/confirmation', { state: { profileNumber } });
		}
	}, [profileNumber, navigate]);

	// AUTHORIZATION FOR RIPTEC SERVER
	const bauth = {
		auth: {
			// username: 'mobile_api_client',
			username: `${import.meta.env.VITE_RIPTEC_API_USERNAME}`,
			// password: 'aeb70f59-fa5e-4efc-b1d5-487368ad0607',
			password: `${import.meta.env.VITE_RIPTEC_API_PASSWORD}`,
		},
	};

	const createRiptecCustomer = async () => {
		try {
			const dataCreateCustomer = {
				cusFirstName: clientData.firstName,
				cusLastName: clientData.lastName,
				cusEmail: clientData.clientEmail,
				cusCountryISO3: clientData.countryCode,
				cusSimNumber: clientData.phoneNumber,
				leadId: '',
			};
			console.log(dataCreateCustomer);

			const responseCustomerCreated = await axios.post(`${import.meta.env.VITE_RIPTEC_API_URL}/anton.o/api1/1.2.0/createCustomer`, dataCreateCustomer, bauth);
			// Use status or data field from the response to check for errors, as axios doesn't throw an error for a 4xx or 5xx status.

			// console.log('responseCustomerCreated is: ', responseCustomerCreated.data);
			if (responseCustomerCreated.status !== 200) {
				throw new Error(` Error with User Creation: ${responseCustomerCreated.status}`);
			}
			console.log('User Created Successfully!');

			// SINCE USER CREATE SUCCESSFULLY GET THE PROFILE NUMBER FROM THE RIPTEC BACKEND
			// Extract profileNumber
			if (responseCustomerCreated && responseCustomerCreated.data.data && responseCustomerCreated.data.data.user) {
				const profileNumber = responseCustomerCreated.data.data.user.profileNumber;
				// console.log(profileNumber);
				setProfileNumber(profileNumber);
			} else {
				console.error('Unable to access profileNumber from response.');
				// Handle the error case here.
			}
		} catch (error) {
			alert(` Error with User Creation: ${error.message}`);
		}
	};

	return (
		<>
			<h1 className='text-4xl pb-10 text-buttonColor font-semibold'>
				{/* Payment Form */}
				<Trans i18nKey='stripePaymentForm'></Trans>
			</h1>

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				// onSubmit={createSubscription} // original
				onSubmit={(formValues, { resetForm }) => createSubscription(formValues, resetForm)}
			>
				{({ isSubmitting }) => (
					<Form id='stripeCustomer' className='flex flex-col max-w-full gap-4 '>
						<div className='flex flex-col gap-6'>
							{/* FIRST NAME  */}
							<div className='flex flex-col'>
								<label className='text-buttonColor' htmlFor='firstName'>
									{/* First Name: */}
									<Trans i18nKey='stripeForm.fname'></Trans>
								</label>
								{/* <MdPermIdentity size={30} /> */}
								<Field autoComplete='off' className='bg-purple-200 h-10 w-60 min-w-full rounded-md p-2' id='firstName' name='firstName' type='text' />
								<ErrorMessage name='firstName' />
							</div>
							{/* LAST NAME  */}
							<div className='flex flex-col'>
								<label className='text-buttonColor' htmlFor='lastName'>
									{/* Last Name: */}
									<Trans i18nKey='stripeForm.lname'></Trans>
								</label>
								<Field autoComplete='off' className='bg-purple-200 h-10 w-60 min-w-full rounded-md p-2' id='lastName' name='lastName' type='text' />
								<ErrorMessage name='lastName' />
							</div>
							{/* EMAIL  */}
							<div className='flex flex-col'>
								<label className='text-buttonColor' htmlFor='email'>
									{/* Email: */}
									<Trans i18nKey='stripeForm.email'></Trans>

									{''}
								</label>
								<Field
									autoComplete='off'
									className='bg-purple-200 h-10 w-60 min-w-full rounded-md p-2'
									id='email'
									name='email'
									type='email'
									// value={email}
									// onChange={(e) => setEmail(e.target.value)}
								/>
								<ErrorMessage name='email' />
							</div>
						</div>
						<div>
							<label className='text-buttonColor' htmlFor='cardElement'>
								{/* Enter Your Card Number: */}
								<Trans i18nKey='stripeForm.card'></Trans>
								{''}
							</label>
							{/* <PaymentElement className='bg-purple-200 p-2 rounded-md' id='cardElement' /> */}
							<CardElement id='cardElement' className='bg-purple-200 p-2 h-10 rounded-md' options={{ hidePostalCode: true }} />
						</div>
						{/* couponCode INPUT */}
						<div className='flex flex-col'>
							<label className='text-buttonColor' htmlFor='couponCode'>
								{/* couponCode: */}
								<Trans i18nKey='stripeForm.couponCode'></Trans>
							</label>
							<Field autoComplete='off' className='bg-purple-200 h-10 w-60 min-w-full rounded-md p-2' id='couponCode' name='couponCode' type='text' />
							<ErrorMessage name='couponCode' />
						</div>
						<button className='bg-purple-500 hover:bg-purple-400 text-white font-semibold h-10 rounded-md mt-4' type='submit' disabled={isSubmitting}>
							{isSubmitting ? <Trans i18nKey='subscribing'></Trans> : <Trans i18nKey='subscribeButton'></Trans>}
						</button>
						<div>
							<h5 className='text-xs text-center text-buttonColor lg:px-20'>
								{/* By confirming your subscription, you allow VIP Safety First to charge your card for this payment and future payments in accordance with their terms. You can always */}
								{/* cancel your subscription. */}
								<Trans i18nKey='confirmDescr'></Trans>
							</h5>
						</div>
						<div className='flex justify-center text-xl text-buttonColor'>
							<h5 className='text-sm text-buttonColor'>
								{/* Powered by Stripe */}
								<Trans i18nKey='powered'></Trans>
							</h5>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default PaymentForm;
