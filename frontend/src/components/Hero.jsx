import React from 'react';
import useMediaQuery from '../hooks/useMediaQuery';
import { motion } from 'framer-motion';
import AnchorLink from 'react-anchor-link-smooth-scroll-v2';
import { GirlHero } from '../assets/index';

const Hero = ({ setSelectedPage }) => {
	const isAboveMediumScreens = useMediaQuery('(min-width: 1060px');

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
			{/* HERO SECTION WITH GIRL LOOKING CONFUSED  */}
			<section className='flex flex-wrap lg:flex-nowrap bg-gradient-to-tl from-[#9453e8] to-[#c4a6e4] justify-between lg:px-10 pt-10'>
				<div className='w-full flex flex-col content-center lg:w-1/2 lg:pt-6'>
					{/* HEADING TITLE  */}
					<motion.h1
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, amount: 0.5 }}
						transition={{ delay: 0.2, duration: 1.2 }}
						variants={{
							hidden: { opacity: 0, x: -100 },
							visible: { opacity: 1, x: 0 },
						}}
						className=' mx-10 text-4xl lg:text-5xl text-white text-center lg:text-left font-semibold leading-tight lg:leading-snug'
					>
						There is a new way to protect your personal world. Reduce harassment, spam, bullying and unwanted attention.
					</motion.h1>
					{/* PARAGRAPH UNDER HEADING  */}
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
						className='place-self-center lg:place-self-start mx-10 my-10 p-4 w-80 sm:w-96 sm:text-base bg-buttonColor xs:text-lg text-base font-semibold rounded-lg text-white transition duration-300 ease-in-out hover:scale-110'
					>
						SIGN UP TO ADD VIP PROTECTION
					</motion.button>
				</div>
				{/* IMAGE OF GIRL IN THE HERO SECTION 		 */}
				<motion.img
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, amount: 0.5 }}
					transition={{ delay: 0.8, duration: 1 }}
					variants={{
						hidden: { opacity: 0, x: 100 },
						visible: { opacity: 1, x: 0 },
					}}
					className='w-full px-6 lg:w-1/2 mw-auto place-self-center lg:place-self-end ml-4'
					src={GirlHero}
					alt='Girl Does Not Like to be Harassed'
				/>
			</section>
		</>
	);
};

export default Hero;
