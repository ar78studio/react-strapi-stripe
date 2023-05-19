import React from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import { motion } from 'framer-motion';
import { GirlFeelSafe } from '../../assets/index';
import { Link } from 'react-router-dom';

const FeelSafeWhen = () => {
	const isAboveMediumScreens = useMediaQuery('(min-width: 1060px');

	return (
		<>
			<main className='flex flex-wrap lg:flex-nowrap bg-gradient-to-tr from-[#c873f6] to-[#5330a9] justify-between lg:px-10 pt-10'>
				<section className='sm:w-full lg:w-3/5 flex flex-col content-center place-self-center pt-6'>
					<motion.h1
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, amount: 0.5 }}
						transition={{ delay: 0.2, duration: 1.2 }}
						variants={{
							hidden: { opacity: 0, x: -100 },
							visible: { opacity: 1, x: 0 },
						}}
						className=' mx-10 text-3xl lg:text-5xl text-white text-center lg:text-left font-semibold leading-tight lg:leading-snug'
					>
						Feel safe when sharing your phone number with others
					</motion.h1>
					<motion.p
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, amount: 0.5 }}
						transition={{ delay: 0.4, duration: 1.5 }}
						variants={{
							hidden: { opacity: 0, x: 100 },
							visible: { opacity: 1, x: 0 },
						}}
						className='text-base text-center lg:text-left text-white pt-6 mx-10'
					>
						It was this realization that sparked the idea of VIPSafetyFirst. As a brand solely aimed at women’s safety, we are proud to offer a solution that gives women the
						ability to protect themselves in a world where their privacy and security are often at risk. Our service empowers women to take control of their personal information by
						keeping their personal phone number private, allowing them to feel safe and secure at all times.
					</motion.p>
					<motion.button
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, amount: 0.5 }}
						transition={{ delay: 0.8, duration: 2 }}
						variants={{
							hidden: { opacity: 0 },
							visible: { opacity: 1 },
						}}
						className='place-self-center lg:place-self-start ml-10 mt-8 mb-10 p-4 w-80 sm:w-96 sm:text-base bg-buttonColor lg:text-[1.3rem] text-base font-semibold rounded-lg text-white transition duration-300 ease-in-out hover:scale-110'
					>
						<Link to='../SignUp'> SIGN UP FOR YOUR VIP NUMBER</Link>
					</motion.button>
				</section>
				{/* IMAGE OF GIRL IN HEADPHONES 		 */}
				<motion.img
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, amount: 0.5 }}
					transition={{ delay: 0.8, duration: 1 }}
					variants={{
						hidden: { opacity: 0, x: 100 },
						visible: { opacity: 1, x: 0 },
					}}
					className='w-full px-4 lg:w-1/2 place-self-center lg:place-self-end lg:ml-4 lg:mt-[-70px]'
					src={GirlFeelSafe}
					alt='Girl Feels Safe'
				/>
			</main>
		</>
	);
};

export default FeelSafeWhen;
