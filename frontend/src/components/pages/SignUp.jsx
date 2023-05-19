// Render Prop
import React from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
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
			<div className='flex justify-center items-center p-20 bg-purple-100'>
				{/* IMAGE LEFT COLUMN */}
				<div className='w-[50%] ml-10 invisible lg:visible'>
					<img src={GirlWithPhone} alt='Your Personal Number is Safe with Us' className='' />
				</div>
				{/* FORM RIGHT COLUMN  */}
				<div className='flex flex-col justify-center items-center mx-10'>
					<VerifyAxios />
				</div>
			</div>
		</>
	);
};

export default SignUp;
