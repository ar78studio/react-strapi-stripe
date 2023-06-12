import React from 'react';

import { motion } from 'framer-motion';
import { GirlVip, SingleHeart } from '../../assets/index';

const AboutVipSafety = () => {
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
			<main className='flex flex-wrap-reverse lg:flex-nowrap bg-gradient-to-tr from-[#263266] to-[#8164af] justify-between lg:px-10 lg:pt-10'>
				{/* IMAGE OF A GIRL ON THE PHONE  */}
				<motion.img
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, amount: 0.5 }}
					transition={{ duration: 1 }}
					variants={{
						hidden: { opacity: 0, x: -100 },
						visible: { opacity: 1, x: 0 },
					}}
					className='pl-20 pr-20 w-full lg:w-1/2 self-end place-self-start mr-10 mt-10'
					src={GirlVip}
					alt='Girl Has VIP Safety First Service'
				/>
				<section className='w-full lg:w-1/2 flex flex-col content-center pt-10'>
					<motion.h1
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, amount: 0.5 }}
						transition={{ delay: 0.2, duration: 1.2 }}
						variants={{
							hidden: { opacity: 0, x: 100 },
							visible: { opacity: 1, x: 0 },
						}}
						className=' mx-10 text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-white text-center lg:text-left font-semibold leading-tight lg:leading-snug'
					>
						What is VIP?
					</motion.h1>
					{/* HEART IMAGE  */}
					<motion.img
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, amount: 0.5 }}
						transition={{ delay: 0.4, duration: 1.2 }}
						variants={{
							hidden: { opacity: 0, x: 100 },
							visible: { opacity: 1, x: 0 },
						}}
						className='place-self-center lg:place-self-start lg:ml-10 mt-4 w-[60px]'
						src={SingleHeart}
						alt=''
					/>

					<motion.div
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, amount: 0.5 }}
						transition={{ delay: 0.6, duration: 1.5 }}
						variants={{
							hidden: { opacity: 0, x: 100 },
							visible: { opacity: 1, x: 0 },
						}}
						className='text-base text-center lg:text-left text-white pt-6 pb-20 mx-10'
					>
						<motion.p>VIP is ‘safety first’. VIP is the intelligent way to keep your phone number and you, safe.</motion.p>

						<br />
						<motion.p>
							Simply add our VIP service to your mobile phone – we give you a new number that works to protect your personal mobile number. By using our safety app, your personal
							mobile number becomes completely private.
						</motion.p>
						<br />
						<motion.h4 className='font-semibold text-2xl'>Concerned about your privacy?</motion.h4>
						<br />
						<motion.p>
							Your phone number is valuable to scammers, marketeers, groupies & stalkers – use a safety app and keep it safe. Control all aspects of your life, on your personal
							mobile phone! Our VIP safety first service can also record calls and locations to help stem threats to your safety.
						</motion.p>
					</motion.div>
				</section>
			</main>
		</>
	);
};

export default AboutVipSafety;
