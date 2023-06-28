import React from 'react';

import { motion } from 'framer-motion';
import { ContactSvg } from '../../assets';

import Button from '../buttons/Button';
// Multilanguage support
import { useTranslation, Trans } from 'react-i18next';

const ContactUs = () => {
	const { t, i18n } = useTranslation();

	return (
		<>
			<main id='contact' className='flex flex-wrap lg:flex-nowrap bg-gradient-to-tr from-[#2d356b] to-[#8262ac] lg:px-10 pt-40 pb-40'>
				<section className='w-full lg:w-1/2 flex flex-col content-center place-self-center pt-6'>
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
						{/* Contact Us */}
						<Trans i18nKey='contactUsTitle'></Trans>
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
						className='text-base text-center lg:text-left text-white pt-6 mx-10 mb-10'
					>
						{/* For any enquiries or additional information please contact: */}
						<Trans i18nKey='contactUsSubTitle'></Trans>
					</motion.p>
					<motion.div
						initial='hidden'
						whileInView='visible'
						viewport={{ once: true, amount: 0.5 }}
						transition={{ delay: 0.2, duration: 1.2 }}
						variants={{
							hidden: { opacity: 0, x: -100 },
							visible: { opacity: 1, x: 0 },
						}}
						className='flex container mx-auto items-center justify-center lg:items-start flex-col mb-20'
					>
						<span className='ml-10 text-white'>(UK) +44 (0)208 099 8889</span>
						<span className='ml-10 text-white'>(ES) +34 966 265 065</span>
						<span className='ml-10 text-white'>(US) +1 323 784 3863</span>
						<span className='ml-10 text-white'>(CN) +1 647 846 1284</span>
						<span className='ml-10 text-white'>(AU) +61 283 109 785</span>
					</motion.div>
				</section>

				{/* SECTION WITH THE ICONS AND TICKET BUTTONS  */}
				<section className='flex container mx-auto flex-wrap lg:w-1/2'>
					<div className='flex container mx-auto flex-row flex-wrap mb-10'>
						<motion.div
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true, amount: 0.5 }}
							transition={{ delay: 0.2, duration: 1.2 }}
							variants={{
								hidden: { opacity: 0, x: -100 },
								visible: { opacity: 1, x: 0 },
							}}
							className='flex container mx-auto flex-col w-80 text-center'
						>
							<div className='flex justify-center mb-4'>
								<img className='w-[5rem]' src={ContactSvg} alt='Email your Enquiry Here' />
							</div>
							<h1 className='mt-2 mb-2 text-white text-4xl font-semibold'>
								{/* Sales */}
								<Trans i18nKey='contactUsButtons.sales'></Trans>
							</h1>
							<span className='text-white'>
								{/* For any sales enquiries or additional information, please open a ticket */}
								<Trans i18nKey='contactUsButtons.salesDescription'></Trans>
							</span>
							<div className='my-4 w-[14rem] place-self-center text-white font-medium bg-buttonColor p-2 rounded-lg transition duration-300 ease-in-out hover:scale-110'>
								<Button link='https://billing.conxhub.com/submitticket.php?step=2&deptid=5' label={<Trans i18nKey='contactUsButtons.sales'></Trans>} />
							</div>
						</motion.div>
						<motion.div
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true, amount: 0.5 }}
							transition={{ delay: 0.2, duration: 1.2 }}
							variants={{
								hidden: { opacity: 0, x: -100 },
								visible: { opacity: 1, x: 0 },
							}}
							className='flex container mx-auto flex-col w-80 text-center'
						>
							<div className='flex justify-center mb-4'>
								<img className='w-[5rem]' src={ContactSvg} alt='Email your Enquiry Here' />
							</div>
							<h1 className='mt-2 mb-2 text-white text-4xl font-semibold'>
								{/* Accounts */}
								<Trans i18nKey='contactUsButtons.accounts'></Trans>
							</h1>
							<span className='text-white'>
								{/* For any billing issues or enquiries, please open a ticket */}
								<Trans i18nKey='contactUsButtons.accountsDescription'></Trans>
							</span>
							<div className='my-4 w-[14rem] place-self-center text-white font-medium bg-buttonColor p-2 rounded-lg transition duration-300 ease-in-out hover:scale-110'>
								<Button link='https://billing.conxhub.com/submitticket.php?step=2&deptid=4' label={<Trans i18nKey='contactUsButtons.accountsButton'></Trans>} />
							</div>
						</motion.div>
					</div>
					<div className='flex container mx-auto flex-row flex-wrap'>
						<motion.div
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true, amount: 0.5 }}
							transition={{ delay: 0.2, duration: 1.2 }}
							variants={{
								hidden: { opacity: 0, x: -100 },
								visible: { opacity: 1, x: 0 },
							}}
							className='flex container mx-auto flex-col w-80 text-center'
						>
							<div className='flex justify-center mb-4'>
								<img className='w-[5rem]' src={ContactSvg} alt='Email your Enquiry Here' />
							</div>
							<h1 className='mt-2 mb-2 text-white text-4xl font-semibold'>
								{/* Technical */}
								<Trans i18nKey='contactUsButtons.technical'></Trans>
							</h1>
							<span className='text-white'>
								{/* For any technical issues or support enquiries, please open a ticket */}
								<Trans i18nKey='contactUsButtons.technicalDescription'></Trans>
							</span>
							<div className='my-4 w-[14rem] place-self-center text-white font-medium bg-buttonColor p-2 rounded-lg transition duration-300 ease-in-out hover:scale-110'>
								<Button link='https://billing.conxhub.com/submitticket.php?step=2&deptid=3' label={<Trans i18nKey='contactUsButtons.technicalButton'></Trans>} />
							</div>
						</motion.div>
						<motion.div
							initial='hidden'
							whileInView='visible'
							viewport={{ once: true, amount: 0.5 }}
							transition={{ delay: 0.2, duration: 1.2 }}
							variants={{
								hidden: { opacity: 0, x: -100 },
								visible: { opacity: 1, x: 0 },
							}}
							className='flex container mx-auto flex-col w-80 text-center'
						>
							<div className='flex justify-center mb-4'>
								<img className='w-[5rem]' src={ContactSvg} alt='Email your Enquiry Here' />
							</div>
							<h1 className='mt-2 mb-2 text-white text-4xl font-semibold'>
								{/* Faults */}
								<Trans i18nKey='contactUsButtons.faults'></Trans>
							</h1>
							<span className='text-white'>
								{/* System, App Bugs or Call Faults, please open a ticket */}
								<Trans i18nKey='contactUsButtons.faultsDescription'></Trans>
							</span>
							<div className='my-4 w-[14rem] place-self-center text-white font-medium bg-buttonColor p-2 rounded-lg transition duration-300 ease-in-out hover:scale-110'>
								<Button link='https://billing.conxhub.com/submitticket.php?step=2&deptid=6' label={<Trans i18nKey='contactUsButtons.faultsButton'></Trans>} />
							</div>
						</motion.div>
					</div>
				</section>
			</main>
		</>
	);
};

export default ContactUs;
