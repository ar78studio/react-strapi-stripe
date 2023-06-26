import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GirlFeelSafe } from '../../assets/index';

const ClientPortal = () => {
	// const createPortalSession = async () => {
	// 	try {
	// 		// const response = await fetch(`${process.env.REACT_APP_API_URL}:1447/check-existing-client`, {
	// 		const response = await fetch(`http://localhost:1447/create-customer-portal-session`, {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 		});

	// 		if (!response.ok) {
	// 			throw new Error('Failed to create portal session');
	// 		} else {
	// 			alert('Portal session created successfully ');
	// 		}
	// 	} catch (error) {
	// 		console.error(error);
	// 		throw error;
	// 	}
	// };

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
			<div className='flex justify-center items-center bg-purple-200 p-10'>
				<div className='flex flex-wrap-reverse lg:flex-nowrap bg-purple-300 lg:pt-10 lg:pt-0 lg:px-10 rounded-2xl'>
					<div className='flex lg:w-2/5 items-end'>
						<img className='px-10 lg:pt-10' src={GirlFeelSafe} alt='' />
					</div>
					<div className='flex flex-col lg:w-3/5 justify-center items-start px-10'>
						<h1 className='text-3xl text-purple-700 py-10'>Manage your Billing and Subscriptions: </h1>
						<p className=' text-base text-purple-700 font-semibold pb-10 text-start'>
							The billing and subscription management is powered by Stripe. To access it please click the button below. The Stripe Gateway will open, where you can enter the email
							you have used to Sign Up for your Subscription.{' '}
						</p>
						<p className=' text-base text-purple-700 font-semibold pb-10 text-start'>
							If the email is registered with Stripe a link to the Stripe Billing and Subscription portal will be sent to that email.
						</p>
						<button className='flex justify-center items-center p-4 mb-10 w-60 bg-purple-600 text-base rounded-[3rem] transition duration-300 ease-in-out hover:scale-110 hover:bg-purple-500'>
							<Link className='text-white font-semibold' target='_blank' to='https://billing.stripe.com/p/login/test_6oEdUc2qoa02bD23cc'>
								Access Customer Portal
							</Link>
						</button>
						{/* <form method='POST' action='/create-customer-portal-session'>
						<button type='submit'>Manage billing</button>
					</form> */}
					</div>
				</div>
			</div>
		</>
	);
};

export default ClientPortal;
