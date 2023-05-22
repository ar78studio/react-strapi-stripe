import { PaymentElement, CardElement, Elements, useElements, useStripe } from '@stripe/react-stripe-js';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const emailRule = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const nameRule = /^[A-Za-z\s]{0,50}$/;

const PaymentForm = () => {
	// Also try and copy  the two consts bellow to VerifyAxios.jsx in order to try and to send the name and email from the first Formik form to Stripe to create a customer.
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');

	const stripe = useStripe();
	const elements = useElements();
	const initialValues = {
		name: '',
		email: '',
	};

	const validationSchema = Yup.object({
		// name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').matches(nameRule).required('Name is required'),
		name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').matches(nameRule),
		// email: Yup.string().matches(emailRule, 'Verify Email Format').required('Email is required'),
		email: Yup.string().matches(emailRule, 'Verify Email Format'),
	});

	// REDIRECT TO THE CONFIRMATION PAGE
	const navigate = useNavigate();

	// CHECK IF CUSTOMER ALREADY EXISTS
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
			// get clientSecret and conform the payment. If the payment is not already confirmed on the backend, it will be confirmed now.
			if (!response.ok) return alert('Payment unsuccessful! Response not ok at paymentform.jsx line 42');

			const data = await response.json();
			// ADDING THE CODE BELOW BECAUSE OF THE FOLLOWING MISTAKE: Payment failed, Missing value for stripe.confirmCardPayment intent secret: value should be a client_secret string.
			// const clientSecret = data.clientSecret;

			const confirm = await stripe.confirmCardPayment(data.clientSecret);
			if (confirm.error) {
				return alert('Payment unsuccessful! confirm.error at paymentform.jsx line 45');
			}
			alert('Payment successful! Subscription is active');
			// REDIRECT TO STRIPE CHECKOUT
			navigate('/signup/confirmation');
		} catch (error) {
			console.error(error);
			alert('Payment failed, ' + error.message);
		}
	};

	return (
		<>
			<h1 className='text-4xl pb-10 text-buttonColor font-semibold'>Payment Form</h1>

			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={createSubscription}>
				{({ isSubmitting }) => (
					<Form id='stripeCustomer' className='block flex flex-col max-w-full gap-4 '>
						<div className='flex flex-col gap-6'>
							{/* NAME  */}
							<div className='flex flex-col'>
								<label className='text-buttonColor' htmlFor='name'>
									Full Name:{''}
								</label>
								<Field className='bg-purple-200 h-10 w-60 min-w-full rounded-md p-2' id='name' name='name' type='text' value={name} onChange={(e) => setName(e.target.value)} />
								<ErrorMessage name='name' />
							</div>
							{/* EMAIL  */}
							<div className='flex flex-col'>
								<label className='text-buttonColor' htmlFor='email'>
									Email:{''}
								</label>
								<Field
									className='bg-purple-200 h-10 w-60 min-w-full rounded-md p-2'
									id='email'
									name='email'
									type='email'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<ErrorMessage name='email' />
							</div>
						</div>

						<div>
							<label className='text-buttonColor' htmlFor='cardElement'>
								Enter Your Card Number:{''}
							</label>
							{/* <PaymentElement className='bg-purple-200 p-2 rounded-md' id='cardElement' /> */}
							<CardElement className='bg-purple-200 p-2 h-10 rounded-md' id='cardElement' />
						</div>
						<button className='bg-purple-500 hover:bg-purple-400 text-white font-semibold h-10 rounded-md mt-4' type='submit' disabled={isSubmitting}>
							{isSubmitting ? 'Subscribing...' : 'Subscribe'}
						</button>
						<div className='flex justify-center text-xl text-buttonColor'>
							<h4 className='text-base text-buttonColor'>Powered by Stripe</h4>
						</div>
					</Form>
				)}
			</Formik>
		</>
	);
};

export default PaymentForm;
