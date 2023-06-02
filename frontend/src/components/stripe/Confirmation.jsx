import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';

const Confirmation = () => {
	// get profileNumber from PaymentForm - which is the Customer's new phone number
	const location = useLocation();
	const profileNumber = location.state?.profileNumber || 'Not Available';

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
			<div className='flex flex-col justify-center items-center py-20'>
				<h1 className='text-4xl text-buttonColor'>Your Subscription is Confirmed </h1>
				<p className='py-10'> Your new Phone number is: {profileNumber ? profileNumber : 'Not available'}</p>

				<h4>You can download an app for your Android Phone here:</h4>
				<Link className='text-base text-buttonColor' to='https://play.google.com/store/apps/details?id=net.riptec.conxhub'>
					{' '}
					Android APP{' '}
				</Link>

				<h4>You can download an app for your iPhone here:</h4>
				<Link className='text-base text-buttonColor' to='https://play.google.com/store/apps/details?id=net.riptec.conxhub'>
					{' '}
					iOS Apple APP{' '}
				</Link>
			</div>
		</>
	);
};

export default Confirmation;
