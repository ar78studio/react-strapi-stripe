import React from 'react';
import { motion } from 'framer-motion';

import useMediaQuery from '../../hooks/useMediaQuery';
import { PhoneVipNumber } from '../../assets/index';

const AVipNumber = () => {
	const isAboveMediumScreens = useMediaQuery('(min-width: 1060px');

	return (
		<>
			<main className='w-full flex flex-wrap-reverse lg:flex-nowrap bg-aVipPhoneBg justify-between lg:px-10 lg:pt-10'>
				<motion.img
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 1 }}
					variants={{
						hidden: { opacity: 0, x: 100 },
						visible: { opacity: 1, x: 0 },
					}}
					className=' mt-10 w-full lg:w-1/2 place-self-center lg:place-self-start mb-[-11%]'
					src={PhoneVipNumber}
					alt='Girl Does Not Like to be Harassed'
				/>
				<section className='lg:pr-10 mt-10 lg:w-1/2 w-full flex flex-col content-center pt-6'>
					<motion.h1
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, amount: 0.5 }}
						transition={{ delay: 0.2, duration: 1.2 }}
						variants={{
							hidden: { opacity: 0, x: -100 },
							visible: { opacity: 1, x: 0 },
						}}
						className='px-10 text-4xl lg:text-5xl text-white text-center lg:text-left font-semibold leading-tight lg:leading-snug'
					>
						A VIP phone number is the best solution to keep you safe
					</motion.h1>

					<motion.div
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, amount: 0.5 }}
						transition={{ delay: 0.4, duration: 1.5 }}
						variants={{
							hidden: { opacity: 0, x: 100 },
							visible: { opacity: 1, x: 0 },
						}}
						className='px-10 text-base text-center lg:text-left text-white pt-6 lg:mr-10'
					>
						<p>
							At VIPSafetyFirst, our mission is to provide women with the tools they need to protect themselves and their privacy in today’s digital age. We understand that women
							face unique challenges when it comes to safety and security, and our service is designed to help them overcome these challenges and feel confident in their ability to
							protect themselves.{' '}
						</p>

						<br />
						<p>
							We are committed to providing top-quality service and support to all of our customers, and we believe that everyone deserves to feel safe and secure. With
							VIPSafetyFirst, you can rest assured that you have a trusted partner by your side, helping you navigate the challenges of today’s digital world.
						</p>

						<motion.button
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true, amount: 0.5 }}
							transition={{ delay: 0.8, duration: 2 }}
							variants={{
								hidden: { opacity: 0 },
								visible: { opacity: 1 },
							}}
							className='place-self-center lg:place-self-start mt-8 mb-10 p-4 w-80 sm:w-96 sm:text-base bg-buttonColor lg:text-[1.3rem] text-base font-semibold rounded-lg text-white transition duration-300 ease-in-out hover:scale-110'
						>
							SIGN UP FOR ADDED PROTECTION
						</motion.button>
					</motion.div>
				</section>
			</main>
		</>
	);
};

export default AVipNumber;
