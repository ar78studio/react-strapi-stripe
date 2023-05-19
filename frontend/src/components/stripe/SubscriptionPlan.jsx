import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import { loadStripe } from '@stripe/stripe-js';
import { motion } from 'framer-motion';

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
const stripePromise = loadStripe('pk_test_XEzHA2tiLmSdW9kfczbymQTU');

const SubscriptionPlan = () => {
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
				<section className='flex flex-col w-full lg:w-1/2 justify-center items-center '>
					<h1>Plan Pricing Description</h1>
					<div>
						Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores reprehenderit sequi tempore modi laborum maxime obcaecati adipisci vitae ipsam impedit dolore
						quisquam repellat mollitia voluptas, sed doloribus. Assumenda quia aut fugit numquam error expedita illum nihil temporibus!
					</div>
				</section>
				<section className='w-full lg:w-1/2 lg:pl-10 pt-10'>
					<Elements stripe={stripePromise}>
						<PaymentForm />
					</Elements>
				</section>
			</div>
		</>
	);
};

export default SubscriptionPlan;
