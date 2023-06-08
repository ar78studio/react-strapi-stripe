import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Confirmation = () => {
	// get profileNumber from PaymentForm - which is the Customer's new phone number
	const location = useLocation();
	const profileNumber = location.state?.profileNumber || 'Not Available';

	// console.log(location.state);

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
			<section className='flex justify-center'>
				<div className='flex flex-col justify-center items-center p-10 bg-purple-300 m-10 lg:w-[700px] rounded-lg'>
					<h1 className='text-2xl lg:text-4xl text-center text-buttonColor'>Your Subscription is Confirmed </h1>
					<span className='pt-10 text-xl text-center text-buttonColor'> Your new Phone number is: </span>
					<span className='bg-purple-600 p-4 rounded-lg mt-4 mb-10 text-2xl text-white'>{profileNumber ? profileNumber : 'Not available'}</span>

					{/* <h4 className='text-center text-lg text-white font-semibold'>You can download an app for your Android Phone here:</h4> */}
					<a className='text-md text-buttonColor text-lg font-semibold' href='https://play.google.com/store/apps/details?id=net.riptec.conxhub'>
						{' '}
						Download Android APP
					</a>
					{/* <h4 className='text-center text-lg text-white font-semibold'>You can download an app for your iPhone here:</h4> */}
					<a className='text-md text-buttonColor text-lg font-semibold' href='https://apps.apple.com/es/app/conxhub/id1444346672'>
						Download iOS iPhone APP
					</a>
				</div>
			</section>
		</>
	);
};

export default Confirmation;
