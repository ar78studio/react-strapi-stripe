import React from 'react';
import useMediaQuery from '../hooks/useMediaQuery';
import { motion } from 'framer-motion';
import AnchorLink from 'react-anchor-link-smooth-scroll-v2';
import { GirlHero } from '../assets/index';

const Hero = ({ setSelectedPage }) => {
	const isAboveMediumScreens = useMediaQuery('(min-width: 1060px');

	return (
		<>
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
			<section className='flex flex-wrap lg:flex-nowrap bg-gradient-to-tl from-[#9453e8] to-[#c4a6e4] justify-between px-6 lg:px-10 lg:pt-10'>
				<div className='w-full flex flex-col content-center pt-6'>
					<motion.h1
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, amount: 0.5 }}
						transition={{ delay: 0.2, duration: 1.2 }}
						variants={{
							hidden: { opacity: 0, x: -100 },
							visible: { opacity: 1, x: 0 },
						}}
						className='text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight lg:leading-snug mr-6'
					>
						There is a new way to protect your personal world. Reduce harassment, spam, bullying and unwanted attention.
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
						className='text-base text-white pt-6'
					>
						It is unpleasant & uncomfortable when you feel harassed, insecure or even trapped. Having shared their private information, this is something most women experience, at
						least once. Our VIP service adds another layer of protection by keeping your personal number private.
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
						className='place-self-center  my-10 p-4 w-80 sm:w-96 sm:text-base bg-buttonColor xs:text-lg text-base font-semibold rounded-lg text-white transition duration-300 ease-in-out hover:scale-110'
					>
						SIGN UP TO ADD VIP PROTECTION
					</motion.button>
				</div>

				<motion.img
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, amount: 0.5 }}
					transition={{ delay: 0.8, duration: 1 }}
					variants={{
						hidden: { opacity: 0, x: 100 },
						visible: { opacity: 1, x: 0 },
					}}
					className='lg:w-5/6 w-4xl mw-auto place-self-center md:place-self-end ml-4'
					src={GirlHero}
					alt='Girl Does Not Like to be Harassed'
				/>
			</section>
		</>
	);
};

export default Hero;
