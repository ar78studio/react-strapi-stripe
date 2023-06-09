import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import { PhoneVipNumber } from '../../assets/index';

// Multilanguage support
import { useTranslation, Trans } from 'react-i18next';

const AVipPhone = () => {
	const { t, i18n } = useTranslation();

	return (
		<>
			<main id='aVipPhone' className='w-full flex flex-wrap-reverse lg:flex-nowrap bg-aVipPhoneBg justify-between lg:px-10 lg:pt-10'>
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
						{/* A VIP phone number is the best solution to keep you safe  */}
						{/* {t('title')} */}
						<Trans i18nKey='AVipPhoneTitle'></Trans>
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
							{/* When you use a VIP number for website authentication, online activity or even dating, you add an extra layer of security with your personal information (such as your
							location, address, and personal phone number) remaining private.{' '} */}
							<Trans i18nKey='description.p1'></Trans>
						</p>

						<br />
						<p>
							{/* conXhub is one of the best apps for women’s safety as it enables you to create as many virtual numbers as you need. Create one for friends, one for work colleagues,
							one for dating, one for online selling…one for each and every aspect of your life! */}
							<Trans i18nKey='description.p2'></Trans>
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
							<Link to='../SignUp'>
								<Trans i18nKey='button'></Trans>
							</Link>
						</motion.button>
					</motion.div>
				</section>
			</main>
		</>
	);
};

export default AVipPhone;
