import { PaymentElement, CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const emailRule = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const nameRule = /^[A-Za-z\s]{0,50}$/;

const PaymentForm = ({ clientData }) => {
	console.log(clientData);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	const stripe = useStripe();
	const elements = useElements();

	// INITIAL VALUES AND VALUES CARRIED FROM VerifyAxios.jsx
	const initialValues = {
		firstName: location.state?.firstName || clientData.firstName || '',
		lastName: location.state?.lastName || clientData.lastName || '',
		email: location.state?.email || clientData.clientEmail || '',
		phone: location.state?.phoneNumber || clientData.phoneNumber || '',
	};

	console.log(initialValues);

	const validationSchema = Yup.object({
		// name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').matches(nameRule).required('Name is required'),
		name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').matches(nameRule),
		// email: Yup.string().matches(emailRule, 'Verify Email Format').required('Email is required'),
		email: Yup.string().matches(emailRule, 'Verify Email Format'),
	});

	// REDIRECT TO THE CONFIRMATION PAGE
	const navigate = useNavigate();

	// CHECK IF CUSTOMER ALREADY EXISTS via email only
	const checkExistingClient = async () => {
		try {
			const response = await fetch('http://localhost:1447/check-existing-client', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: email,
				}),
			});

			if (!response.ok) {
				throw new Error('Failed to check existing client');
			}

			const data = await response.json();

			if (data.clientExists) {
				throw new Error('Client is already subscribed');
			}

			return true;
		} catch (error) {
			console.error(error);
			throw error;
		}
	};

	// CREATE NEW CUSTOMER SUBSCRIPTION
	const createSubscription = async () => {
		try {
			// CHECKING IF CUSTOMER ALREADY SIBSCRIBED
			const isExistingClient = await checkExistingClient();

			if (!isExistingClient) {
				return;
			}

			// CREATE STRIPE PAYMENT METHOD
			const paymentMethod = await stripe.createPaymentMethod({
				type: 'card',
				card: elements.getElement('card'),
			});

			const response = await fetch('http://localhost:1447/create-subscription', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: name,
					email: email,
					paymentMethod: paymentMethod.paymentMethod.id,
				}),
			});
			if (!response.ok) return alert('Payment unsuccessful! Response not ok at paymentform.jsx line 42');

			const data = await response.json();

			const confirm = await stripe.confirmCardPayment(data.clientSecret);
			if (confirm.error) {
				return alert('Payment unsuccessful! confirm.error at paymentform.jsx line 45');
			}
			alert('Payment successful! Subscription is active');
		} catch (error) {
			console.error(error);
			alert('Payment failed, ' + error.message);
		}

		createRiptecUser();
	};

	const createRiptecUser = async () => {
		try {
			// CREATE RIPTEC CUSTOMER
			const dataCreateUser = {
				cusFirstName: clientData.firstName,
				cusLastName: clientData.lastName,
				cusEmail: clientData.clientEmail,
				cusSimNumber: clientData.phoneNumber,
				cusCountryISO3: '',
				leadId: '',
			};
			console.log(dataCreateUser);

			// SIM CODE VERIFICATION ENDPOINT
			const responseUserCreated = await axios.post('http://api-m-dev.riptec.host:8082/anton.o/api1/1.2.0/createUser', dataCreateUser);
		} catch (error) {
			// CHECK IF responseUserCreated ok
			if (responseUserCreated.error) {
				return alert(` Error with User Creation: ${error.message}`);
			} else {
				alert('User Created Successfully!');
			}
		}

		// REDIRECT TO STRIPE CONFIRMATION PAGE
		navigate('/signup/subscribe/confirmation');
	};

	return (
		<>
			<h1 className='text-4xl pb-10 text-buttonColor font-semibold'>Payment Form</h1>

			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={createSubscription}>
				{({ isSubmitting }) => (
					<Form id='stripeCustomer' className='block flex flex-col max-w-full gap-4 '>
						<div className='flex flex-col gap-6'>
							{/* FIRST NAME  */}
							<div className='flex flex-col'>
								<label className='text-buttonColor' htmlFor='firstName'>
									First Name:
								</label>
								<Field autoComplete='off' className='bg-purple-200 h-10 w-60 min-w-full rounded-md p-2' id='firstName' name='firstName' type='text' />
								<ErrorMessage name='firstName' />
							</div>
							{/* LAST NAME  */}
							<div className='flex flex-col'>
								<label className='text-buttonColor' htmlFor='lastName'>
									Last Name:
								</label>
								<Field autoComplete='off' className='bg-purple-200 h-10 w-60 min-w-full rounded-md p-2' id='lastName' name='lastName' type='text' />
								<ErrorMessage name='lastName' />
							</div>
							{/* EMAIL  */}
							<div className='flex flex-col'>
								<label className='text-buttonColor' htmlFor='email'>
									Email:{''}
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
								Enter Your Card Number:{''}
							</label>
							{/* <PaymentElement className='bg-purple-200 p-2 rounded-md' id='cardElement' /> */}
							<CardElement id='cardElement' className='bg-purple-200 p-2 h-10 rounded-md' />
						</div>
						<button className='bg-purple-500 hover:bg-purple-400 text-white font-semibold h-10 rounded-md mt-4' type='submit' disabled={isSubmitting}>
							{isSubmitting ? 'Subscribing...' : 'Subscribe'}
						</button>
						<div>
							<h5 className='text-xs text-center text-buttonColor lg:px-20'>
								By confirming your subscription, you allow VIP Safety First to charge your card for this payment and future payments in accordance with their terms. You can always
								cancel your subscription.
							</h5>
						</div>
						<div className='flex justify-center text-xl text-buttonColor'>
							<h5 className='text-sm text-buttonColor'>Powered by Stripe</h5>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default PaymentForm;
