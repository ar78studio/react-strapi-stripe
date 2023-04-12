import React from 'react';
import useMediaQuery from '../hooks/useMediaQuery';
import { motion } from 'framer-motion';
import AnchorLink from 'react-anchor-link-smooth-scroll-v2';
import { GirlHero } from '../assets/index';

const Hero = ({ setSelectedPage }) => {
	const isAboveMediumScreens = useMediaQuery('(min-width: 1060px');

	return (
		<section className='flex xs:flex-wrap lg:flex-nowrap bg-gradient-to-tl from-[#9453e8] to-[#c4a6e4] justify-between px-6 lg:px-10 lg:pt-10'>
			<div className='w-full flex flex-col content-center pt-6'>
				<h1 className='text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight lg:leading-snug mr-6'>
					There is a new way to protect your personal world. Reduce harassment, spam, bullying and unwanted attention.
				</h1>
				<p className='text-base text-white pt-6'>
					It is unpleasant & uncomfortable when you feel harassed, insecure or even trapped. Having shared their private information, this is something most women experience, at
					least once. Our VIP service adds another layer of protection by keeping your personal number private.
				</p>
				<button className='place-self-start my-10 p-4 w-96 bg-buttonColor xs:text-lg text-base font-semibold rounded-lg text-white transition duration-300 ease-in-out hover:scale-110'>
					SIGN UP TO ADD VIP PROTECTION
				</button>
			</div>

			<img className='lg:w-5/6 w-4xl place-self-center lg:place-self-end' src={GirlHero} alt='' />
		</section>
	);
};

export default Hero;
