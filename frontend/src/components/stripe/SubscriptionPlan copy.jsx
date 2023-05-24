import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import { loadStripe } from '@stripe/stripe-js';
import { motion } from 'framer-motion';

const stripePromise = loadStripe('pk_test_XEzHA2tiLmSdW9kfczbymQTU');

const SubscriptionPlan = () => {
	// DISPLAY PLAN INFO ON THE LEFT OF THE SCREEN
	const [subscription, setSubscription] = useState(null);
	const [product, setProduct] = useState(null);

	useEffect(() => {
		const fetchSubscription = async () => {
			try {
				const response = await fetch('http://localhost:1447/get-subscription', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (response.ok) {
					const data = await response.json();
					setSubscription(data.subscription);
				} else {
					console.log('Failed to fetch product');
				}
			} catch (error) {
				console.error(error);
			}
		};

		fetchSubscription();
	}, []);

	// fetch product

	return (
		<>
			{/* DARK BAR UNDER MENU  */}
			<motion.div
				initial='hidden'
				whileInView='visible'
				viewport={{ once: true, amount: 0.5 }}
				transition={{ duration: 1 }}
				variants={{
					hidden: { opacity: 1, y: 30 },
					visible: { opacity: 1, y: 0 },
				}}
			>
				<div className='w-full flex-row bg-underNavBar p-3'></div>
			</motion.div>
			<div className='flex flex-col flex-wrap lg:flex-row lg:flex-nowrap px-10 my-20'>
				<section id='planDescription' className='flex flex-col w-full lg:w-1/2 justify-center items-center '>
					<h1>Plan Pricing Description</h1>
					{subscription ? (
						<div>
							<h2>{subscription.name}</h2>
							<p>{subscription.description}</p>
							<p>
								Price: {subscription.currency.toUpperCase()} {subscription.amount / 100} per {subscription.interval}
							</p>
						</div>
					) : (
						<div>Loading plan details...</div>
					)}
				</section>
				<section id='stripePayment' className='w-full lg:w-1/2 lg:pl-10 pt-10'>
					{subscription ? (
						<Elements stripe={stripePromise}>
							<PaymentForm subscription={subscription} />
						</Elements>
					) : (
						<div>Loading plan details...</div>
					)}
				</section>
			</div>
		</>
	);
};

export default SubscriptionPlan;
