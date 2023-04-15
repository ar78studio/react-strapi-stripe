import React from 'react';
import useMediaQuery from '../hooks/useMediaQuery';
import { motion } from 'framer-motion';
import AnchorLink from 'react-anchor-link-smooth-scroll-v2';
import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion';
import styles from './accordion/styles.module.css';

import { SimHearts, ChevronArrow } from '../assets/index';

const Faq = ({ setSelectedPage }) => {
	const isAboveMediumScreens = useMediaQuery('(min-width: 1060px');

	const AccordionItem = ({ header, ...rest }) => (
		<Item
			{...rest}
			header={
				<>
					{header}
					<img className={styles.chevron} src={ChevronArrow} alt='Chevron Down' />
				</>
			}
			className={styles.item}
			buttonProps={{
				className: ({ isEnter }) => `bg-white ${styles.itemBtn} ${isEnter && styles.itemBtnExpanded}`,
			}}
			contentProps={{ className: styles.itemContent }}
			panelProps={{ className: styles.itemPanel }}
		/>
	);

	return (
		<>
			<section className='flex justify-center flex-wrap lg:flex-nowrap bg-faqBackground lg:justify-between lg:px-10 lg:pt-10 pb-20'>
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
					className='w-full text-base text-center lg:text-left text-white pt-6 mx-10 mb-20 mt-20 '
				>
					<Accordion transition transitionTimeout={200}>
						<AccordionItem header='Why should I choose this safety app and not others? Can you really assure me total privacy?'>
							Because you can control what calls to answer, block unwanted callers, keep personal data private, avoid spam and scam
						</AccordionItem>
						<AccordionItem header='Do I need a SIM card or current contract to use this safety app?'>
							Yes, but that information will stay safe. You won't have to give away your personal number any more.
						</AccordionItem>
						<AccordionItem header='How much does it cost to use the VIP safety first service?'>
							A monthly subscription of just £9 a month including your new number and unlimited calls/messages! No contract, cancel anytime...
						</AccordionItem>
						<AccordionItem header='What happens if I need to change my VIP number?'>
							If your VIP number becomes compromised, we can change it for you to remove source of harassment by phone/messaging
						</AccordionItem>
						<AccordionItem header='What happens if I need support?'>Contact Us Here!</AccordionItem>
						<AccordionItem header='Can I trust the App?'>The VIP / conXhub App is certified by Apple and Android, completely ad-free and updated regularly</AccordionItem>
						<AccordionItem header='Do I need to sign up to a contract?'>No contract required – cancel anytime you want with no penalties</AccordionItem>
					</Accordion>
				</motion.div>
			</section>
		</>
	);
};

export default Faq;
