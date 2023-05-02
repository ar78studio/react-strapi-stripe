import React from 'react';
import useMediaQuery from '../../hooks/useMediaQuery';
import { motion } from 'framer-motion';
import AnchorLink from 'react-anchor-link-smooth-scroll-v2';
import { SimHearts } from '../../assets/index';

import AccordionTabs from '../accordion/AccordionTabs';

const FaqInProduct = ({ setSelectedPage }) => {
	const isAboveMediumScreens = useMediaQuery('(min-width: 1060px');

	return (
		<>
			<section id='help' className='flex justify-center flex-wrap lg:flex-nowrap bg-faqBackground lg:justify-between lg:px-10 lg:pt-10 pb-20'>
				<motion.div
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, amount: 0.5 }}
					transition={{ delay: 0.2, duration: 1.2 }}
					variants={{
						hidden: { opacity: 0, x: -100 },
						visible: { opacity: 1, x: 0 },
					}}
					className='pr-10 mt-10 lg:w-1/2 flex justify-self-center flex-col pt-6'
				>
					<h1 className='flex flex-column mx-10 text-3xl sm:text-4xl lg:text-5xl text-white text-center lg:text-left font-semibold leading-tight lg:leading-snug'>
						Frequently Asked Questions
					</h1>
					<div className='my-10 flex flex-row'>
						{/* BORDER LINE BEFORE WORD General  */}
						<span className='ml-10 place-self-center w-10 border-b-4 border-[#f20f76]'></span>
						<p className='ml-4 text-white text-xl font-semibold'>General</p>
					</div>
					<img className='w-60 ml-10 mt-6' src={SimHearts} alt='Hearts that are Sim Cards' />
				</motion.div>

				<motion.div
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, amount: 0.5 }}
					transition={{ delay: 0.4, duration: 1.5 }}
					variants={{
						hidden: { opacity: 0, x: 100 },
						visible: { opacity: 1, x: 0 },
					}}
					className='w-full text-center lg:text-left text-white pt-6 mx-10 my-20 '
				>
					{/* FAQ ACCORDION TABS  */}
					<AccordionTabs />
				</motion.div>
			</section>
		</>
	);
};

export default FaqInProduct;