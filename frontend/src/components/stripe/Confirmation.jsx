import React from 'react';
import { motion } from 'framer-motion';

const Confirmation = () => {
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
				<p className='py-10'> Plan and other details details here... </p>
			</div>
		</>
	);
};

export default Confirmation;
