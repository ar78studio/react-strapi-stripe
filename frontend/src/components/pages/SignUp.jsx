// Render Prop
import React, { useContext } from 'react';

import { GirlWithPhone } from '../../assets';

import VerifyAxios from '../verifycode/VerifyAxios';

import { motion } from 'framer-motion';

const SignUp = () => {
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
			{/* WRAPPER */}

			<div className='flex flex-wrap-reverse justify-center items-center px-10 py-20 bg-purple-100'>
				{/* IMAGE LEFT COLUMN */}
				<div className='lg:w-[50%] mx-6 my-10'>
					<img src={GirlWithPhone} alt='Your Personal Number is Safe with Us' className='rounded-lg' />
				</div>
				{/* FORM RIGHT COLUMN */}
				<div className='flex flex-col justify-center items-center mx-6 pt-4'>
					<VerifyAxios />
				</div>
			</div>
		</>
	);
};

export default SignUp;
