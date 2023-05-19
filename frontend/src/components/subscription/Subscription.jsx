import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ScrollToTop from '../ScrollToTop';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { SubscriptionForm } from '../index.js';

function Subscription(props) {
	const [stripePromise, setStripePromise] = useState(null);
	const [clientSecret, setClientSecret] = useState('');

	useEffect(() => {
		fetch('http://localhost:1447/config')
			.then(async (result) => {
				const { publishableKey } = await result.json();
				setStripePromise(loadStripe(publishableKey));
			})
			.catch((error) => {
				console.log('Error fetching Stripe config:', error);
			});
	}, []);

	useEffect(() => {
		fetch('http://localhost:1447/create-subscription', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({}),
		})
			.then(async (result) => {
				const { clientSecret } = await result.json();
				setClientSecret(clientSecret);
			})
			.catch((error) => {
				console.log('Error creating subscription:', error);
			});
	}, []);

	return (
		<>
			<ScrollToTop />

			{/* DARK BAR UNDER MENU - slide up with motion */}
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
			<div className='flex flex-col py-20'>
				<h1 className='text-2xl text-buttonColor text-center'>Become VIP Safety First</h1>
				<h2 className='text-xl text-buttonColor text-center'>Stripe Payment</h2>
				<div className='flex mx-auto'>
					{stripePromise && clientSecret && (
						<Elements stripe={stripePromise} options={{ clientSecret }}>
							<SubscriptionForm />
						</Elements>
					)}
				</div>
			</div>
		</>
	);
}

export default Subscription;
